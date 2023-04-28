import ChartDataLabels from 'chartjs-plugin-datalabels';

export const sunChartData = (sunriseDate: Date, sunsetDate: Date) => {
  const d = new Date();
  const sunriseTime = new Date(sunriseDate).getTime();
  const sunsetTime = new Date(sunsetDate).getTime();
  const halfSunDuration = (sunsetTime - sunriseTime) / 2;
  return {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'SUNRISE & SUNSET',
          data: [
            { x: d.setHours(0, 0, 0, 0), y: -1 },
            { x: sunriseDate, y: 0 },
            { x: new Date(sunriseTime + halfSunDuration), y: 1 },
            { x: sunsetDate, y: 0 },
            { x: d.setHours(24, 0, 0, 0), y: -1 },
          ],
          borderColor: '#36495d',
          fill: true,
          pointRadius: [0, 3, 0, 3, 0],
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      maintainAspectRatio: false,
      responsive: true,
      lineTension: 0.4,
      plugins: {
        datalabels: {
          align: 'top',
          anchor: 'end',
          formatter: function (value: number, context: { dataIndex: number }) {
            if (context.dataIndex === 1) {
              return 'SUNRISE';
            }
            if (context.dataIndex === 3) {
              return 'SUNSET';
            } else {
              return '';
            }
          },
          padding: {
            bottom: 30,
          },
        },
        legend: {
          align: 'start',
          title: {
            position: 'start',
          },
          labels: {
            align: 'start',
            boxWidth: 0,
            font: {
              size: 14,
            },
          },
        },
      },
      scales: {
        y: {
          display: false,
        },
        x: {
          type: 'time',
          beginAtZero: true,
          position: 'center',
          grid: {
            display: false,
          },
        },
      },
    },
  };
};
export default sunChartData;
