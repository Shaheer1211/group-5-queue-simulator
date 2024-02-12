import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
//   const [openSimulations, setOpenSimulations] = useState(false);
  return (
    <aside className="w-[230px] bg-white relative z-20">
      <div className="border p-4 rounded-lg h-screen">
        <ul className="font-semibold text-xl my-4">
          <li className="border-b">
            <NavLink
              to={""}
              end
              className={`p-2 my-1 rounded-md hover:bg-[#2daab8] hover:text-white w-full inline-block`}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2daab8" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
            >
              M/M/C Simulation
            </NavLink>
          </li>
          <li className="border-b">
            <NavLink
              to={"mgc"}
              className={`p-2 my-1 rounded-md hover:bg-[#2daab8] hover:text-white w-full inline-block`}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2daab8" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
            >
              M/G/C Simulation
            </NavLink>
          </li>
          <li className="border-b">
            <NavLink
            to={"gmc"}
              className={`p-2 my-1 rounded-md hover:bg-[#2daab8] hover:text-white w-full inline-block`}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2daab8" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
            >
              G/M/C Simulation
            </NavLink>
          </li>
          <li className="border-b">
            <NavLink
            to={"ggc"}
              className={`p-2 my-1 rounded-md hover:bg-[#2daab8] hover:text-white w-full inline-block`}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2daab8" : "",
                  color: isActive ? "#fff" : "",
                };
              }}
            >
              G/G/C Simulation
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
