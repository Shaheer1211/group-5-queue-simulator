import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav class="fixed top-0 z-50 w-full bg-white  border-gray-200 ">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
              <Link to="/" class="flex ml-2 md:mr-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                  Simulator
                </span>
              </Link>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWaMFY5pixU3BhenD4UmgEz6f4y-atdbygg&usqp=CAU"
                      alt=""
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-[#2daab8] divide-y divide-[#2daab8] rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Shaheer Uddin
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      shaheeruddin786@gmail.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2daab8] dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2daab8] dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2daab8] dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2daab8] dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
