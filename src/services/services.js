function factorial(n) {
  return Array.from({ length: n }, (_, index) => index + 1).reduce(
    (acc, curr) => acc * curr,
    1
  );
}

//Probabilites
function poissonProbability(lambda, x) {
  const e = Math.E;
  const numerator = Math.pow(lambda, x) * Math.pow(e, -lambda);
  const denominator = factorial(x);
  return numerator / denominator;
}

function exponentialProbability(mu, randomNum) {
  return Math.ceil(-mu * Math.log(randomNum));
}

function generateNormal(mean, stdDev) {
  const std = Math.sqrt(stdDev);
  var U1 = Math.random();
  var U2 = Math.random();
  var Z0 = Math.sqrt(-2 * Math.log(U1)) * Math.cos(2 * Math.PI * U2);
  var X0 = Z0 * std + mean;

  return X0;
}

function generateUniform(min, max) {
  return Math.random() * (max - min) + min;
}

function generateNormalRandom(mean, stdDev) {
  const std = Math.sqrt(stdDev);
  const Z0 =
    Math.sqrt(-2 * Math.log(Math.random())) *
    Math.cos(2 * Math.PI * Math.random());
  return mean + std * Z0;
}

function generateGamma(mean, variance) {
  var shape = Math.pow(mean, 2) / variance;
  var scale = variance / mean;
  if (shape >= 1) {
    const d = shape - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);

    while (true) {
      const Z = generateNormalRandom(0, 1);
      const U = Math.random();

      const V = 1 + c * Z;
      const V3 = Math.pow(V, 3);
      if (V > 0 && Math.log(U) < 0.5 * Z * Z + d - d * V3 + d * Math.log(V3)) {
        return scale * d * V3;
      }
    }
  } else {
    const gammaShape = shape + 1;
    let gammaValue = 0;

    for (let i = 0; i < gammaShape; i++) {
      gammaValue -= Math.log(Math.random());
    }

    return scale * gammaValue;
  }
}

function LCGPriority(count, priority, m, a, b, xo) {
  const lk = [];
  if (!priority) {
    for (let i = 0; i < count; i++) {
      lk.push(3);
    }
    return lk;
  }

  const li = [];
  const lj = [];
  for (let i = 0; i < count; i++) {
    li.push(xo);
    xo = (a * xo + b) % m;
    const r = xo / m;
    const y = (3 - 1) * r + 1;
    lj.push(r);
    lk.push(Math.round(y));
  }

  return lk;
}

function calculateResults(SimulationData, C) {
  let currentTime = 0;

  const servers = [];
  const serversGanttChart = [];
  const entity = {
    EntityNumber: null,
    Priority: null,
    Arrival: null,
    ServiceTime: null,
    ServiceStartTime: null,
    ServiceRemaining: null,
    ServiceEndTime: null,
  };

  // Initializing servers
  for (let i = 1; i <= C; i++) {
    const server = {
      ServerNo: i,
      Serving: false,
      Entity: entity,
    };
    servers.push(server);
    const serverGanttChart = {
      ServerNo: i,
      ServerGantt: [],
    };
    serversGanttChart.push(serverGanttChart);
  }

  let eligibleEntities = [];
  let servedEntities = [];
  let holdEntities = [];

  while (servedEntities.length < SimulationData.length) {
    const serversTemp = servers.slice();

    serversTemp.forEach((server, index) => {
      if (server.Serving === true) {
        server.Entity.ServiceRemaining -= 1;
        server.Entity.ServiceEndTime += 1;
        if (server.Entity.ServiceRemaining === 0) {
          servedEntities.push(server.Entity);
          serversGanttChart[index].ServerGantt.push({
            EntityNo: server.Entity.Entity,
            StartTime: server.Entity.NewStartTime
              ? server.Entity.NewStartTime
              : server.Entity.ServiceStartTime,
            EndTime: server.Entity.ServiceEndTime,
            Priority: server.Entity.Priority,
          });
          servers[index].Serving = false;
        }
      }
    });
    for (let i = 0; i < SimulationData.length; i++) {
      if (SimulationData[i].Arrival === currentTime) {
        eligibleEntities.push(SimulationData[i]);
      }
    }

    eligibleEntities.sort((a, b) => {
      // First, compare by Priority
      if (a.Priority !== b.Priority) {
        return a.Priority - b.Priority;
      }

      // If Priority is the same, compare by Entity number
      return a.Entity - b.Entity;
    });

    for (let i = 0; i < C; i++) {
      if (eligibleEntities[0]) {
        let index = i;
        let shouldHold = false;
        if (servers[i].Serving === false) {
          servers[i].Entity = eligibleEntities[0];
          servers[i].Serving = true;

          if (servers[i].Entity.ServiceRemaining) {
            if (
              servers[i].Entity.NewStartTime !== null &&
              servers[i].Entity.NewStartTime !== undefined
            ) {
              servers[i].Entity.NewStartTime = currentTime;
            } else {
              servers[i].Entity.ServiceRemaining =
                eligibleEntities[0].ServiceRemaining;
            }
          } else {
            servers[i].Entity.ServiceStartTime = currentTime;
            servers[i].Entity.ServiceRemaining = eligibleEntities[0].Service;
          }

          servers[i].Entity.ServiceEndTime = currentTime;
        } else {
          for (let j = i + 1; j < C; j++) {
            if (
              servers[j].Serving &&
              servers[j].Entity.Priority > eligibleEntities[0].Priority
            ) {
              shouldHold = true;
              index = j;
            }
          }

          if (i === index && shouldHold) {
            // if (servers[i].Entity.NewStartTime) {
            //   servers[i].Entity[`NewStartTime`] = servers[i].Entity.NewStartTime;
            // } else {
            //   servers[i].Entity[`NewStartTime`] =
            //     servers[i].Entity.ServiceStartTime;
            // }
            servers[i].Entity[`NewStartTime`] =
              servers[i].Entity.NewStartTime ||
              servers[i].Entity.ServiceStartTime;

            holdEntities.push(servers[i].Entity);
            eligibleEntities.push(servers[i].Entity);

            serversGanttChart[i].ServerGantt.push({
              EntityNo: servers[i].Entity.Entity,
              StartTime: servers[i].Entity.NewStartTime
                ? servers[i].Entity.NewStartTime
                : servers[i].Entity.ServiceStartTime,
              EndTime: servers[i].Entity.ServiceEndTime,
              Priority: servers[i].Entity.Priority,
            });

            servers[i].Entity = eligibleEntities[0];
            servers[i].Serving = true;

            if (eligibleEntities[0].ServiceRemaining) {
              if (servers[i].Entity.NewStartTime) {
                servers[i].Entity.NewStartTime = currentTime;
              }
              servers[i].Entity.ServiceStartTime =
                eligibleEntities[0].ServiceStartTime;
              servers[i].Entity.ServiceRemaining =
                eligibleEntities[0].ServiceRemaining;
            } else {
              servers[i].Entity.ServiceStartTime = currentTime;
              servers[i].Entity.ServiceRemaining = eligibleEntities[0].Service;
            }
          }
          servers[i].Entity.ServiceEndTime = currentTime;
        }
        eligibleEntities = eligibleEntities.filter(
          (entity) =>
            !servers.some(
              (server) =>
                server.Serving && server.Entity.Entity === entity.Entity
            )
        );
      }
    }

    currentTime += 1;
  }

  servedEntities.sort((a, b) => a.Entity - b.Entity);

  for (let i = 0; i < servedEntities.length; i++) {
    servedEntities[i]["TA"] =
      servedEntities[i].ServiceEndTime - servedEntities[i].Arrival;
    servedEntities[i]["WT"] = servedEntities[i].TA - servedEntities[i].Service;
    servedEntities[i]["RT"] =
      servedEntities[i].ServiceStartTime - servedEntities[i].Arrival;
  }

  return { ServerResult: servedEntities, ServerGantt: serversGanttChart };
}

function firstSorting(list) {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < i; j++) {
      if (list[i][0] < list[j][0]) {
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
  }
  return list;
}

const generatePoissonCP = (lambda) => {
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

  return simData;
};

const generateMMC = (lambda, mu, C, priority, m, a, b, xo) => {
  if (!lambda || !mu) {
    return;
  }

  let simData = generatePoissonCP(lambda);

  for (let i = 0; i < simData.length; i++) {
    const LCG = LCGPriority(simData.length, priority, m, a, b, xo);

    const randomNum = Math.random();

    simData[i].Service = exponentialProbability(mu, randomNum);

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

  const results = calculateResults(simData, C);
  const simulationResults = results.ServerResult;
  for (let i = 0; i < simData.length; i++) {
    simData[i].ServiceStartTime = simulationResults[i].ServiceStartTime;
    simData[i].ServiceEndTime = simulationResults[i].ServiceEndTime;
    simData[i].TA = simulationResults[i].TA;
    simData[i].WT = simulationResults[i].WT;
    simData[i].RT = simulationResults[i].RT;
  }
  return { simData, ganttChart: results.ServerGantt };
};

const generateMGC = (lambda, serviceParams, C, priority, m, a, b, xo) => {
  if (!lambda || !serviceParams) {
    return;
  }

  let simData = generatePoissonCP(lambda);

  for (let i = 0; i < simData.length; i++) {
    const LCG = LCGPriority(simData.length, priority, m, a, b, xo);

    const randomNum = Math.random();

    if (serviceParams.serviceDistribution === "normal") {
      simData[i].Service = Math.ceil(
        generateNormal(serviceParams.paramA, serviceParams.paramB)
      );
      while (simData[i].Service <= 0) {
        simData[i].Service = Math.ceil(
          generateNormal(serviceParams.paramA, serviceParams.paramB)
        );
      }
    } else if (serviceParams.serviceDistribution === "uniform") {
      simData[i].Service = Math.ceil(
        generateUniform(serviceParams.paramA, serviceParams.paramB)
      );
    } else if (serviceParams.serviceDistribution === "gamma") {
      simData[i].Service = Math.ceil(
        generateGamma(serviceParams.paramA, serviceParams.paramB)
      );
      while (simData[i].Service <= 0) {
        simData[i].Service = Math.ceil(
          generateGamma(serviceParams.paramA, serviceParams.paramB)
        );
      }
    }

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

  const results = calculateResults(simData, C);
  const simulationResults = results.ServerResult;
  for (let i = 0; i < simData.length; i++) {
    simData[i].ServiceStartTime = simulationResults[i].ServiceStartTime;
    simData[i].ServiceEndTime = simulationResults[i].ServiceEndTime;
    simData[i].TA = simulationResults[i].TA;
    simData[i].WT = simulationResults[i].WT;
    simData[i].RT = simulationResults[i].RT;
  }
  return { simData, ganttChart: results.ServerGantt };
};

const generateGMC = (arrivalParams, mu, C, priority, entity, m, a, b, xo) => {
  if (!arrivalParams || !mu) {
    return;
  }
  let simData = [];
  for (let i = 0; i < entity; i++) {
    simData.push({
      Entity: i,
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
  }
  if (arrivalParams.arrivalDistribution === "uniform") {
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(
        generateUniform(arrivalParams.paramA, arrivalParams.paramB)
      );
      while (IA < 0) {
        IA = Math.ceil(
          generateUniform(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }
  if (arrivalParams.arrivalDistribution === "gamma") {
    // simData = generateGammaCP(arrivalParams.paramA, arrivalParams.paramB);
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(generateGamma(arrivalParams.paramA, arrivalParams.paramB));
      while (IA < 0) {
        IA = Math.ceil(
          generateGamma(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }
  if (arrivalParams.arrivalDistribution === "normal") {
    // simData = generateNormalCP(arrivalParams.paramA, arrivalParams.paramB);
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(
        generateNormal(arrivalParams.paramA, arrivalParams.paramB)
      );
      while (IA < 0) {
        IA = Math.ceil(
          generateNormal(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }


  for (let i = 0; i < simData.length; i++) {
    const LCG = LCGPriority(simData.length, priority, m, a, b, xo);

    const randomNum = Math.random();

    simData[i].Service = exponentialProbability(mu, randomNum);

    simData[i].Priority = LCG[i];

    if (i === 0) {
      simData[i].InterArrival = 0;
      continue;
    }
  }

  for (let i = 0; i < simData.length; i++) {
    if (i === 0) {
      simData[i].Arrival = 0;
      continue;
    }

    simData[i].Arrival = simData[i - 1].Arrival + simData[i].InterArrival;
  }

  const results = calculateResults(simData, C);
  const simulationResults = results.ServerResult;
  for (let i = 0; i < simData.length; i++) {
    simData[i].ServiceStartTime = simulationResults[i].ServiceStartTime;
    simData[i].ServiceEndTime = simulationResults[i].ServiceEndTime;
    simData[i].TA = simulationResults[i].TA;
    simData[i].WT = simulationResults[i].WT;
    simData[i].RT = simulationResults[i].RT;
  }
  return { simData, ganttChart: results.ServerGantt };
};

const generateGGC = (
  arrivalParams,
  serviceParams,
  C,
  priority,
  entity,
  m,
  a,
  b,
  xo,
  n
) => {
  if (!arrivalParams || !serviceParams) {
    return;
  }
  let simData = [];
  for (let i = 0; i < entity; i++) {
    simData.push({
      Entity: i,
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
  }

  if (arrivalParams.arrivalDistribution === "uniform") {
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(
        generateUniform(arrivalParams.paramA, arrivalParams.paramB)
      );
      while (IA < 0) {
        IA = Math.ceil(
          generateUniform(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }
  if (arrivalParams.arrivalDistribution === "gamma") {
    // simData = generateGammaCP(arrivalParams.paramA, arrivalParams.paramB);
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(generateGamma(arrivalParams.paramA, arrivalParams.paramB));
      while (IA < 0) {
        IA = Math.ceil(
          generateGamma(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }
  if (arrivalParams.arrivalDistribution === "normal") {
    // simData = generateNormalCP(arrivalParams.paramA, arrivalParams.paramB);
    let IA = 0;
    for (let j = 0; j < simData.length; j++) {
      IA = Math.ceil(
        generateNormal(arrivalParams.paramA, arrivalParams.paramB)
      );
      while (IA < 0) {
        IA = Math.ceil(
          generateNormal(arrivalParams.paramA, arrivalParams.paramB)
        );
      }
      simData[j].InterArrival = IA;
    }
  }

  for (let i = 0; i < simData.length; i++) {
    const LCG = LCGPriority(simData.length, priority, m, a, b, xo, n);

    if (serviceParams.serviceDistribution === "normal") {
      simData[i].Service = Math.ceil(
        generateNormal(serviceParams.paramC, serviceParams.paramC)
      );
      while (simData[i].Service <= 0) {
        simData[i].Service = Math.ceil(
          generateNormal(serviceParams.paramC, serviceParams.paramD)
        );
      }
    } else if (serviceParams.serviceDistribution === "uniform") {
      simData[i].Service = Math.ceil(
        generateUniform(serviceParams.paramC, serviceParams.paramD)
      );
    } else if (serviceParams.serviceDistribution === "gamma") {
      simData[i].Service = Math.ceil(
        generateGamma(serviceParams.paramC, serviceParams.paramD)
      );
      while (simData[i].Service <= 0) {
        simData[i].Service = Math.ceil(
          generateGamma(serviceParams.paramC, serviceParams.paramD)
        );
      }
    }

    simData[i].Priority = LCG[i];

    if (i === 0) {
      simData[i].InterArrival = 0;
      continue;
    }
  }

  for (let i = 0; i < simData.length; i++) {
    if (i === 0) {
      simData[i].Arrival = 0;
      continue;
    }

    simData[i].Arrival = simData[i - 1].Arrival + simData[i].InterArrival;
  }

  const results = calculateResults(simData, C);
  const simulationResults = results.ServerResult;
  for (let i = 0; i < simData.length; i++) {
    simData[i].ServiceStartTime = simulationResults[i].ServiceStartTime;
    simData[i].ServiceEndTime = simulationResults[i].ServiceEndTime;
    simData[i].TA = simulationResults[i].TA;
    simData[i].WT = simulationResults[i].WT;
    simData[i].RT = simulationResults[i].RT;
  }
  return { simData, ganttChart: results.ServerGantt };
};

const generateStatistics = (data) => {
  let totalInterarrival = 0;
  let totalService = 0;
  let totalTA = 0;
  let totalWT = 0;
  let totalRT = 0;

  data.forEach((entry, index) => {
    totalInterarrival +=
      index === 0
        ? entry.InterArrival
        : entry.Arrival - data[index - 1].Arrival;
    totalService += entry.Service;
    totalTA += entry.TA;
    totalWT += entry.WT;
    totalRT += entry.RT;
  });

  const avgInterarrival = (totalInterarrival / data.length).toFixed(2);
  const avgService = (totalService / data.length).toFixed(2);
  const avgTA = (totalTA / data.length).toFixed(2);
  const avgWT = (totalWT / data.length).toFixed(2);
  const avgRT = (totalRT / data.length).toFixed(2);

  return {
    avgInterarrival,
    avgService,
    avgTA,
    avgWT,
    avgRT,
  };
};

function calculateTotalServiceTime(data) {
  return data.reduce((total, entity) => total + entity.Service, 0);
}

function calculateTotalServiceTimeServer(server) {
  return server.ServerGantt.reduce(
    (totalTime, entity) => totalTime + (entity.EndTime - entity.StartTime),
    0
  );
}

export {
  factorial,
  poissonProbability,
  LCGPriority,
  calculateResults,
  firstSorting,
  generateMMC,
  generateMGC,
  generateGMC,
  generateGGC,
  generateStatistics,
  calculateTotalServiceTimeServer,
  calculateTotalServiceTime,
};
