<template>
  <div>
    <canvas ref="canvaRef"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { default as ChartData } from './sun-data';
import 'chartjs-adapter-date-fns';
import { computed, ref, watch } from 'vue';

export default {
  name: 'SunChart',
  props: {
    sunriseDate: {
      required: true,
      type: Date,
    },
    sunsetDate: {
      required: true,
      type: Date,
    },
  },
  setup(props) {
    const canvaRef = ref();

    const sunChartData = computed(() =>
      ChartData(props.sunriseDate, props.sunsetDate)
    );

    function updateChart() {
      const chartInstance = Chart.getChart(canvaRef.value);
      if (chartInstance) {
        chartInstance.destroy();
      }
      new Chart(canvaRef.value, sunChartData.value as ChartConfiguration);
    }

    watch([() => props.sunriseDate, () => props.sunsetDate], updateChart);

    return { sunChartData, canvaRef, updateChart };
  },
  mounted() {
    this.updateChart();
  },
};
</script>
