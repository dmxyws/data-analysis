<template>
  <div ref="chartRef" class="w-full h-128"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

// 定义 props 和 emits
const props = defineProps({
  chartData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['chartClick'])

// 初始化图表
const chartRef = ref(null)
let chartInstance = null

const generateChartOption = (dataSource) => {
  const xAxisData = dataSource.map((colItem) => colItem.name)

  return {
    title: {
      text: '指标参数出现频率Top2排行榜',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].axisValue}<br/>
          ${params[0].data.name}: ${params[0].data.value} 次<br/>
          ${params[1].data.name}: ${params[1].data.value} 次`
      }
    },
    // 隐藏图例（因商品名称直接显示在柱子上）
    legend: { show: false },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: { alignWithLabel: true },
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: { interval: 0 } // 强制显示X轴标签
    },
    yAxis: {
      type: 'value',
      name: '频率（次）',
      nameGap: 40,
      min: 0,
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [
      {
        name: '类型1',
        type: 'bar',
        barWidth: '40%', // 占组宽度的40%（双柱总宽度80%，留20%间距）
        data: dataSource.map((colItem) => colItem.items[0]), // 直接传递包含name/value的对象
        label: {
          show: true,
          position: 'top',
          formatter: '{b}\n{c}' // 显示指标类型和频率
        },
        itemStyle: { color: '#409EFF' } // 蓝色
      },
      {
        name: '类型2',
        type: 'bar',
        barWidth: '40%',
        data: dataSource.map((colItem) => colItem.items[1]),
        label: {
          show: true,
          position: 'top',
          formatter: '{b}\n{c}'
        },
        itemStyle: { color: '#67C23A' } // 绿色
      }
    ],
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '8%',
      containLabel: true
    },
    // 控制双柱间距（通过categoryGap和barWidth配合）
    xAxis3D: { categoryGap: '20%' } // 类目间距控制柱组之间的间隔
  }
}

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const option = generateChartOption(props.chartData)

  chartInstance.setOption(option)

  // 绑定点击事件
  chartInstance.on('click', (params) => {
    emit('chartClick', params)
  })
}

// 生命周期钩子
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})

// 监听 props 变化，更新图表
watch(
  () => props.chartData,
  () => {
    if (chartInstance) {
      const option = generateChartOption(props.chartData)

      chartInstance.setOption(option)
    }
  }
)

// 处理窗口大小变化
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}
</script>

<style scoped>
.w-full {
  width: 1600px;
}
.h-128 {
  height: 512px;
}
</style>
