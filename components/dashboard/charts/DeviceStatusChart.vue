<template>
  <v-card class="h-100">
    <v-card-title class="text-h6 font-weight-bold text-center">Devices by Status</v-card-title>
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
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%' },
    series: [
      {
        name: 'Devices',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 12, name: 'Active' },
          { value: 5, name: 'Retired' },
          { value: 3, name: 'Under Repair' },
        ],
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
