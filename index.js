const EuropCountries = [
  "United Kingdom",
  "Belgium",
  "Denmark",
  "France",
  "Germany",
  "Greece",
  "Italy",
  "Poland",
  "Portugal",
  "Romania",
  "Spain",
];
const ArabCountries = [
  "Bahrain",
  "Iraq",
  "Iran",
  "Israel",
  "Jordan",
  "Kuwait",
  "Lebanon",
  "Oman",
  "Qatar",
  "Saudi Arabia",
  "Syria",
  "United Arab Emirates",
];

var DATA;
window.addEventListener("load", start, false);

async function start() {
  const api = "https://pomber.github.io/covid19/timeseries.json";
  DATA = await getData(api).catch((err) => console.error(err));

  const {
    Bahrain,
    Iraq,
    Iran,
    Israel,
    Jordan,
    Kuwait,
    Lebanon,
    Oman,
    Qatar,
    Syria,
    Egypt,
    Belgium,
    Denmark,
    France,
    Germany,
    Greece,
    Italy,
    Poland,
    Portugal,
    Romania,
    Spain,
    US,
  } = DATA;

  let Saudi_Arabia = DATA["Saudi Arabia"];
  let United_Arab_Emirates = DATA["United Arab Emirates"];
  let United_Kingdom = DATA["United Kingdom"];

  middleEastData = {
    Bahrain,
    Iraq,
    Iran,
    Israel,
    Jordan,
    Kuwait,
    Lebanon,
    Oman,
    Qatar,
    Syria,
    Saudi_Arabia,
    Egypt,
    United_Arab_Emirates,
  };
  EruopData = {
    United_Kingdom,
    Belgium,
    Denmark,
    France,
    Germany,
    Greece,
    Italy,
    Poland,
    Portugal,
    Romania,
    Spain,
  };

  chartJordan(Jordan);
  JordanChart2(Jordan);
  chartMiddleEast(middleEastData);
  chartEurop(EruopData);
  chartAll(US);
}

function getAllEuropeConfiremd() {
  let today = DATA[EuropCountries[0]].length - 1;
  let all = 0;
  for (let i = 0; i < EuropCountries.length; i++) {
    let coun = EuropCountries[i];
    all += DATA[coun][today].confirmed;
  }

  return all;
}
function getAllMiddleEastConfiremd() {
  let today = DATA[ArabCountries[0]].length - 1;
  let all = 0;
  for (let i = 0; i < ArabCountries.length - 1; i++) {
    let countrtry = ArabCountries[i];

    all += DATA[countrtry][today].confirmed;
  }

  return all;
}
function getAllUsConfiremd(US) {
  let today = DATA.US.length - 1;
  console.log(DATA.US[today].confirmed);

  return DATA.US[today].confirmed;
}

async function getEuropCountries() {
  const data = await fetch("erupo.txt");
  const names = await data.text();
  let splited = names.split("\n");
  let newArr = [];
  splited.forEach((elem) => {
    elem = elem.slice(3);
    newArr.push(elem);
  });
  return newArr;
  // return EuropCountries;
}

/*async function getArabCountries() {
   const data = await fetch("middleEast.txt");
  const names = await data.text();
  let splited = names.split("\n");
  let newArr = [];
  splited.forEach((elem) => {
    elem = elem.slice(3);
    newArr.push(elem);
  });
  console.log(splited);
  for (let i = 0; i < splited.length; i++) document.write(splited[i] + ',"');

  // return EuropCountries;
}*/
async function getData(api) {
  const response = await fetch(api);
  const data = await response.json();
  return data;
}

function chartJordan(jordanData) {
  //chart DOM elem
  let curentTimeElem = document.querySelector(".currentTime");
  let today = jordanData.length - 1;
  let myChart = document.getElementById("Jordan").getContext("2d");

  let JordanChart = new Chart(myChart, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["Confiremd", "Recovered", "Dead"],

      datasets: [
        {
          data: [
            jordanData[today].confirmed,
            jordanData[today].recovered,
            jordanData[today].deaths,
          ],

          backgroundColor: ["#FF7300", "green", "red"],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "cases in Jordan ",
        fontSize: 20,
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 10,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

function chartMiddleEast(middleEastData) {
  let today = middleEastData.Jordan.length - 1;
  console.log(today);
  let myChart2 = document.getElementById("ArabCoun").getContext("2d");

  let middleEast = new Chart(myChart2, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [
        "Iraq",
        "Palestine",
        "Lebanon",
        "Saudi Arabia",
        "United Arab Emirates",
        "Egypt",
        "Jordan",
      ],

      datasets: [
        {
          label: "confirmed",
          data: [
            middleEastData.Iraq[today].confirmed,
            middleEastData.Israel[today].confirmed,
            middleEastData.Lebanon[today].confirmed,
            middleEastData.Saudi_Arabia[today].confirmed,
            middleEastData.United_Arab_Emirates[today].confirmed,
            middleEastData.Egypt[today].confirmed,
            middleEastData.Jordan[today].confirmed,
            //middleEastData.Bahrain[today].confirmed,
            // middleEastData.Oman[today].confirmed,
            // middleEastData.Kuwait[today].confirmed,
            //middleEastData.Iran[today].confirmed,
          ],

          //backgroundColor:'green',
          backgroundColor: [
            "#007ED6",
            "#FF0000",
            "#7CDDDD",
            "#e84118",
            "#FFEC00",
            "#FF7300",
            "#52D726",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 2,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: "click on each one to see the confirmed numbers",

        fontSize: 12,
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}
function chartEurop(EruopData) {
  let today = EruopData.United_Kingdom.length - 1;

  let myChart3 = document.getElementById("Europ").getContext("2d");

  let EuropChart = new Chart(myChart3, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [
        "United Kingdom",
        "Italy",
        "Belgium",
        "France",
        "Germany",
        "Portugal",
        "Spain",
      ],

      datasets: [
        {
          label: "confirmed",
          data: [
            EruopData.United_Kingdom[today].confirmed,
            EruopData.Italy[today].confirmed,
            EruopData.Belgium[today].confirmed,
            EruopData.France[today].confirmed,
            EruopData.Germany[today].confirmed,
            EruopData.Portugal[today].confirmed,
            EruopData.Spain[today].confirmed,
          ],

        
          backgroundColor: [
            "#007ED6",
            "#FF0000",
            "#7CDDDD",
            "#e84118",
            "#FFEC00",
            "#FF7300",
            "#52D726",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 2,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: "click on each one to see the confirmed numbers",

        fontSize: 12,
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

function chartAll(US) {
  var Eur = getAllEuropeConfiremd();
  var mid = getAllMiddleEastConfiremd();
  var us = getAllUsConfiremd(US);
  let myChart4 = document.getElementById("All").getContext("2d");

  let All = new Chart(myChart4, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: ["Middle East", "US", "Europ"],

      datasets: [
        {
          label: "confirmed",
          data: [mid, us, Eur],

          //backgroundColor:'green',
          backgroundColor: ["#007ED6", "orange", "#FF0000"],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 2,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: "click on each one to see the confirmed numbers",

        fontSize: 12,
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

async function JordanChart2(Jordan) {
  today = Jordan.length.confirmed;
  const ctx = document.getElementById("Jordan2").getContext("2d");
  var arr = [];
  var cases = [];
  for (let i = 150; i < Jordan.length; i++) {
    arr.push(Jordan[i].date.slice(Jordan[i].date.lastIndexOf("-") + 1));
  }

  for (let i = 150; i < Jordan.length; i++) cases.push(Jordan[i].confirmed);

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: arr,
      datasets: [
        {
          label: "confirmed",
          data: cases,
          fill: true,
          borderColor: "white",
          backgroundColor: "red",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "confirmed cases with time ",

        fontSize: 12,
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}
