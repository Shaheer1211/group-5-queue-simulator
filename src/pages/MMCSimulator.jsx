import React, { useEffect, useState } from "react";
import {
  // calculateTotalServiceTime,
  calculateTotalServiceTimeServer,
  generateMMC,
  generateStatistics,
} from "../services/services";
import DataTable from "../components/DataTable";
import GanttChart from "../components/GanttChart";
import BarGraph from "../components/BarGraph";
import LineChart from "../components/LineChart";
import SummaryStatistic from "../components/SummaryStatistic";
import DoughnutGraph from "../components/DoughnutGraph";

function MMCSimulator() {
  const [data, setData] = useState([]);
  const [arrivalMean, setArrivalMean] = useState();
  const [serviceMean, setServiceMean] = useState();
  const [servers, setServers] = useState();
  const [isPriority, setIsPriority] = useState(true);
  const [M, setM] = useState(1994);
  const [A, setA] = useState(55);
  const [b, setB] = useState(9);
  const [X0, setX0] = useState(10112166);
  const [ganttData, setGanttData] = useState([]);
  const [arrivalData, setArrivalData] = useState();
  const [serviceData, setServiceData] = useState();
  const [TAT, setTAT] = useState();
  const [waitData, setWaitData] = useState();
  const [responseData, setResponseData] = useState();
  const [statistics, setStatistics] = useState();
  const [serverUtil, setServerUtil] = useState([]);

  const handleSubmit = () => {
    const result = generateMMC(
      arrivalMean,
      serviceMean,
      servers,
      isPriority,
      M,
      A,
      b,
      X0
    );
    setServerUtil([]);
    setData(result.simData);
    setGanttData(result.ganttChart);
  };

  const columns = [
    {
      header: "Entity #",
      accessorKey: "Entity",
    },
    {
      header: "Cummulative Probability",
      accessorKey: "CP",
    },
    {
      header: "Cummulative Probability Lookup",
      accessorKey: "CPLookup",
    },

    {
      header: "Time Between Arrival",
      accessorKey: "TimeBWArrival",
    },
    {
      header: "Interarrival",
      accessorKey: "InterArrival",
    },
    {
      header: "Arrival",
      accessorKey: "Arrival",
    },
    {
      header: "Service",
      accessorKey: "Service",
    },
    {
      header: "Priority",
      accessorKey: "Priority",
    },
    {
      header: "Start Time",
      accessorKey: "ServiceStartTime",
    },
    {
      header: "End Time",
      accessorKey: "ServiceEndTime",
    },
    {
      header: "TA Time",
      accessorKey: "TA",
    },
    {
      header: "Wait Time",
      accessorKey: "WT",
    },
    {
      header: "Response Time",
      accessorKey: "RT",
    },
  ];

  useEffect(() => {
    if (data.length > 0) {
      setArrivalData({
        labels: data.map((dataEntry) => dataEntry.Entity),
        datasets: [
          {
            label: "Arrival",
            data: data.map((dataEntry) => dataEntry.Arrival),
            backgroundColor: "#2daab8",
          },
        ],
      });

      setServiceData({
        labels: data.map((dataEntry) => dataEntry.Entity),
        datasets: [
          {
            label: "Service",
            data: data.map((dataEntry) => dataEntry.Service),
            backgroundColor: "#2daab8",
          },
        ],
      });

      setTAT({
        labels: data.map((dataEntry) => dataEntry.Entity),
        datasets: [
          {
            label: "Turn Around Time",
            data: data.map((dataEntry) => dataEntry.TA),
            backgroundColor: "#2daab8",
          },
        ],
      });

      setWaitData({
        labels: data.map((dataEntry) => dataEntry.Entity),
        datasets: [
          {
            label: "Wait Time",
            data: data.map((dataEntry) => dataEntry.WT),
            backgroundColor: "#2daab8",
          },
        ],
      });

      setResponseData({
        labels: data.map((dataEntry) => dataEntry.Entity),
        datasets: [
          {
            label: "Response Time",
            data: data.map((dataEntry) => dataEntry.RT),
            backgroundColor: "#2daab8",
          },
        ],
      });

      setStatistics(generateStatistics(data));

      // let totalServiceTime = calculateTotalServiceTime(data);
      ganttData.forEach((server) => {
        let totalServiceTimeServer = calculateTotalServiceTimeServer(server);
        let totalServerTime = 0;

        if (server.ServerGantt.length > 0) {
          const lastEntry = server.ServerGantt[server.ServerGantt.length - 1];
          totalServerTime =
            lastEntry.EndTime !== undefined ? lastEntry.EndTime : 0;
        }

        // Now totalServerTime will be either the actual EndTime if defined, or 0 if undefined.

        let serverUtilization = (
          (totalServiceTimeServer / totalServerTime) *
          100
        ).toFixed(2);
        setServerUtil((prevData) => [
          ...prevData,
          { ServerNo: server.ServerNo, utilization: serverUtilization },
        ]);
      });
    }
  }, [data, ganttData]);

  return (
    <div>
      <h1 className="font-bold text-2xl bg-[#2daab8] text-white px-2 py-1">
        M/M/C Queuing Simulator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full flex flex-col gap-4 my-4"
      >
        <label htmlFor="" className="flex flex-col">
          <span>Interarrival Time Mean:</span>
          <input
            className="border rounded-md px-2 py-1"
            required
            onChange={(e) => setArrivalMean(e.target.value)}
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          <span>Service Time Mean:</span>
          <input
            className="border rounded-md px-2 py-1"
            required
            onChange={(e) => setServiceMean(e.target.value)}
          />
        </label>
        <label htmlFor="" className="flex flex-col">
          <span>Servers:</span>
          <input
            className="border rounded-md px-2 py-1"
            required
            onChange={(e) => setServers(e.target.value)}
          />
        </label>
        <h2 className="text-xl font-semibold bg-[#2daab8] text-white px-2 py-1 flex justify-between">
          <span>Priority</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={(e) => setIsPriority(e.target.checked)}
              defaultChecked
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </h2>
        {isPriority && (
          <div className="hidden">
            <label htmlFor="" className="flex flex-col">
              <span>M</span>
              <input
                className="border rounded-md px-2 py-1"
                required
                value={M}
                onChange={(e) => setM(e.target.value)}
              />
            </label>

            <label htmlFor="" className="flex flex-col">
              <span>A</span>
              <input
                className="border rounded-md px-2 py-1"
                required
                value={A}
                onChange={(e) => setA(e.target.value)}
              />
            </label>

            <label htmlFor="" className="flex flex-col">
              <span>b</span>
              <input
                className="border rounded-md px-2 py-1"
                required
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </label>

            <label htmlFor="" className="flex flex-col">
              <span>X0</span>
              <input
                className="border rounded-md px-2 py-1"
                required
                value={X0}
                onChange={(e) => setX0(e.target.value)}
              />
            </label>
          </div>
        )}
        <button
          className="bg-[#2daab8] text-white py-1 px-2 rounded-md"
          type="submit"
        >
          Calculate
        </button>
      </form>
      <DataTable columns={columns} data={data} />

      <GanttChart ganttData={ganttData} />

      {statistics && (
        <SummaryStatistic
          avgIA={statistics.avgInterarrival}
          avgService={statistics.avgService}
          avgTAT={statistics.avgTA}
          avgWT={statistics.avgWT}
          avgRT={statistics.avgRT}
        />
      )}

      {arrivalData && (
        <div className="my-4">
          <h2 className="font-bold text-3xl">Entity Vs Arrivals</h2>
          <BarGraph chartData={arrivalData} />
        </div>
      )}

      {serviceData && (
        <div className="my-4">
          <h2 className="font-bold text-3xl">Entity Vs Service</h2>
          <BarGraph chartData={serviceData} />
        </div>
      )}

      {TAT && (
        <div className="my-4">
          <h2 className="font-bold text-3xl">Entity Vs Turn Around Time</h2>
          <LineChart chartData={TAT} />
        </div>
      )}

      {waitData && (
        <div className="my-4">
          <h2 className="font-bold text-3xl">Entity Vs Wait Time</h2>
          <LineChart chartData={waitData} />
        </div>
      )}

      {responseData && (
        <div className="my-4">
          <h2 className="font-bold text-3xl">Entity Vs Response Time</h2>
          <LineChart chartData={responseData} />
        </div>
      )}
      {
        <div className="my-4">
          <h2 className="font-bold text-3xl">Server Utilization</h2>
          <div className="flex gap-4 flex-wrap">
            {serverUtil.map((util, index) => (
              <div className="text-center w-64" key={index}>
                <DoughnutGraph chartData={util} />
                <h5 className="my-2 font-semibold">Server # {util.ServerNo}</h5>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default MMCSimulator;
