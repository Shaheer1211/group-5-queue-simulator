import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section class="bg-[#2daab8] text-white py-16">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl font-bold mb-4">Hospital Data Simulator</h1>
          <p class="text-lg mb-8">
            Simulate hospital operations and optimize resource allocation
          </p>
          <Link
            to={"/simulator"}
            class="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition duration-300 mx-1"
          >
            Start Simulator
          </Link>
          <a
            class="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition duration-300 mx-1"
            href="https://group5-cal.netlify.app"
          >
            Start Queue Calculator
          </a>
        </div>
      </section>

      <section class="py-16">
        <div class="container mx-auto text-center">
          <h2 class="text-2xl font-semibold mb-4">Features & Benefits</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded shadow-md">
              <h3 class="text-xl font-semibold mb-2">Optimize Resources</h3>
              <p>
                Efficiently allocate staff and resources based on simulation
                results.
              </p>
            </div>
            <div class="bg-white p-6 rounded shadow-md">
              <h3 class="text-xl font-semibold mb-2">Predict Wait Times</h3>
              <p>
                Estimate patient wait times under various scenarios for better
                patient experience.
              </p>
            </div>
            <div class="bg-white p-6 rounded shadow-md">
              <h3 class="text-xl font-semibold mb-2">Cost Savings</h3>
              <p>
                Make informed decisions that can lead to cost savings and
                optimized operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="simulator" class="bg-gray-200 py-16">
        <div class="container mx-auto text-center">
          <h2 class="text-2xl font-semibold mb-4">About the Simulator</h2>
          <p class="mb-8">
            Our hospital data simulator leverages queuing models and random
            number generation to predict service outcomes in healthcare
            settings.
          </p>
          <a
            href="#index.html"
            class="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      <section id="contact" class="bg-white flex flex-row py-16">
        <div class="container w-1/2  mx-auto text-center">
          <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
          <p class="mb-8">
            Have questions or want to collaborate? Reach out to us:
          </p>
          <a
            href="mailto:info@hospital-simulator.com"
            class="text-blue-500 hover:underline"
          >
            info@hospital-simulator.com
          </a>
        </div>
        <div class="w-1/2 flex justify-center items-center flex-col">
          <p class="font-bold text-lg">GROUP MEMBERS :</p>
          <p class="font-bold text-lg">Areeba Jabeen EB21102021</p>
          <p class="font-bold text-lg">Darsha Asif EB21102026</p>
          <p class="font-bold text-lg">Hassan Ahmed EB21102036</p>
          <p class="font-bold text-lg">Hassan Warsi EB21102062</p>
          <p class="font-bold text-lg">Saad Adnan EB21102078</p>
          <p class="font-bold text-lg">Shaheer Uddin EB21102099</p>
          <p class="font-bold text-lg">Syed Shayan Hussain EB21102122</p>
        </div>
      </section>
      <footer class="bg-gray-900 text-white py-8">
        <div class="container mx-auto text-center">
          <p>&copy; 2023 Hospital Data Simulator. All rights reserved.</p>
          <div class="mt-4 flex justify-center space-x-4"></div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
