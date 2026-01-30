<template>
  <v-card class="h-100">
    <v-card-title class="text-h6 font-weight-bold text-center"> Shipments by Status </v-card-title>
    <v-card-text>
      <div ref="chartRef" class="chart-container"></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  chartInstance.setOption({
    xAxis: {
      type: 'category',
      data: ['In Transit', 'Delivered', 'Delayed'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [8, 15, 2],
        type: 'bar',
        itemStyle: {
          color: '#512DA8', // match primary header color
        },
      },
    ],
  })

  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})

function resizeChart() {
  chartInstance?.resize()
}
</script>

<style scoped>
.chart-container {
  height: 600px;
  width: 600px;
}
</style>
