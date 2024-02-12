import React from "react";

function GanttChart({ ganttData }) {
  //   console.log(ganttData);
  return (
    <section className="w-full my-4">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold mb-4">Gantt Chart</h1>
        <div className="flex items-center gap-2">
          <span>Legend:</span>
          <div className="flex  gap-2">
            <span>
              <span className="w-16 h-8 grid place-items-center border border-black bg-blue-500 text-white font-black">
                IDLE
              </span>
            </span>
            <span>
              <span className="px-2 h-8 grid place-items-center border border-black bg-green-500 text-white font-black">
                Priority 3
              </span>
            </span>
            <span>
              <span className="px-2 h-8 grid place-items-center border border-black bg-yellow-300 text-white font-black">
              Priority 2
              </span>
            </span>
            <span>
              <span className="px-2 h-8 grid place-items-center border border-black bg-red-600 text-white font-black">
              Priority 1
              </span>
            </span>
          </div>
        </div>
      </div>
      {ganttData.map((data, index) => (
        <div key={index}>
          <h2 className="text-xl font-medium">Server # {data.ServerNo}</h2>
          <div className="flex flex-wrap w-full my-2">
            {data.ServerGantt.map((element, index) => (
              <>
                {element.StartTime > 0 && index === 0 && (
                  <span>
                    <span className="w-16 h-8 grid place-items-center border border-black bg-blue-500 text-white font-black">
                      IDLE
                    </span>
                    <span className="w-full flex justify-between px-2">
                      <span>0</span>
                      <span>{element.StartTime}</span>
                    </span>
                  </span>
                )}
                <span>
                  <span
                    key={index}
                    className={`w-16 h-8 grid place-items-center border border-black text-white font-black ${
                      element.Priority === 1
                        ? "bg-red-600"
                        : element.Priority === 2
                        ? "bg-yellow-300"
                        : "bg-green-500"
                    }`}
                  >
                    {element.EntityNo}
                  </span>
                  <span className="w-full flex justify-between px-2">
                    <span>{element.StartTime}</span>
                    <span>{element.EndTime}</span>
                  </span>
                </span>
                {data.ServerGantt[index + 1] &&
                data.ServerGantt[index + 1].StartTime > element.EndTime ? (
                  <span>
                    <span className="w-16 h-8 grid place-items-center border border-black bg-blue-500 text-white font-black">
                      IDLE
                    </span>
                    <span className="w-full flex justify-between px-2">
                      <span>{element.EndTime}</span>
                      <span>{data.ServerGantt[index + 1].StartTime}</span>
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default GanttChart;
