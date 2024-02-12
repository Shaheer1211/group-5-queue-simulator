import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MMCSimulator from "../pages/MMCSimulator";
import MGCSimulator from "../pages/MGCSimulator";
import GMCSimulator from "../pages/GMCSimulator";
import GGCSimulator from "../pages/GGCSimulator";

function SimulatorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <main className="max-w-7xl w-[90%] flex gap-4 mx-auto mb-16 mt-4 relative">
      <div className="mb-20">
        <Header />
      </div>
      <div className="flex gap-x-2 w-full mt-20">
        <button
          className="fixed top-[6rem] left-0 p-3 bg-[#2daab8] rounded-tr-lg rounded-br-lg block lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            width="24"
            height="24"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
        <div
          className={`fixed top-0 left-0 bottom-0 overflow-y-auto z-[99] lg:z-auto lg:static w-[270px] lg:w-[300px] overflow-x-visible transition-all ${
            !sidebarOpen ? "-translate-x-full lg:translate-x-0" : ""
          }`}
        >
          <button
            className={`absolute top-10 ${
              sidebarOpen ? "right-0" : "-right-6"
            } bg-[#2daab8] border p-4 rounded-full z-[9999] block lg:hidden`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="-rotate-90"
              fill="#fff"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
            </svg>
          </button>
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-screen h-screen bg-black bg-opacity-25 backdrop-blur-xl fixed top-0 left-0"
            ></div>
          )}
          <Sidebar />
        </div>
        <div className="w-4/5">
          <Routes>
            <Route path="/" element={<MMCSimulator />} />
            <Route path="/mgc" element={<MGCSimulator />} />
            <Route path="/gmc" element={<GMCSimulator />} />
            <Route path="/ggc" element={<GGCSimulator />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default SimulatorLayout;
