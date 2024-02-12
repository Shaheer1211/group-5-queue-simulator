import React, { useState } from "react";
import {
  LCGPriority,
  calculateResults,
  poissonProbability,
} from "../services/services";

const Simulator = () => {
  const [simulationData, setSimulationData] = useState([]);

  const generateCP = () => {
    const lambda = 2.65;
    const mu = 1.38;
    let CP = 0;

    let entityNumber = 1;

    let curCPIter = 0;

    let TimeBWArrival = 0;
    let simData = [];
    let cumProbLookup = [];

    while (true) {
      cumProbLookup.push(CP);
      if (CP.toFixed(4) >= 1) {
        break;
      } else {
        CP = 0;
      }

      for (let i = 0; i <= curCPIter; i++) {
        CP += poissonProbability(lambda, i);
      }

      curCPIter += 1;

      // Push object into simulationData array
      simData.push({
        Entity: entityNumber,
        CP: parseFloat(CP.toFixed(4)),
        CPLookup: parseFloat(cumProbLookup[curCPIter - 1].toFixed(4)),
        TimeBWArrival: TimeBWArrival,
        InterArrival: "",
        Arrival: "",
        Service: "",
        Priority: "",
        ServiceStartTime: "",
        ServiceEndTime: "",
        TA: "",
        WT: "",
        RT: "",
      });
      TimeBWArrival += 1;
      entityNumber += 1;
    }
    for (let i = 0; i < simData.length; i++) {
      const LCG = LCGPriority(simData.length);

      const randomNum = Math.random();

      simData[i].Service = Math.ceil(-mu * Math.log(randomNum));

      simData[i].Priority = LCG[i];

      if (i === 0) {
        simData[i].InterArrival = 0;
        continue;
      }

      for (let j = 0; j < simData.length; j++) {
        if (randomNum < simData[j].CP && randomNum > simData[j].CPLookup) {
          simData[i].InterArrival = simData[j].TimeBWArrival;
          break;
        }
      }
    }

    for (let i = 0; i < simData.length; i++) {
      if (i === 0) {
        simData[i].Arrival = 0;
        continue;
      }

      simData[i].Arrival = simData[i - 1].Arrival + simData[i].InterArrival;
    }

    const results = calculateResults(simData, 2);
    const simulationResults = results.ServerResult;
    for (let i = 0; i < simData.length; i++) {
      simData[i].ServiceStartTime = simulationResults[i].ServiceStartTime;
      simData[i].ServiceEndTime = simulationResults[i].ServiceEndTime;
      simData[i].TA = simulationResults[i].TA;
      simData[i].WT = simulationResults[i].WT;
      simData[i].RT = simulationResults[i].RT;
    }
    setSimulationData(simData);
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <button
          className="bg-gray-100 mx-auto px-4 py-1 rounded-md"
          onClick={generateCP}
        >
          Generate CP
        </button>
        <h1 className="mx-auto">Simulation Data</h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {simulationData.length > 0 &&
                Object.keys(simulationData[0]).map((col, index) => (
                  <th key={index} className="px-6 py-3">
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {simulationData.length > 0 &&
              simulationData.map((data, dataIndex) => (
                <tr key={dataIndex} className="bg-white border-b">
                  {Object.keys(data).map((row, rowIndex) => (
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      key={rowIndex}
                    >
                      {data[row]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Simulator;
