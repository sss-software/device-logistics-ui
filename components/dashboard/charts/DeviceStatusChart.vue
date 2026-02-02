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
import { DeviceService } from '@/services/device.service'

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
const deviceService = new DeviceService()

onMounted(async () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  const stats = await deviceService.getDevicesByStatus()
  const chartData = stats.map((s) => ({
    value: s.count,
    name: s.status,
  }))
  chartInstance.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%' },
    series: [
      {
        name: 'Devices',
        type: 'pie',
        radius: '60%',
        data: chartData,
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
