import React from "react";

function SummaryStatistice(props) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-4 w-full">
      <div className="flex items-center justify-center rounded">
        <div
          className="p-4 bg-[#2daab8] rounded-lg md:p-8 w-full"
        >
          <h2 className="text-xl text-white">Summary Statistics</h2>
          <div className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3  dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-bold">{props.avgIA}</dt>
              <dd className="text-white font-bold">Average Interarrival</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-bold">{props.avgService}</dt>
              <dd className="text-white font-bold">Average Service</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-bold">{props.avgTAT}</dt>
              <dd className="text-white font-bold">Average TurnAround time</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-bold">{props.avgWT}</dt>
              <dd className="text-white font-bold">Average wait time </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-bold">{props.avgRT}</dt>
              <dd className="text-white font-bold">Average response</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryStatistice;
