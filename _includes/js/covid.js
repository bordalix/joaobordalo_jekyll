
// global state object
const state = {
  json: {
    last: null,
    full: null,
    delta: null,
    today: null,
  },
  regions: {
    // data from https://www.pordata.pt/Municipios/Densidade+populacional-452
    acores: { density: 105, population: 242796 },
    arsalgarve: { density: 88, population: 451006 },
    arsalentejo: { density: 22, population: 509849 },
    arscentro: { density: 79, population: 1744525 },
    arslvt: { density: 942, population: 3629871 },
    arsnorte: { density: 168, population: 3682370 },
    madeira: { density: 317, population: 270000 },
  },
  ages: [
    '0_9', '10_19', '20_29',
    '30_39', '40_49', '50_59',
    '60_69', '70_79', '80_plus',
  ],
  population_by_age: {
    // https://www.pordata.pt/Portugal/Popula%c3%a7%c3%a3o+residente++m%c3%a9dia+anual+total+e+por+grupo+et%c3%a1rio-10-1127
    '0_9': 433332 + 461299,
    '10_19': 507646 + 549033,
    '20_29': 544575 + 547505,
    '30_39': 571355 + 679093,
    '40_49': 792670 + 782555,
    '50_59': 747581 + 734540,
    '60_69': 672758 + 620543,
    '70_79': 544016 + 429107,
    '80_plus': 352218 + 316442,
  },
  symptoms: ['tosse', 'febre', 'dores_musculares', 'cefaleia', 'fraqueza_generalizada', 'dificuldade_respiratoria'],
  employment: [
    { month: 'Jan', year: '19', young: 305500, old: 4502200 },
    { month: 'Fev', year: '19', young: 301900, old: 4511200 },
    { month: 'Mar', year: '19', young: 296800, old: 4521200 },
    { month: 'Abr', year: '19', young: 301000, old: 4537800 },
    { month: 'Mai', year: '19', young: 295700, old: 4559400 },
    { month: 'Jun', year: '19', young: 305700, old: 4562600 },
    { month: 'Jul', year: '19', young: 309900, old: 4569700 },
    { month: 'Ago', year: '19', young: 320200, old: 4566200 },
    { month: 'Set', year: '19', young: 312400, old: 4567800 },
    { month: 'Out', year: '19', young: 312400, old: 4558400 },
    { month: 'Nov', year: '19', young: 303600, old: 4544400 },
    { month: 'Dez', year: '19', young: 298900, old: 4518700 },
    { month: 'Jan', year: '20', young: 295500, old: 4519900 },
    { month: 'Fev', year: '20', young: 290300, old: 4513300 },
    { month: 'Mar', year: '20', young: 290000, old: 4503400 },
    { month: 'Abr', year: '20', young: 268100, old: 4482800 },
    { month: 'Mai', year: '20', young: 240600, old: 4430800 },
    { month: 'Jun', year: '20', young: 235100, old: 4469200 },
    { month: 'Jul', year: '20', young: 244800, old: 4461200 },
    { month: 'Ago', year: '20', young: 250100, old: 4487300 },
    { month: 'Set', year: '20', young: 257900, old: 4504000 },
    { month: 'Out', year: '20', young: 246300, old: 4521300 },
    { month: 'Nov', year: '20', young: 255100, old: 4547200 },
    { month: 'Dez', year: '20', young: 238000, old: 4526800 },
    { month: 'Jan', year: '21', young: 235600, old: 4399800 },
    { month: 'Fev', year: '21', young: 233300, old: 4421900 },
    { month: 'Mar', year: '21', young: 240100, old: 4449700 },
    { month: 'Abr', year: '21', young: 241200, old: 4468200 },
    { month: 'Mai', year: '21', young: 254200, old: 4529400 },
    { month: 'Jun', year: '21', young: 262200, old: 4565600 },
    { month: 'Jul', year: '21', young: 266600, old: 4585100 },
    { month: 'Ago', year: '21', young: 261000, old: 4587300 },
    { month: 'Set', year: '21', young: 246100, old: 4580100 },
    { month: 'Out', year: '21', young: 246700, old: 4581400 },
    { month: 'Nov', year: '21', young: 248300, old: 4605200 },
  ],
  unemployment: {
    // don't forget to change lastMonth
    2019: {
      Jan: {
        Norte: 140696,
        Centro: 46703,
        LVT: 101758,
        Alentejo: 16621,
        Algarve: 20748,
        Açores: 7685,
        Madeira: 16561,
      },
      Fev: {
        Norte: 137964,
        Centro: 45660,
        LVT: 100102,
        Alentejo: 15783,
        Algarve: 19014,
        Açores: 7665,
        Madeira: 16514,
      },
      Mar: {
        Norte: 136319,
        Centro: 44374,
        LVT: 98370,
        Alentejo: 15473,
        Algarve: 15305,
        Açores: 7624,
        Madeira: 16311,
      },
      Abr: {
        Norte: 133143,
        Centro: 43663,
        LVT: 94043,
        Alentejo: 14994,
        Algarve: 11782,
        Açores: 7422,
        Madeira: 16193,
      },
      Mai: {
        Norte: 126663,
        Centro: 41451,
        LVT: 91018,
        Alentejo: 14007,
        Algarve: 9153,
        Açores: 7136,
        Madeira: 15743,
      },
      Jun: {
        Norte: 124858,
        Centro: 40843,
        LVT: 88850,
        Alentejo: 13520,
        Algarve: 7879,
        Açores: 7084,
        Madeira: 15157,
      },
      Jul: {
        Norte: 124246,
        Centro: 40626,
        LVT: 89204,
        Alentejo: 13956,
        Algarve: 7229,
        Açores: 7058,
        Madeira: 14971,
      },
      Ago: {
        Norte: 127281,
        Centro: 42323,
        LVT: 91140,
        Alentejo: 14268,
        Algarve: 7353,
        Açores: 7040,
        Madeira: 14925,
      },
      Set: {
        Norte: 126215,
        Centro: 42188,
        LVT: 88445,
        Alentejo: 14264,
        Algarve: 8276,
        Açores: 7029,
        Madeira: 14865,
      },
      Out: {
        Norte: 124078,
        Centro: 41647,
        LVT: 87441,
        Alentejo: 14686,
        Algarve: 10285,
        Açores: 7007,
        Madeira: 14876,
      },
      Nov: {
        Norte: 122861,
        Centro: 41388,
        LVT: 87593,
        Alentejo: 14674,
        Algarve: 17350,
        Açores: 6994,
        Madeira: 15101,
      },
      Dez: {
        Norte: 123369,
        Centro: 41678,
        LVT: 88732,
        Alentejo: 14918,
        Algarve: 19479,
        Açores: 6982,
        Madeira: 15324,
      },
    },
    2020: {
      Jan: {
        Norte: 125571,
        Centro: 42894,
        LVT: 93050,
        Alentejo: 15601,
        Algarve: 20815,
        Açores: 6973,
        Madeira: 15654,
      },
      Fev: {
        Norte: 124337,
        Centro: 41927,
        LVT: 92458,
        Alentejo: 15106,
        Algarve: 19188,
        Açores: 6956,
        Madeira: 15590,
      },
      Mar: {
        Norte: 134578,
        Centro: 45845,
        LVT: 102108,
        Alentejo: 16997,
        Algarve: 21636,
        Açores: 6951,
        Madeira: 15646,
      },
      Abr: {
        Norte: 151853,
        Centro: 50807,
        LVT: 121004,
        Alentejo: 18882,
        Algarve: 26379,
        Açores: 6963,
        Madeira: 16435,
      },
      Mai: {
        Norte: 156260,
        Centro: 52033,
        LVT: 129917,
        Alentejo: 18619,
        Algarve: 27675,
        Açores: 6965,
        Madeira: 17465,
      },
      Jun: {
        Norte: 153548,
        Centro: 51618,
        LVT: 131972,
        Alentejo: 18351,
        Algarve: 26140,
        Açores: 6963,
        Madeira: 18073,
      },
      Jul: {
        Norte: 154667,
        Centro: 51267,
        LVT: 135240,
        Alentejo: 17995,
        Algarve: 22850,
        Açores: 6957,
        Madeira: 18326,
      },
      Ago: {
        Norte: 158013,
        Centro: 51944,
        LVT: 134944,
        Alentejo: 18156,
        Algarve: 20425,
        Açores: 6949,
        Madeira: 18900,
      },
      Set: {
        Norte: 156650,
        Centro: 50938,
        LVT: 136844,
        Alentejo: 18152,
        Algarve: 21310,
        Açores: 6942,
        Madeira: 19338,
      },
      Out: {
        Norte: 153020,
        Centro: 48843,
        LVT: 133707,
        Alentejo: 17536,
        Algarve: 24088,
        Açores: 6950,
        Madeira: 19404,
      },
      Nov: {
        Norte: 149421,
        Centro: 47823,
        LVT: 128024,
        Alentejo: 17226,
        Algarve: 29082,
        Açores: 6962,
        Madeira: 19749,
      },
      Dez: {
        Norte: 150308,
        Centro: 50576,
        LVT: 125213,
        Alentejo: 17740,
        Algarve: 31313,
        Açores: 6988,
        Madeira: 20116,
      },
    },
    2021: {
      Jan: {
        Norte: 157668,
        Centro: 52083,
        LVT: 135230,
        Alentejo: 18426,
        Algarve: 33571,
        Açores: 7032,
        Madeira: 20349,
      },
      Fev: {
        Norte: 159942,
        Centro: 51498,
        LVT: 141326,
        Alentejo: 18231,
        Algarve: 33459,
        Açores: 7056,
        Madeira: 20331,
      },
      Mar: {
        Norte: 158483,
        Centro: 51154,
        LVT: 143653,
        Alentejo: 18631,
        Algarve: 33453,
        Açores: 7049,
        Madeira: 20428,
      },
      Abr: {
        Norte: 156362,
        Centro: 50187,
        LVT: 140134,
        Alentejo: 17753,
        Algarve: 32271,
        Açores: 6993,
        Madeira: 20188,
      },
      Mai: {
        Norte: 149074,
        Centro: 47926,
        LVT: 135389,
        Alentejo: 16439,
        Algarve: 26601,
        Açores: 6857,
        Madeira: 19897,
      },
      Jun: {
        Norte: 142343,
        Centro: 45493,
        LVT: 128848,
        Alentejo: 15536,
        Algarve: 20030,
        Açores: 6550,
        Madeira: 19072,
      },
      Jul: {
        Norte: 139940,
        Centro: 44261,
        LVT: 126231,
        Alentejo: 15197,
        Algarve: 17932,
        Açores: 6497,
        Madeira: 18646,
      },
      Ago: {
        Norte: 141178,
        Centro: 44951,
        LVT: 127305,
        Alentejo: 14741,
        Algarve: 16366,
        Açores: 6462,
        Madeira: 17401,
      },
      Set: {
        Norte: 138000,
        Centro: 44853,
        LVT: 122221,
        Alentejo: 14876,
        Algarve: 16332,
        Açores: 6425,
        Madeira: 16441,
      },
      Out: {
        Norte: 135135,
        Centro: 43808,
        LVT: 118237 ,
        Alentejo: 15234,
        Algarve: 17331 ,
        Açores: 6253,
        Madeira: 15669,
      },
      Nov: {
        Norte: 129584,
        Centro: 42805,
        LVT: 114752 ,
        Alentejo: 15139,
        Algarve: 22278 ,
        Açores: 6295,
        Madeira: 15031,
      },
      Dez: {
        Norte: 129555,
        Centro: 42638,
        LVT: 114720,
        Alentejo: 15625,
        Algarve: 24590,
        Açores: 6349,
        Madeira: 14482,
      },
    },
  },
  inflation: {
    2019: {
      Jan:  0.48,
      Fev:  0.94,
      Mar:  0.85,
      Abr:  0.77,
      Mai:  0.42,
      Jun:  0.39,
      Jul: -0.32,
      Ago: -0.09,
      Set: -0.11,
      Out:  0.02,
      Nov:  0.32,
      Dez:  0.42,
    },
    2020: {
      Jan:  0.80,
      Fev:  0.38,
      Mar:  0.05,
      Abr: -0.22,
      Mai: -0.72,
      Jun:  0.13,
      Jul:  0.14,
      Ago: -0.01,
      Set: -0.14,
      Out: -0.07,
      Nov: -0.22,
      Dez: -0.23,
    },
    2021: {
      Jan: 0.30,
      Fev: 0.48,
      Mar: 0.45,
      Abr: 0.55,
      Mai: 1.24,
      Jun: 0.51,
      Jul: 1.47,
      Ago: 1.54,
      Set: 1.48,
      Out: 1.83,
      Nov: 2.58,
      Dez: 2.74,
    },
  },
  inflation_flat: () => {
    const aux = {};
    Object.keys(state.inflation).forEach(year => {
      Object.keys(state.inflation[year]).forEach(month => {
        aux[`${month}/${year}`] = state.inflation[year][month];
      })
    });
    return aux;
  },
  gdp: {
    2019: {
      T1: 52660800000,
      T2: 52695000000,
      T3: 53262800000,
      T4: 54164300000,
    },
    2020: {
      T1: 52718000000,
      T2: 46327200000,
      T3: 51590000000,
      T4: 51793500000,
    },
    2021: {
      T1: 50829100000,
      T2: 53038100000,
      T3: 53605400000,
    },
  },
  gdp_flat: () => {
    const aux = {};
    Object.keys(state.gdp).forEach((year) => {
      Object.keys(state.gdp[year]).forEach((quarter) => {
        aux[`${quarter}/${year}`] = state.gdp[year][quarter];
      });
    });
    return aux;
  },
  toc: [], // table of contents
  evm: null, // mortality data
  vaccines: null,
  last_with_age_data: {
    // DGS only send this data on some days
    index: null,
    label: 'Dados DGS',
  },
};

// compact and format date
function compactDate(date) {
  const formated = date.replace(/\-/g,'/');
  const match = formated.match(/(\d\d)\/(\d\d)\/\d\d(\d\d)/);
  return match ? `${match[1]}/${match[2]}/${match[3]}` : formated;
}

// calculate 7 days average for an array of values
function movingAverage(array, days = 7) {
  const resp = [];
  for (let counter = 0; counter < array.length; counter += 1 ) {
    if (counter < days - 1) {
      resp.push(null);
    } else {
      let accum = 0;
      for (let aux = days - 1; aux >= 0; aux -= 1) {
        accum += array[counter - aux];
      }
      resp.push(parseInt(accum / days));
    }
  }
  return resp;
}

// all tables
const tables = {
  ifr: (outer) => {
    createGraphContainer('ifr', outer);
    let total_confir = 0;
    let total_obitos = 0;
    let table = '<table style="font-size:.8rem">'
              + '  <thead>'
              + '    <tr>'
              + '      <td>Idade</td>'
              + '      <td>Confirmados</td>'
              + '      <td>Óbitos</td>'
              + '      <td>CFR</td>'
              + '    </tr>'
              + '  </thead>'
              + '  <tbody>';
    state.ages.forEach(age => {
      const full = state.json.full;
      const index = state.last_with_age_data.index;
      const confir = full[`confirmados_${age}_f`][index] + full[`confirmados_${age}_m`][index];
      const obitos = full[`obitos_${age}_f`][index] + full[`obitos_${age}_m`][index];
      const cfrate = (100 * obitos / confir).toFixed(2) + '%';
      total_confir += confir;
      total_obitos += obitos;
      table +=
        '    <tr style="padding: 1px">' +
        `      <td>${age}</td>` +
        `      <td>${confir.toLocaleString()}</td>` +
        `      <td>${obitos.toLocaleString()}</td>` +
        `      <td>${cfrate}</td>` +
        '    </tr>';
    });
    const total_cfrate = ((100 * total_obitos) / total_confir).toFixed(2) + '%';
    table +=
      '    <tr class="total">' +
      '      <td>Total</td>' +
      `      <td>${total_confir.toLocaleString()}</td>` +
      `      <td>${total_obitos.toLocaleString()}</td>` +
      `      <td>${total_cfrate}</td>` +
      '    </tr>' +
      '  </tbody>' +
      '</table>';
    const legend = `<p>${state.last_with_age_data.label}</p>`;
    document.querySelector('#ifr').innerHTML = table + legend;
  }
}

const resetZoomButton = {
  position: {
    // align: 'right', // by default
    // verticalAlign: 'top', // by default
    x: 5,
    y: -40,
  }
}

const panning = {
  enabled: true,
  type: 'x',
}

// all charts
const charts = {
  confirmados_dia_ars: (outer) => {
    createGraphContainer('confirmados_dia_ars', outer);
    Highcharts.chart('confirmados_dia_ars', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Confirmados por dia' },
      yAxis: { min: 0, title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: Object.keys(state.regions).map((region) => {
        return {
          name: region,
          data: Object.keys(state.json.delta[`confirmados_${region}`]).map((d) => {
            return state.json.delta[`confirmados_${region}`][d];
          }),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_dia_ars_percentagem: (outer) => {
    createGraphContainer('confirmados_dia_ars_percentagem', outer);
    Highcharts.chart('confirmados_dia_ars_percentagem', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Confirmados por dia % população' },
      yAxis: { min: 0, title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: Object.keys(state.regions).map((region) => {
        return {
          name: region,
          data: Object.keys(state.json.delta[`confirmados_${region}`]).map((d) => {
            const p =
              state.json.delta[`confirmados_${region}`][d] /
              state.regions[region].population;
            return parseFloat((100 * p).toFixed(2));
          }),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_dia: (outer) => {
    createGraphContainer('confirmados_dia', outer);
    const data = Object.keys(state.json.full.data).map(
      (k) => state.json.delta.confirmados[k]
    );
    Highcharts.chart('confirmados_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_total: (outer) => {
    createGraphContainer('confirmados_total', outer);
    Highcharts.chart('confirmados_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados',
          data: Object.keys(state.json.full.data).map(
            (k) => state.json.full.confirmados[k]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_hoje_generos: (outer) => {
    createGraphContainer('confirmados_hoje_generos', outer);
    Highcharts.chart('confirmados_hoje_generos', {
      chart: { type: 'bar' },
      title: { text: 'Hoje idade e género' },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. Idade {xDescription}, {value}.',
        },
      },
      xAxis: [
        {
          categories: state.ages,
          reversed: true,
          labels: { step: 1 },
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: true,
          categories: state.ages,
          linkedTo: 0,
          labels: { step: 1 },
        },
      ],
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          },
        },
      },
      plotOptions: { series: { stacking: 'normal' } },
      series: [
        {
          name: 'Confirmados femininos',
          data: state.ages.map(
            (age) => -state.json.delta[`confirmados_${age}_f`][state.last_with_age_data.index]
          ),
        },
        {
          name: 'Confirmados masculinos',
          data: state.ages.map(
            (age) => state.json.delta[`confirmados_${age}_m`][state.last_with_age_data.index]
          ),
        },
      ],
      credits: { text: state.last_with_age_data.label },
    });
  },
  confirmados_total_generos: (outer) => {
    createGraphContainer('confirmados_total_generos', outer);
    Highcharts.chart('confirmados_total_generos', {
      chart: { type: 'bar' },
      title: { text: 'Total idade e género' },
      xAxis: [
        {
          categories: state.ages,
          reversed: true,
          labels: { step: 1 },
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: true,
          categories: state.ages,
          linkedTo: 0,
          labels: { step: 1 },
        },
      ],
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          },
        },
      },
      plotOptions: { series: { stacking: 'normal' } },
      series: [
        {
          name: 'Confirmados femininos',
          data: state.ages.map((age) => -state.json.full[`confirmados_${age}_f`][state.last_with_age_data.index]),
        },
        {
          name: 'Confirmados masculinos',
          data: state.ages.map((age) => state.json.full[`confirmados_${age}_m`][state.last_with_age_data.index]),
        },
      ],
      credits: { text: state.last_with_age_data.label },
    });
  },
  confirmados_grupo_etario: (outer) => {
    createGraphContainer('confirmados_grupo_etario', outer);
    let last_value = 0;
    const data = state.ages.map((age) => {
      return {
        name: age,
        data: Object.keys(state.json.full[`confirmados_${age}`]).map((key, index) => {
          // for some reason, 25 April 2021 doesn't have data
          let value = state.json.full[`confirmados_${age}`][key];
          if (index > 100 && value === 0) value = last_value;
          last_value = value;
          return value;
        }),
      };
    });
    Highcharts.chart('confirmados_grupo_etario', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Confirmados idade' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: data,
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_grupo_etario_percentagem: (outer) => {
    createGraphContainer('confirmados_grupo_etario_percentagem', outer);
    let last_value = 0;
    const data = state.ages.map((age) => {
      return {
        name: age,
        data: Object.keys(state.json.full[`confirmados_${age}`]).map((key, index) => {
          // for some reason, 25 April 2021 doesn't have data
          let value = state.json.full[`confirmados_${age}`][key];
          const population = state.population_by_age[age];
          if (index > 100 && value === 0) value = last_value;
          last_value = value;
          const p = value * 100 / population;
          return parseFloat(p.toFixed(2));
        }),
      };
    });
    Highcharts.chart('confirmados_grupo_etario_percentagem', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Confirmados idade % população' },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: data,
      credits: { text: 'Dados DGS + Pordata' },
    });
  },
  confirmados_hoje_ars: (outer) => {
    createGraphContainer('confirmados_hoje_ars', outer);
    Highcharts.chart('confirmados_hoje_ars', {
      chart: { type: 'bar' },
      title: { text: 'Hoje ARS' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados',
          data: Object.keys(state.regions).map(
            (r) => state.json.delta[`confirmados_${r}`][state.json.today]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_total_ars: (outer) => {
    createGraphContainer('confirmados_total_ars', outer);
    Highcharts.chart('confirmados_total_ars', {
      chart: { type: 'bar' },
      title: { text: 'Total ARS' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados',
          data: Object.keys(state.regions).map(
            (r) => state.json.last[`confirmados_${r}`]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_hoje_ars_per_population: (outer) => {
    createGraphContainer('confirmados_hoje_ars_per_population', outer);
    Highcharts.chart('confirmados_hoje_ars_per_population', {
      chart: { type: 'bar' },
      title: { text: 'Hoje ARS % população' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados % população',
          data: Object.keys(state.regions).map((r) => {
            const confirmed = state.json.delta[`confirmados_${r}`][state.json.today];
            const population = state.regions[r].population;
            return Math.round(((confirmed * 100) / population) * 10000) / 10000;
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_total_ars_per_population: (outer) => {
    createGraphContainer('confirmados_total_ars_per_population', outer);
    Highcharts.chart('confirmados_total_ars_per_population', {
      chart: { type: 'bar' },
      title: { text: 'Total ARS % população' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Confirmados % população',
          data: Object.keys(state.regions).map((r) => {
            const confirmed = state.json.last[`confirmados_${r}`];
            const population = state.regions[r].population;
            return Math.round(((confirmed * 100) / population) * 10000) / 10000;
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_historico: (outer) => {
    createGraphContainer('confirmados_historico', outer);
    Highcharts.chart('confirmados_historico', {
      chart: { type: 'area', zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Evolução confirmados' },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((key) =>
          compactDate(state.json.full.data[key])
        ),
        tickmarkPlacement: 'on',
        title: { enabled: false },
        labels: { step: 30 },
      },
      yAxis: { title: { text: null } },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666',
          },
        },
      },
      series: Object.keys(state.regions).map((r) => {
        return {
          name: r,
          data: Object.keys(state.json.full.data).map(
            (key) => state.json.full[`confirmados_${r}`][key]
          ),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  confirmados_historico_100: (outer) => {
    createGraphContainer('confirmados_historico_100', outer);
    Highcharts.chart('confirmados_historico_100', {
      chart: { type: 'area', zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Evolução confirmados' },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((key) =>
          compactDate(state.json.full.data[key])
        ),
        tickmarkPlacement: 'on',
        title: { enabled: false },
        labels: { step: 30 },
      },
      yAxis: {
        labels: { format: '{value}%' },
        title: { enabled: false },
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
      },
      series: Object.keys(state.regions).map((r) => {
        return {
          name: r,
          data: Object.keys(state.json.full.data).map(
            (key) => state.json.full[`confirmados_${r}`][key]
          ),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_dia: (outer) => {
    createGraphContainer('obitos_dia', outer);
    const data = Object.keys(state.json.full.data).map((k) => state.json.delta.obitos[k]);
    Highcharts.chart('obitos_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Óbitos',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_total: (outer) => {
    createGraphContainer('obitos_total', outer);
    Highcharts.chart('obitos_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Óbitos',
          data: Object.keys(state.json.full.data).map((k) => state.json.full.obitos[k]),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_hoje_generos: (outer) => {
    createGraphContainer('obitos_hoje_generos', outer);
    Highcharts.chart('obitos_hoje_generos', {
      chart: { type: 'bar' },
      title: { text: 'Hoje idade e género' },
      xAxis: [
        {
          categories: state.ages,
          reversed: true,
          labels: { step: 1 },
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: true,
          categories: state.ages,
          linkedTo: 0,
          labels: { step: 1 },
        },
      ],
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          },
        },
      },
      plotOptions: { series: { stacking: 'normal' } },
      series: [
        {
          name: 'Óbitos femininos',
          data: state.ages.map(
            (age) => -state.json.delta[`obitos_${age}_f`][state.last_with_age_data.index]
          ),
        },
        {
          name: 'Óbitos masculinos',
          data: state.ages.map(
            (age) => state.json.delta[`obitos_${age}_m`][state.last_with_age_data.index]
          ),
        },
      ],
      credits: { text: state.last_with_age_data.label },
    });
  },
  obitos_total_generos: (outer) => {
    createGraphContainer('obitos_total_generos', outer);
    Highcharts.chart('obitos_total_generos', {
      chart: { type: 'bar' },
      title: { text: 'Total idade e género' },
      xAxis: [
        {
          categories: state.ages,
          reversed: true,
          labels: { step: 1 },
        },
        {
          // mirror axis on right side
          opposite: true,
          reversed: true,
          categories: state.ages,
          linkedTo: 0,
          labels: { step: 1 },
        },
      ],
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return Math.abs(this.value);
          },
        },
      },
      plotOptions: { series: { stacking: 'normal' } },
      series: [
        {
          name: 'Óbitos femininos',
          data: state.ages.map((age) => -state.json.full[`obitos_${age}_f`][state.last_with_age_data.index]),
        },
        {
          name: 'Óbitos masculinos',
          data: state.ages.map((age) => state.json.full[`obitos_${age}_m`][state.last_with_age_data.index]),
        },
      ],
      credits: { text: state.last_with_age_data.label },
    });
  },
  obitos_grupo_etario: (outer) => {
    createGraphContainer('obitos_grupo_etario', outer);
    let last_value = 0;
    const data = state.ages.map((age) => {
      return {
        name: age,
        data: Object.keys(state.json.full[`obitos_${age}`]).map((key, index) => {
          let value = state.json.full[`obitos_${age}`][key];
          if (index > 100 && value == 0) value = last_value;
          last_value = value;
          return value;
        }),
      };
    });
    Highcharts.chart('obitos_grupo_etario', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Óbitos idade' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: data,
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_grupo_etario_percentagem: (outer) => {
    createGraphContainer('obitos_grupo_etario_percentagem', outer);
    let last_value = 0;
    const data = state.ages.map((age) => {
      return {
        name: age,
        data: Object.keys(state.json.full[`obitos_${age}`]).map((key, index) => {
          let value = state.json.full[`obitos_${age}`][key];
          const population = state.population_by_age[age];
          if (index > 100 && value === 0) value = last_value;
          last_value = value;
          const p = value * 100 / population;
          return parseFloat(p.toFixed(2));
        }),
      };
    });
    Highcharts.chart('obitos_grupo_etario_percentagem', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Óbitos idade % população' },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: data,
      credits: { text: 'Dados DGS + Pordata' },
    });
  },
  obitos_hoje_ars: (outer) => {
    createGraphContainer('obitos_hoje_ars', outer);
    Highcharts.chart('obitos_hoje_ars', {
      chart: { type: 'bar' },
      title: { text: 'Hoje ARS' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Óbitos',
          data: Object.keys(state.regions).map(
            (r) => state.json.delta[`obitos_${r}`][state.json.today]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_total_ars: (outer) => {
    createGraphContainer('obitos_total_ars', outer);
    Highcharts.chart('obitos_total_ars', {
      chart: { type: 'bar' },
      title: { text: 'Total ARS' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Óbitos',
          data: Object.keys(state.regions).map(
            (r) => state.json.full[`obitos_${r}`][state.json.today]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_hoje_ars_per_population: (outer) => {
    createGraphContainer('obitos_hoje_ars_per_population', outer);
    Highcharts.chart('obitos_hoje_ars_per_population', {
      chart: { type: 'bar' },
      title: { text: 'Hoje ARS % população' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Óbitos % população',
          data: Object.keys(state.regions).map((r) => {
            const deaths = state.json.delta[`obitos_${r}`][state.json.today];
            const population = state.regions[r].population;
            return Math.round(((deaths * 100) / population) * 10000) / 10000;
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_total_ars_per_population: (outer) => {
    createGraphContainer('obitos_total_ars_per_population', outer);
    Highcharts.chart('obitos_total_ars_per_population', {
      chart: { type: 'bar' },
      title: { text: 'Total ARS % população' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Óbitos % população',
          data: Object.keys(state.regions).map((r) => {
            const deaths = state.json.full[`obitos_${r}`][state.json.today];
            const population = state.regions[r].population;
            return Math.round(((deaths * 100) / population) * 10000) / 10000;
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_historico: (outer) => {
    createGraphContainer('obitos_historico', outer);
    Highcharts.chart('obitos_historico', {
      chart: { type: 'area', zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Evolução óbitos' },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((key) =>
          compactDate(state.json.full.data[key])
        ),
        tickmarkPlacement: 'on',
        title: { enabled: false },
        labels: { step: 30 },
      },
      yAxis: { title: { text: null } },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666',
          },
        },
      },
      series: Object.keys(state.regions).map((r) => {
        return {
          name: r,
          data: Object.keys(state.json.full.data).map(
            (key) => state.json.full[`obitos_${r}`][key]
          ),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_historico_100: (outer) => {
    createGraphContainer('obitos_historico_100', outer);
    Highcharts.chart('obitos_historico_100', {
      chart: { type: 'area', zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Evolução óbitos' },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((key) =>
          compactDate(state.json.full.data[key])
        ),
        tickmarkPlacement: 'on',
        title: { enabled: false },
        labels: { step: 30 },
      },
      yAxis: {
        labels: { format: '{value}%' },
        title: { enabled: false },
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
      },
      series: Object.keys(state.regions).map((r) => {
        return {
          name: r,
          data: Object.keys(state.json.full.data).map(
            (key) => state.json.full[`obitos_${r}`][key]
          ),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_dia_ars: (outer) => {
    createGraphContainer('obitos_dia_ars', outer);
    Highcharts.chart('obitos_dia_ars', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Óbitos por dia' },
      yAxis: { min: 0, title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: Object.keys(state.regions).map((region) => {
        return {
          name: region,
          data: Object.keys(state.json.delta[`obitos_${region}`]).map((d) => {
            return state.json.delta[`obitos_${region}`][d];
          }),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_dia_ars_percentagem: (outer) => {
    createGraphContainer('obitos_dia_ars_percentagem', outer);
    Highcharts.chart('obitos_dia_ars_percentagem', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Óbitos por dia % população' },
      yAxis: { min: 0, title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 }, // show only every 30 days
      },
      legend: { enable: false },
      series: Object.keys(state.regions).map((region) => {
        return {
          name: region,
          data: Object.keys(state.json.delta[`obitos_${region}`]).map((d) => {
            const p =
              state.json.delta[`obitos_${region}`][d] /
              state.regions[region].population;
            return parseFloat((100 * p).toFixed(4));
          }),
        };
      }),
      credits: { text: 'Dados DGS' },
    });
  },
  recuperados_dia: (outer) => {
    createGraphContainer('recuperados_dia', outer);
    const data = Object.keys(state.json.full.data).map(
      (k) => state.json.delta.recuperados[k]
    );
    Highcharts.chart('recuperados_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Recuperados',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  recuperados_total: (outer) => {
    createGraphContainer('recuperados_total', outer);
    Highcharts.chart('recuperados_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Recuperados',
          data: Object.keys(state.json.full.data).map(
            (k) => state.json.full.recuperados[k]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  ativos_dia: (outer) => {
    createGraphContainer('ativos_dia', outer);
    const data = Object.keys(state.json.full.data).map((k) => state.json.delta.ativos[k]);
    Highcharts.chart('ativos_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Activos',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  ativos_total: (outer) => {
    createGraphContainer('ativos_total', outer);
    Highcharts.chart('ativos_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Activos',
          data: Object.keys(state.json.full.data).map((k) => state.json.full.ativos[k]),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  amostras_dia: (outer) => {
    createGraphContainer('amostras_dia', outer);
    const data = state.amostras.map((k) => parseInt(k[2], 10));
    Highcharts.chart('amostras_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: state.amostras.map((k) => compactDate(k[0])),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Amostras',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  amostras_dia_perc_positivos: (outer) => {
    createGraphContainer('amostras_dia_perc_positivos', outer);
    const data = state.amostras.map((a, k) => {
      if (parseInt(a[2]) === 0) return 0;
      return parseFloat(
        ((100 * state.json.delta.confirmados[k]) / parseInt(a[2])).toFixed(2)
      );
    });
    Highcharts.chart('amostras_dia_perc_positivos', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: '% Positivos' },
      yAxis: {
        title: { text: null },
        labels: { format: '{value}%' },
      },
      xAxis: {
        categories: state.amostras.map((k) => compactDate(k[0])),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Amostras',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  amostras_dia_pcr: (outer) => {
    createGraphContainer('amostras_dia_pcr', outer);
    const data = state.amostras.map((k) => parseInt(k[4], 10));
    Highcharts.chart('amostras_dia_pcr', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'PCR por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: state.amostras.map((k) => compactDate(k[0])),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Amostras PCR',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  amostras_dia_antigenio: (outer) => {
    createGraphContainer('amostras_dia_antigenio', outer);
    const data = state.amostras.map((k) => parseInt(k[6], 10));
    Highcharts.chart('amostras_dia_antigenio', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Antigénio por dia' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: state.amostras.map((k) => compactDate(k[0])),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Amostras antigénio',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  internados_normal_dia: (outer) => {
    createGraphContainer('internados_normal_dia', outer);
    const data = Object.keys(state.json.full.data).map(
      (k) => state.json.delta.internados[k]
    );
    Highcharts.chart('internados_normal_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Variação diária' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Internados',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  internados_uci_dia: (outer) => {
    createGraphContainer('internados_uci_dia', outer);
    const data = Object.keys(state.json.full.data).map(
      (k) => state.json.delta.internados_uci[k]
    );
    Highcharts.chart('internados_uci_dia', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Variação diária UCI' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Internados UCI',
          data: data,
        },
        {
          name: 'Média 7 dias',
          data: movingAverage(data),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  internados_normal_total: (outer) => {
    createGraphContainer('internados_normal_total', outer);
    Highcharts.chart('internados_normal_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Internados',
          data: Object.keys(state.json.full.data).map(
            (k) => state.json.full.internados[k]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  internados_uci_total: (outer) => {
    createGraphContainer('internados_uci_total', outer);
    Highcharts.chart('internados_uci_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total UCI' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Internados UCI',
          data: Object.keys(state.json.full.data).map(
            (k) => state.json.full.internados_uci[k]
          ),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  sintomas: (outer) => {
    createGraphContainer('sintomas', outer);
    Highcharts.chart('sintomas', {
      chart: { type: 'bar' },
      title: { text: 'Percentagem ocorrência' },
      xAxis: { categories: state.symptoms },
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return this.value + '%';
          },
        },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Sintomas',
          data: state.symptoms.map((s) => state.json.last[`sintomas_${s}`] * 100),
        },
      ],
      credits: { text: 'Dados DGS - deixou de informar a 16/08/2020' },
    });
  },
  sintomas_historico: (outer) => {
    createGraphContainer('sintomas_historico', outer);
    Highcharts.chart('sintomas_historico', {
      chart: { type: 'area' },
      title: { text: 'Evolução' },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((key) =>
          compactDate(state.json.full.data[key])
        ),
        tickmarkPlacement: 'on',
        title: { enabled: false },
        labels: { step: 30 },
      },
      yAxis: {
        labels: { format: '{value}%' },
        title: { enabled: false },
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: '#ffffff',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#ffffff',
          },
        },
      },
      series: state.symptoms.map((s) => {
        return {
          name: s,
          data: Object.keys(state.json.full.data).map(
            (key) => state.json.full[`sintomas_${s}`][key]
          ),
        };
      }),
      credits: { text: 'Dados DGS - deixou de informar a 16/08/2020' },
    });
  },
  mortalidade_light: (outer) => {
    createGraphContainer('mortalidade_light', outer);
    Highcharts.chart('mortalidade_light', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Máx, mín, média e 2022' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: state.evm.mmm.xAxis.categories,
        labels: { step: 90 },
      },
      plotOptions: {
        line: {
          opacity: 0.3,
          lineWidth: 1,
        },
      },
      series: state.evm.mmm.yAxis.series,
      credits: { text: 'Dados EVM' },
    });
  },
  mortalidade_acum: (outer) => {
    createGraphContainer('mortalidade_acum', outer);
    Highcharts.chart('mortalidade_acum', {
      chart: { type: 'column' },
      title: { text: 'Acumulados até ontem' },
      xAxis: { categories: state.evm.acum.xAxis.categories },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Óbitos',
          data: state.evm.acum.yAxis.series.data,
        },
      ],
      credits: { text: 'Dados EVM' },
    });
  },
  mortalidade_excessiva: (outer) => {
    createGraphContainer('mortalidade_excessiva', outer);
    Highcharts.chart('mortalidade_excessiva', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Mortalidade excessiva' },
      yAxis: { title: { text: null } },
      xAxis: {
        categories: state.evm.mmm.xAxis.categories,
        labels: { step: 90 },
      },
      series: [state.evm.mmm.yAxis.series[1], state.evm.mmm.yAxis.series[3]],
      credits: { text: 'Dados EVM' },
    });
  },
  mortalidade_excessiva_percentagem: (outer) => {
    createGraphContainer('mortalidade_excessiva_percentagem', outer);
    Highcharts.chart('mortalidade_excessiva_percentagem', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Mortalidade excessiva %' },
      yAxis: {
        title: { text: null },
        labels: {
          formatter: function () {
            return this.value + '%';
          },
        },
      },
      xAxis: {
        categories: state.evm.mmm.xAxis.categories,
        labels: { step: 90 },
      },
      series: [
        {
          data: state.evm.mmm.yAxis.series[1].data.map((n) => 0),
          name: 'Média',
        },
        {
          data: state.evm.mmm.yAxis.series[3].data.map((n, idx) => {
            if (n == null) return null;
            const avg = state.evm.mmm.yAxis.series[1].data[idx];
            return parseFloat((((n - avg) / avg) * 100).toFixed(2));
          }),
          name: '2022 em %',
        },
      ],
      credits: { text: 'Dados EVM' },
    });
  },
  mortalidade_mais_covid: (outer) => {
    createGraphContainer('mortalidade_mais_covid', outer);
    Highcharts.chart('mortalidade_mais_covid', {
      title: { text: 'Mortalidade por mês' },
      xAxis: state.evm.monthly.xAxis,
      yAxis: { title: { text: null } },
      series: state.evm.monthly.yAxis.series,
      credits: { text: 'Dados EVM' },
    });
  },
  populacao_ars: (outer) => {
    createGraphContainer('populacao_ars', outer);
    Highcharts.chart('populacao_ars', {
      chart: { type: 'bar' },
      title: { text: 'Habitantes' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Habitantes',
          data: Object.keys(state.regions).map((r) => state.regions[r].population),
        },
      ],
      credits: { text: 'Dados SNS' },
    });
  },
  populacao_densidade_ars: (outer) => {
    createGraphContainer('populacao_densidade_ars', outer);
    Highcharts.chart('populacao_densidade_ars', {
      chart: { type: 'bar' },
      title: { text: 'Habitantes / Km2' },
      xAxis: { categories: Object.keys(state.regions) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Hab/Km2',
          data: Object.keys(state.regions).map((r) => state.regions[r].density),
        },
      ],
      credits: { text: 'Dados Pordata' },
    });
  },
  populacao_densidade_confirmados: (outer) => {
    createGraphContainer('populacao_densidade_confirmados', outer);
    Highcharts.chart('populacao_densidade_confirmados', {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
      },
      title: { text: 'Confirmados % população por ARS' },
      legend: { enabled: false },
      xAxis: { title: { text: 'Hab/Km2' } },
      yAxis: { title: { enabled: false } },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          }
        }
      },
      series: [
        {
          name: 'confirmados',
          dataLabels: [{
            align: 'center',
            format: '{point.name}'
          }],
          data: Object.keys(state.regions).map((r) => {
            return {
              name: r,
              x: state.regions[r].density,
              y: (100 * state.json.last[`confirmados_${r}`]) / state.regions[r].population,
            };
          }),
        },
      ],
      credits: { text: 'Dados DGS + Pordata + SNS' },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b><br />
                  <b>${this.x}</b> hab/km<sup>2</sup><br />
                  <b>${this.y.toFixed(2)}%</b> da população`
        }
      },
    });
  },
  populacao_densidade_obitos: (outer) => {
    createGraphContainer('populacao_densidade_obitos', outer);
    Highcharts.chart('populacao_densidade_obitos', {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
      },
      title: { text: 'Óbitos % população por ARS' },
      legend: { enabled: false },
      xAxis: { title: { text: 'Hab/Km2' } },
      yAxis: { title: { enabled: false } },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          }
        }
      },
      series: [
        {
          name: 'óbitos',
          dataLabels: [{
            align: 'center',
            format: '{point.name}'
          }],
          data: Object.keys(state.regions).map((r) => {
            return {
              name: r,
              x: state.regions[r].density,
              y: (100 * state.json.last[`obitos_${r}`]) / state.regions[r].population,
            };
          }),
        },
      ],
      credits: { text: 'Dados DGS + Pordata + SNS' },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b><br />
                  <b>${this.x}</b> hab/km<sup>2</sup><br />
                  <b>${this.y.toFixed(2)}%</b> da população`
        }
      },
    });
  },
  populacao_idade: (outer) => {
    createGraphContainer('populacao_idade', outer);
    Highcharts.chart('populacao_idade', {
      chart: { type: 'bar' },
      title: { text: 'Idades' },
      xAxis: { categories: state.ages },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: 'Habitantes',
          data: state.ages.map((age) => state.population_by_age[age]),
        },
      ],
      credits: { text: 'Dados Pordata' },
    });
  },
  empregos_total: (outer) => {
    createGraphContainer('empregos_total', outer);
    Highcharts.chart('empregos_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Total empregados' },
      xAxis: { categories: state.employment.map((i) => i.month + i.year) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Absolutos',
          data: state.employment.map((i) => i.young + i.old),
        },
        {
          name: 'Ajustado à sazonalidade',
          data: state.employment_adjusted.map((i) => (i ? i.young + i.old : null)),
        },
      ],
      credits: { enabled: true, text: 'Dados INE' },
    });
  },
  empregos_variacao: (outer) => {
    createGraphContainer('empregos_variacao', outer);
    Highcharts.chart('empregos_variacao', {
      chart: { type: 'column', zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Variação mês anterior' },
      xAxis: { categories: state.employment.map((i) => i.month + i.year) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'Absolutos',
          data: state.employment_variation.map((i) => i.young + i.old),
        },
        {
          name: 'Ajustado à sazonalidade',
          data: state.employment_variation_adjusted.map((i) =>
            i ? i.young + i.old : null
          ),
        },
      ],
      credits: { enabled: true, text: 'Dados INE' },
    });
  },
  empregos_menos24_total: (outer) => {
    createGraphContainer('empregos_menos24_total', outer);
    Highcharts.chart('empregos_menos24_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Empregados 15 a 24 anos' },
      yAxis: { title: { text: null } },
      xAxis: { categories: state.employment.map((i) => i.month + i.year) },
      legend: { enable: false },
      series: [
        {
          name: 'Absolutos',
          data: state.employment.map((i) => i.young),
        },
        {
          name: 'Ajustado à sazonalidade',
          data: state.employment_adjusted.map((i) => (i ? i.young : null)),
        },
      ],
      credits: { enabled: true, text: 'Dados INE' },
    });
  },
  empregos_mais24_total: (outer) => {
    createGraphContainer('empregos_mais24_total', outer);
    Highcharts.chart('empregos_mais24_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Empregados +24 anos' },
      yAxis: { title: { text: null } },
      xAxis: { categories: state.employment.map((i) => i.month + i.year) },
      legend: { enable: false },
      series: [
        {
          name: 'Absolutos',
          data: state.employment.map((i) => i.old),
        },
        {
          name: 'Ajustado à sazonalidade',
          data: state.employment_adjusted.map((i) => (i ? i.old : null)),
        },
      ],
      credits: { enabled: true, text: 'Dados INE' },
    });
  },
  desemprego_total: (outer) => {
    createGraphContainer('desemprego_total', outer);
    Highcharts.chart('desemprego_total', {
      title: { text: 'Total desempregados' },
      xAxis: { categories: Object.keys(state.unemployment['2020']) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: '2019',
          data: Object.keys(state.unemployment['2019']).map((month) => {
            const regions = Object.keys(state.unemployment['2019'][month]);
            return regions.reduce((acc, cur) => {
              acc += state.unemployment['2019'][month][cur];
              return acc;
            }, 0);
          }),
        },
        {
          name: '2020',
          data: Object.keys(state.unemployment['2020']).map((month) => {
            const regions = Object.keys(state.unemployment['2020'][month]);
            return regions.reduce((acc, cur) => {
              acc += state.unemployment['2020'][month][cur];
              return acc;
            }, 0);
          }),
        },
        {
          name: '2021',
          data: Object.keys(state.unemployment['2021']).map((month) => {
            const regions = Object.keys(state.unemployment['2021'][month]);
            return regions.reduce((acc, cur) => {
              acc += state.unemployment['2021'][month][cur];
              return acc;
            }, 0);
          }),
        },
      ],
      credits: { text: 'Dados IEFP' },
    });
  },
  desemprego_ars: (outer) => {
    const lastMonth = { name: 'Dezembro', id: 'Dez' };
    createGraphContainer('desemprego_ars', outer);
    Highcharts.chart('desemprego_ars', {
      chart: { type: 'bar' },
      title: { text: 'Desempregados por região' },
      xAxis: { categories: Object.keys(state.unemployment['2020']['Nov']) },
      yAxis: { title: { text: null } },
      legend: { enable: false },
      series: [
        {
          name: `${lastMonth.name} 2019`,
          data: Object.keys(state.unemployment['2019'][lastMonth.id]).map(
            (r) => state.unemployment['2019'][lastMonth.id][r]
          ),
        },
        {
          name: `${lastMonth.name} 2020`,
          data: Object.keys(state.unemployment['2020'][lastMonth.id]).map(
            (r) => state.unemployment['2020'][lastMonth.id][r]
          ),
        },
        {
          name: `${lastMonth.name} 2021`,
          data: Object.keys(state.unemployment['2021'][lastMonth.id]).map(
            (r) => state.unemployment['2021'][lastMonth.id][r]
          ),
        },
      ],
      credits: { text: 'Dados IEFP' },
    });
  },
  pib_total: (outer) => {
    const tmpData = state.gdp_flat();
    createGraphContainer('pib_total', outer);
    Highcharts.chart('pib_total', {
      title: { text: 'PIB evolução' },
      xAxis: { categories: Object.keys(tmpData) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: 'PIB',
          data: Object.keys(tmpData).map(
            (quarter) => tmpData[quarter]
          ),
        },
      ],
      credits: { text: 'Dados INE' },
    });
  },
  pib_trimestral: (outer) => {
    createGraphContainer('pib_trimestral', outer);
    Highcharts.chart('pib_trimestral', {
      title: { text: 'PIB trimestral' },
      xAxis: { categories: Object.keys(state.gdp['2019']) },
      yAxis: { title: { text: null } },
      series: [
        {
          name: '2019',
          data: Object.keys(state.gdp['2019']).map(
            (quarter) => state.gdp['2019'][quarter]
          ),
        },
        {
          name: '2020',
          data: Object.keys(state.gdp['2020']).map(
            (quarter) => state.gdp['2020'][quarter]
          ),
        },
        {
          name: '2021',
          data: Object.keys(state.gdp['2021']).map(
            (quarter) => state.gdp['2021'][quarter]
          ),
        },
      ],
      credits: { text: 'Dados INE' },
    });
  },
  vacinas_total: (outer) => {
    createGraphContainer('vacinas_total', outer);
    Highcharts.chart('vacinas_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Vacinas' },
      yAxis: { title: { text: null } },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%d/%m/%y}',
        },
        tickLength: 0,
      },
      series: [
        {
          name: 'Doses administradas',
          data: state.vaccines.total,
        },
        {
          name: 'Boosters',
          data: state.vaccines.boosters,
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  vacinas_pessoas: (outer) => {
    createGraphContainer('vacinas_pessoas', outer);
    Highcharts.chart('vacinas_pessoas', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Vacinados' },
      yAxis: { title: { text: null } },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%d/%m/%y}',
        },
        tickLength: 0,
      },
      series: [
        {
          name: 'Uma dose',
          data: state.vaccines.onedose,
        },
        {
          name: 'Duas doses',
          data: state.vaccines.twodose,
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  inflacao_total: (outer) => {
    createGraphContainer('inflacao_total', outer);
    Highcharts.chart('inflacao_total', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Inflação mensal' },
      xAxis: { categories: Object.keys(state.inflation_flat()) },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      series: [
        {
          name: 'Variação homóloga (%)',
          data: Object.keys(state.inflation_flat()).map((k) => {
            return state.inflation_flat()[k]
          }),
        },
      ],
      credits: { enabled: true, text: 'Dados INE' },
    });
  },
  inflacao_mensal: (outer) => {
    createGraphContainer('inflacao_mensal', outer);
    Highcharts.chart('inflacao_mensal', {
      title: { text: 'Inflação mensal' },
      xAxis: { categories: Object.keys(state.inflation['2020']) },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      series: [
        {
          name: '2019',
          data: Object.keys(state.inflation['2019']).map((month) => {
            return state.inflation['2019'][month]
          }),
        },
        {
          name: '2020',
          data: Object.keys(state.inflation['2020']).map((month) => {
            return state.inflation['2020'][month]
          }),
        },
        {
          name: '2021',
          data: Object.keys(state.inflation['2021']).map((month) => {
            return state.inflation['2021'][month]
          }),
        },
      ],
      credits: { text: 'Dados INE' },
    });
  },
  internados_per_activos: (outer) => {
    createGraphContainer('internados_per_activos', outer);
    Highcharts.chart('internados_per_activos', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Internados / activos' },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Percentagem internados / activos',
          data: Object.keys(state.json.full.data).map((k) => {
            if (k < 100) return null;
            const percentage = state.json.full.internados[k] / state.json.full.ativos[k] * 100;
            return parseFloat(percentage.toFixed(2));
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  },
  obitos_per_activos: (outer) => {
    createGraphContainer('obitos_per_activos', outer);
    Highcharts.chart('obitos_per_activos', {
      chart: { zoomType: 'x', resetZoomButton, panning },
      title: { text: 'Óbitos / activos' },
      yAxis: {
        labels: { format: '{value}%' },
        title: { text: null },
      },
      xAxis: {
        categories: Object.keys(state.json.full.data).map((k) =>
          compactDate(state.json.full.data[k])
        ),
        labels: { step: 30 },
      },
      legend: { enable: false },
      series: [
        {
          name: 'Percentagem óbitos / activos',
          data: Object.keys(state.json.full.data).map((k) => {
            if (k < 100) return null;
            const percentage = state.json.delta.obitos[k] / state.json.full.ativos[k] * 100;
            return parseFloat(percentage.toFixed(2));
          }),
        },
      ],
      credits: { text: 'Dados DGS' },
    });
  }
};

// get full update and calculate tests and daily deltas
function crunchData() {
  // find today index (starts with zero)
  state.json.today = Object.keys(state.json.full.data).reduce((acc, cur) => {
    if (state.json.last.data === state.json.full.data[cur]) acc = cur;
    return acc;
  }, 0);
  // find last date with symptoms
  state.symptoms.forEach(s => state.json.last[`sintomas_${s}`] = state.json.full[`sintomas_${s}`][172]),
  // calculate number of total tests
  state.json.full.testes = {};
  Object.keys(state.json.full.confirmados).forEach(key => {
    const sjf = state.json.full;
    sjf.testes[key] = null;
    if (sjf.confirmados[key] && sjf.n_confirmados[key]) {
      sjf.testes[key] = sjf.confirmados[key] + sjf.n_confirmados[key] + sjf.lab[key];
    }
  });
  // calculate deltas for all days and indicators
  const delta = {};
  Object.keys(state.json.full).forEach(key => {
    if (!key.match(/^data/) && !key.match(/^sintomas/)) {
      delta[key] = {};
      Object.keys(state.json.full[key]).forEach(idx => {
        delta[key][idx] = null;
        if (idx !== '0') {
          const previous = `${parseInt(idx) - 1}`;
          const diff = state.json.full[key][idx] - state.json.full[key][previous];
          delta[key][idx] = state.json.full[key][idx] > 0 ? diff : null;
        }
      });
    }
  });
  state.json.delta = delta;
  // calculate confirmed/deaths by age group
  ['confirmados', 'obitos'].forEach((kind) => {
    state.ages.forEach((age) => {
      const id = `${kind}_${age}`;
      state.json.full[id] = {};
      Object.keys(state.json.full[`${id}_f`]).forEach((key) => {
        state.json.full[id][key] = state.json.full[`${id}_f`][key] + state.json.full[`${id}_m`][key];
      })
    })
  })
  // calculate employement monthly variation
  state.employment_variation = state.employment.map((month, index) => {
    if (index === 0) {
      return { young:0, old: 0 };
    } else {
      const prevMonth = state.employment[index - 1];
      return {
        young: month.young - prevMonth.young,
        old: month.old - prevMonth.old,
      };
    }
  });
  // calculate employement seasonal adjustment
  state.employment_adjustement = state.employment.map((month, index) => {
    if (index < 12) {
      return null;
    } else {
      adjustment = state.employment_variation[index - 12];
      return {
        young: adjustment.young,
        old: adjustment.old,
      };
    }
  });
  //
  state.employment_adjusted = state.employment.map((month, index) => {
    if (index < 12) {
      return null;
    } else {
      adjustment = state.employment_adjustement[index];
      return {
        young: month.young - adjustment.young,
        old: month.old - adjustment.old,
      };
    }
  });
  // calculate employement monthly variation adjusted
  state.employment_variation_adjusted = state.employment_variation.map((month, index) => {
    if (index < 12) {
      return null;
    } else {
      adjustment = state.employment_adjustement[index];
      return {
        young: month.young - adjustment.young,
        old: month.old - adjustment.old,
      };
    }
  });
  // calculate gdp variation vs previous quarter
  state.gdp_abs_variation_previous_quarter = {
    '2019': {
      'T1': null,
      'T2': state.gdp['2019']['T2'] - state.gdp['2019']['T1'],
      'T3': state.gdp['2019']['T3'] - state.gdp['2019']['T2'],
      'T4': state.gdp['2019']['T4'] - state.gdp['2019']['T3'],
    },
    '2020': {
      'T1': state.gdp['2020']['T1'] - state.gdp['2019']['T4'],
      'T2': state.gdp['2020']['T2'] - state.gdp['2020']['T1'],
      'T3': null,
      'T4': null,
    },
  };
  state.gdp_per_variation_previous_quarter = {
    '2019': {
      'T1': null,
      'T2': state.gdp_abs_variation_previous_quarter['2019']['T2'] / state.gdp['2019']['T1'],
      'T3': state.gdp_abs_variation_previous_quarter['2019']['T3'] / state.gdp['2019']['T2'],
      'T4': state.gdp_abs_variation_previous_quarter['2019']['T4'] / state.gdp['2019']['T3'],
    },
    '2020': {
      'T1': state.gdp_abs_variation_previous_quarter['2020']['T1'] / state.gdp['2019']['T4'],
      'T2': state.gdp_abs_variation_previous_quarter['2020']['T2'] / state.gdp['2020']['T1'],
      'T3': null,
      'T4': null,
    }
  };
  state.gdp_abs_variation_homologous_quarter = {
    '2020': {
      'T1': state.gdp['2020']['T1'] - state.gdp['2019']['T1'],
      'T2': state.gdp['2020']['T2'] - state.gdp['2019']['T2'],
      'T3': state.gdp['2020']['T3'] - state.gdp['2019']['T3'],
      'T4': state.gdp['2020']['T4'] - state.gdp['2019']['T4'],
    },
  };
  state.gdp_per_variation_homologous_quarter = {
    '2020': {
      'T1': state.gdp_abs_variation_homologous_quarter['2020']['T1'] / state.gdp['2019']['T1'],
      'T2': state.gdp_abs_variation_homologous_quarter['2020']['T2'] / state.gdp['2019']['T2'],
      'T3': state.gdp_abs_variation_homologous_quarter['2020']['T3'] / state.gdp['2019']['T3'],
      'T4': state.gdp_abs_variation_homologous_quarter['2020']['T4'] / state.gdp['2019']['T4'],
    },
  };
  // calculate number of people vaccinated
  state.vaccines = {
    total: [],
    onedose: [],
    twodose: [],
    boosters: [],
  };
  let day0, day1, day2, day3, day4;
  state.json.vaccines.forEach(day => {
    day0 = day[0] || day0;
    day1 = day[1] || day1;
    day2 = day[2] || day2;
    day3 = day[3] || day3;
    day4 = day[4] || day4;
    state.vaccines.total.push([Date.parse(day0), parseInt(day1, 10)]);
    if (day2 && day3) {
      state.vaccines.onedose.push([Date.parse(day0), parseInt(day2 - day3, 10)]);
      state.vaccines.twodose.push([Date.parse(day0), parseInt(day3, 10)]);
    }
    if (day4) {
      state.vaccines.boosters.push([Date.parse(day0), parseInt(day4, 10)])
    }
  });
  // find last date with number of deaths by age
  const dataset_size = Object.keys(state.json.full.confirmados_40_49).length;
  for (let i = dataset_size - 1; i >= 0; i -= 1) {
    if (state.json.full.confirmados_40_49[i]) {
      state.last_with_age_data.index = i;
      if (i !== dataset_size - 1) {
        state.last_with_age_data.label = `Dados DGS - referentes a ${state.json.full.data[i]}`;
      }
      break;
    }
  }
}

// add graphics to the DOM
function addGraphics() {
  let outer;
  outer = addLead('Activos', 'activos');
  charts['ativos_dia'](outer);
  charts['ativos_total'](outer);
  charts['internados_per_activos'](outer);
  charts['obitos_per_activos'](outer);
  outer = addLead('Amostras', 'amostras');
  charts['amostras_dia'](outer);
  charts['amostras_dia_perc_positivos'](outer);
  charts['amostras_dia_pcr'](outer);
  charts['amostras_dia_antigenio'](outer);
  outer = addLead('Confirmados', 'confirmados');
  charts['confirmados_dia'](outer);
  charts['confirmados_total'](outer);
  charts['confirmados_hoje_generos'](outer);
  charts['confirmados_total_generos'](outer);
  charts['confirmados_grupo_etario'](outer);
  charts['confirmados_grupo_etario_percentagem'](outer);
  charts['confirmados_hoje_ars'](outer);
  charts['confirmados_hoje_ars_per_population'](outer);
  charts['confirmados_total_ars'](outer);
  charts['confirmados_total_ars_per_population'](outer);
  charts['confirmados_historico'](outer);
  charts['confirmados_historico_100'](outer);
  charts['confirmados_dia_ars'](outer);
  charts['confirmados_dia_ars_percentagem'](outer);
  outer = addLead('Emprego', 'emprego');
  charts['empregos_total'](outer);
  charts['empregos_variacao'](outer);
  charts['empregos_menos24_total'](outer);
  charts['empregos_mais24_total'](outer);
  charts['desemprego_total'](outer);
  charts['desemprego_ars'](outer);
  outer = addLead('Inflação', 'inflacao');
  charts['inflacao_total'](outer);
  charts['inflacao_mensal'](outer);
  outer = addLead('Internados', 'internados');
  charts['internados_normal_dia'](outer);
  charts['internados_uci_dia'](outer);
  charts['internados_normal_total'](outer);
  charts['internados_uci_total'](outer);
  if (state.evm) {
    outer = addLead('Mortalidade');
    charts['mortalidade_acum'](outer);
    charts['mortalidade_light'](outer);
    charts['mortalidade_excessiva'](outer);
    // charts['mortalidade_excessiva_percentagem'](outer);
    charts['mortalidade_mais_covid'](outer);
  }
  outer = addLead('Óbitos', 'obitos');
  charts['obitos_dia'](outer);
  charts['obitos_total'](outer);
  charts['obitos_hoje_generos'](outer);
  charts['obitos_total_generos'](outer);
  charts['obitos_grupo_etario'](outer);
  charts['obitos_grupo_etario_percentagem'](outer);
  charts['obitos_hoje_ars'](outer);
  charts['obitos_hoje_ars_per_population'](outer);
  charts['obitos_total_ars'](outer);
  charts['obitos_total_ars_per_population'](outer);
  charts['obitos_historico'](outer);
  charts['obitos_historico_100'](outer);
  charts['obitos_dia_ars'](outer);
  charts['obitos_dia_ars_percentagem'](outer);
  tables['ifr'](outer);
  outer = addLead('PIB', 'pib');
  charts['pib_total'](outer);
  charts['pib_trimestral'](outer);
  outer = addLead('População', 'populacao');
  charts['populacao_ars'](outer);
  charts['populacao_densidade_ars'](outer);
  charts['populacao_densidade_confirmados'](outer);
  charts['populacao_densidade_obitos'](outer);
  charts['populacao_idade'](outer);
  outer = addLead('Recuperados', 'recuperados');
  charts['recuperados_dia'](outer);
  charts['recuperados_total'](outer);
  outer = addLead('Rt', 'rt');
  renderNewRt(outer);
  outer = addLead('Sintomas', 'sintomas');
  charts['sintomas'](outer);
  charts['sintomas_historico'](outer);
  outer = addLead('Vacinas', 'vacinas');
  charts['vacinas_total'](outer);
  charts['vacinas_pessoas'](outer);
  renderTOC();
  document.getElementById('Fontes').style.display = 'block';
}

// util function, returns a DOM element, keep your code DRY
function createGraphContainer(id, outer) {
  const div = document.createElement('div');
  div.setAttribute('id', id);
  div.classList.add('graph_container');
  outer.appendChild(div);
}

function backToTop() {
  window.scrollTo(0, 0);
  history.pushState('', document.title, window.location.pathname + window.location.search);
}

// adds a new h2 and a new div, returns the div
function addLead(label, anchor) {
  const btt = '<a onclick="backToTop()" class="btt"><i class="fa fa-level-up"></i></a>';
  const h2 = document.createElement('h2');
  h2.id = anchor;
  h2.classList.add("section_divider");
  h2.innerHTML = label + btt;
  document.getElementById('content_container').appendChild(h2);
  state.toc.push({ anchor, label });
  const outer = document.createElement('div');
  outer.classList.add("outer_container");
  outer.classList.add("fluid-row");
  document.getElementById('content_container').appendChild(outer);
  return outer;
}

function addGraphicsTip() {
  let html = '<i class="fa fa-lightbulb-o" aria-hidden="true" aria-label="Email"></i> ';
  html += document.ontouchstart === undefined ?
    'Clica e arrasta nos gráficos para fazer zoom' :
    'É possível fazer zoom nos gráficos';
  const p = document.createElement('p');
  p.classList.add("tip");
  p.innerHTML = html;
  document.getElementById('content_container').appendChild(p);
}

// loading state goes from 5 to 1
function manageWait(step) {
  function addTo(id, html) {
    const actual = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = actual + html;
  }
  switch (step) {
    case 6:
      addTo('lastUpdate', `Última actualização a ${state.json.last.data}`);
      addTo('loading', 'A aceder aos dados DGS via VOST... ');
      break;
    case 5:
      addTo('loading', 'Feito<br />A aceder aos dados de mortalidade... ');
      break;
    case 4:
      addTo('loading', 'Feito<br />A aceder aos dados de amostras... ');
      break;
    case 3:
      addTo('loading', 'Feito<br />A aceder aos dados de vacinação... ');
      break;
    case 2:
      addTo('loading', 'Feito<br />Mostrar tabela com os dados do dia... ');
      break;
    case 1:
      addTo('loading', 'Feito<br />A chamar o estagiário para desenhar os gráficos... ');
      break;
    case 0:
      document.getElementById('loading').remove();
      break;
  }
}

// renders Table of Content
function renderTOC() {
  state.toc.push({ anchor: 'Fontes', label: 'Fontes' });
  const html = 'Index: <br />' + state.toc.map(item => `<a href="#${item.anchor}">${item.label}</a>`).join(' &middot; ');
  document.getElementById('toc').innerHTML = html;
}

// render new Rt from https://covidcountdown.today
function renderNewRt(outer) {
  const div = document.createElement('div');
  const a = document.createElement('a');
  const img = document.createElement('img');
  a.href = 'https://covidcountdown.today/';
  img.src = 'https://cdn.joaobordalo.com/images/static/covid/rt20220121.svg';
  img.classList.add('rt_graph');
  a.appendChild(img);
  div.appendChild(a)
  outer.appendChild(div);
}

// given an action, returns a api url
function apiURL(id) {
  const rnd = Math.floor(Math.random() * 99999999);
  return `https://cdn.joaobordalo.com/json/covid/${id}.json?${rnd}`;
}

// navigate to anchor if anchor present
function navigateToAnchor() {
  const anchor = window.location.hash.substr(1);
  if (anchor) document.getElementById(anchor)?.scrollIntoView();
}

// add a '+' on positive numbers
function addPrefix(number) {
  return number > 0 ? `+${number.toLocaleString()}` : number.toLocaleString();
}

// add summary of stats for the present day
function addTodayNumbers() {
  const lastAmostras = state.amostras[state.json.today-1]
                    || state.amostras[state.json.today-2]
                    || state.amostras[state.json.today-3]
                    || [null, null];

  const table = '<table>'
              + '  <thead>'
              + '    <tr>'
              + '      <td></td>'
              + `      <td class="right">Hoje</td>`
              + `      <td class="right">Total</td>`
              + '    </tr>'
              + '  </thead>'
              + '  <tbody>'
              + '    <tr>'
              + '      <td><a href="#Activos">Activos</a></td>'
              + `      <td>${addPrefix(state.json.delta.ativos[state.json.today])}</td>`
              + `      <td>${state.json.last.ativos.toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Amostras">Amostras</a></td>'
              + `      <td>${addPrefix(parseInt(lastAmostras[2]))}</td>`
              + `      <td>${parseInt(lastAmostras[1]).toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Confirmados">Confirmados</a></td>'
              + `      <td>${addPrefix(state.json.last.confirmados_novos)}</td>`
              + `      <td>${state.json.last.confirmados.toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Internados">Internados</a></td>'
              + `      <td>${addPrefix(state.json.delta.internados[state.json.today])}</td>`
              + `      <td>${state.json.full.internados[state.json.today].toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Internados">Internados UCI</a></td>'
              + `      <td>${addPrefix(state.json.delta.internados_uci[state.json.today])}</td>`
              + `      <td>${state.json.full.internados_uci[state.json.today].toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Óbitos">Óbitos</a></td>'
              + `      <td>${addPrefix(state.json.delta.obitos[state.json.today])}</td>`
              + `      <td>${state.json.full.obitos[state.json.today].toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Recuperados">Recuperados</a></td>'
              + `      <td>${addPrefix(state.json.delta.recuperados[state.json.today])}</td>`
              + `      <td>${state.json.full.recuperados[state.json.today].toLocaleString()}</td>`
              + '    </tr>'
              + '    <tr>'
              + '      <td><a href="#Vacinas">Vacinas</a></td>'
              + `      <td></td>`
              + `      <td>${state.vaccines.total[state.vaccines.total.length - 1][1].toLocaleString()}</td>`
              + '    </tr>'
              + '  </tbody>'
              + '</table>';
  document.getElementById("summary").innerHTML = table;
}

// go and render the page
async function go() {
  addGraphicsTip();
  addGraphics();
  navigateToAnchor();
  document.getElementsByTagName('footer')[0].style.visibility = 'visible';
}

// fetch all data
async function fetchData() {
  // get last update information (to manage waiting time)
  let response = await fetch(apiURL('last_update'));
  state.json.last = await response.json();
  const found = window.location.search?.match(/^\?(\d\d\-\d\d\-\d\d\d\d)$/);
  if (found) state.json.last.data = found[1] // implements time machine
  manageWait(6);
  // get full dataset from VOST
  response = await fetch(apiURL('full_dataset'));
  const full_dataset = await response.json();
  manageWait(5);
  // get mortality data
  response = await fetch(apiURL('mortality'));
  state.evm = await response.json();
  manageWait(4);
  // get tests data
  response = await fetch(apiURL('amostras'));
  const amostras = await response.json();
  state.amostras = amostras.splice(1);
  manageWait(3);
  // get vaccines data
  response = await fetch(apiURL('vaccines'));
  const vaccines = await response.json();
  state.json.vaccines = vaccines.splice(1);
  manageWait(2);
  // crunch data
  state.json.full = full_dataset;
  crunchData();
  // add table with summary for today
  addTodayNumbers();
  manageWait(1);
  // render all graphics
  setTimeout(function () {
    go(full_dataset);
    manageWait(0);
  }, 1000);
}

function setDarkThemeGraphs() {
  const options = {
    colors: ['#1f75b2', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#0a476f'],
          [1, '#001e45']
        ]
      },
      plotBorderColor: '#606063'
    },
    title: {
      style: {
        color: '#E0E0E3',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#F0F0F3',
          style: {
            fontSize: '13px'
          }
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      },
      title: {
        style: {
          color: '#C0C0C0'
        }
      }
    },
    credits: {
      style: {
        color: '#666'
      }
    },
    labels: {
      style: {
        color: '#707073'
      }
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },
    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },
    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },
    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    }
  };
  // Apply the theme
  Highcharts.setOptions(options);
}

// run when content is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains("dark-theme")) setDarkThemeGraphs();
  fetchData().catch(console.log);
});
