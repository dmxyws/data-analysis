<template>
  <div class="stock-table-container">
    <el-table
      :data="tableData"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="序号" width="80" />
      <el-table-column prop="stockName" label="股票名称" width="120" />
      <el-table-column prop="stockCode" label="股票代码" width="120" />

      <el-table-column label="买入价" width="100">
        <template #default="{ row }">
          {{ row.buyPrice.toFixed(2) }}
        </template>
      </el-table-column>

      <el-table-column label="卖出价" width="100">
        <template #default="{ row }">
          {{ row.sellPrice.toFixed(2) }}
        </template>
      </el-table-column>

      <el-table-column label="收益率" width="100">
        <template #default="{ row }">{{ row.profitRate }}%</template>
      </el-table-column>

      <el-table-column label="K线类型" width="120">
        <template #default="{ row }">
          {{ formatKLineType(row.kLineType) }}
        </template>
      </el-table-column>

      <el-table-column label="涨幅" width="100">
        <template #default="{ row }">
          {{ formatPriceChange(row.priceChange) }}
        </template>
      </el-table-column>

      <el-table-column label="昨日量能" width="100">
        <template #default="{ row }">
          {{ formatYesterdayVolume(row.yesterdayVolume) }}
        </template>
      </el-table-column>

      <el-table-column label="今日量能" width="100">
        <template #default="{ row }">
          {{ formatTodayVolume(row.todayVolume) }}
        </template>
      </el-table-column>

      <el-table-column label="量比" width="100">
        <template #default="{ row }">
          {{ formatVolumeRatio(row.volumeRatio) }}
        </template>
      </el-table-column>

      <el-table-column label="走势类型" width="120">
        <template #default="{ row }">
          {{ formatTrendType(row.trendType) }}
        </template>
      </el-table-column>

      <el-table-column label="分时走势" width="120">
        <template #default="{ row }">
          {{ formatIntradayTrend(row.intradayTrend) }}
        </template>
      </el-table-column>

      <el-table-column label="价格波动" width="120">
        <template #default="{ row }">
          {{ formatPriceFluctuation(row.priceFluctuation) }}
        </template>
      </el-table-column>

      <el-table-column label="历史价位" width="100">
        <template #default="{ row }">
          {{ formatHistoricalPrice(row.historicalPrice) }}
        </template>
      </el-table-column>

      <el-table-column label="均线系统" width="120">
        <template #default="{ row }">
          {{ formatMovingAverage(row.movingAverage) }}
        </template>
      </el-table-column>

      <el-table-column prop="holdingDays" label="持有天数" width="100" />
      <el-table-column prop="buyDate" label="买入日期" width="120" />
      <el-table-column prop="sellDate" label="卖出日期" width="120" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  useKLineTypes,
  usePriceChanges,
  useYesterdayVolumes,
  useTodayVolumes,
  useVolumeRatios,
  useTrendTypes,
  useIntradayTrends,
  usePriceFluctuations,
  useHistoricalPrices,
  useMovingAverages
} from './useStockFormatters.js'

// 从hooks获取格式化函数
const { formatKLineType } = useKLineTypes()
const { formatPriceChange } = usePriceChanges()
const { formatYesterdayVolume } = useYesterdayVolumes()
const { formatTodayVolume } = useTodayVolumes()
const { formatVolumeRatio } = useVolumeRatios()
const { formatTrendType } = useTrendTypes()
const { formatIntradayTrend } = useIntradayTrends()
const { formatPriceFluctuation } = usePriceFluctuations()
const { formatHistoricalPrice } = useHistoricalPrices()
const { formatMovingAverage } = useMovingAverages()

// 表格数据
const tableData = ref([
  {
    id: 1,
    stockName: '上证指数',
    stockCode: '000001',
    buyPrice: 3250.56,
    sellPrice: 3280.78,
    profitRate: 0.93,
    kLineType: 2,
    priceChange: 2,
    yesterdayVolume: 1,
    todayVolume: 2,
    volumeRatio: 3,
    trendType: 2,
    intradayTrend: 3,
    priceFluctuation: 2,
    historicalPrice: 2,
    movingAverage: 3,
    buyDate: '2023-06-15',
    sellDate: '2023-06-20',
    holdingDays: 5
  },
  {
    id: 2,
    stockName: '深证成指',
    stockCode: '399001',
    buyPrice: 11058.63,
    sellPrice: 11123.96,
    profitRate: 0.59,
    kLineType: 1,
    priceChange: 1,
    yesterdayVolume: 2,
    todayVolume: 1,
    volumeRatio: 2,
    trendType: 1,
    intradayTrend: 1,
    priceFluctuation: 3,
    historicalPrice: 1,
    movingAverage: 2,
    buyDate: '2023-06-15',
    sellDate: '2023-06-20',
    holdingDays: 5
  },
  {
    id: 3,
    stockName: '创业板指',
    stockCode: '399006',
    buyPrice: 2284.3,
    sellPrice: 2293.67,
    profitRate: 0.41,
    kLineType: 3,
    priceChange: 1,
    yesterdayVolume: 1,
    todayVolume: 1,
    volumeRatio: 1,
    trendType: 3,
    intradayTrend: 4,
    priceFluctuation: 2,
    historicalPrice: 1,
    movingAverage: 1,
    buyDate: '2023-06-15',
    sellDate: '2023-06-20',
    holdingDays: 5
  }
])

// 模拟异步获取数据
onMounted(() => {
  console.log('表格数据加载完成')
})
</script>

<style lang="scss" scoped>
.stock-table-container {
  padding: 20px;

  .el-table {
    // 自定义表格样式
    --el-table-header-bg-color: #f5f7fa;
    --el-table-row-hover-bg-color: #fafafa;

    .cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // 为不同状态的单元格添加样式
    .high-profit {
      color: #f56c6c; // 红色表示高收益
    }

    .low-profit {
      color: #67c23a; // 绿色表示低收益
    }
  }
}
</style>
