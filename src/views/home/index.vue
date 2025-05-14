<template>
  <div class="stock-table-container">
    <el-table
      :data="stocks"
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

      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button size="mini" type="primary" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStockStore } from '@/stores/stockStore.js'
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

// 获取股票store
const stockStore = useStockStore()

// 从store获取股票数据
const stocks = computed(() => stockStore.getAllStocks())

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

// 编辑股票
const handleEdit = (stock) => {
  console.log('编辑股票:', stock)
  // 这里可以打开编辑对话框
}

// 删除股票
const handleDelete = (id) => {
  if (confirm('确定要删除这支股票吗？')) {
    const result = stockStore.deleteStockById(id)
    if (result) {
      console.log('删除成功')
    } else {
      console.log('删除失败，股票不存在')
    }
  }
}

// 初始化数据
onMounted(() => {
  // 如果store中没有数据，添加一些示例数据
  if (stocks.value.length === 0) {
    const exampleStocks = [
      {
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
      }
      // 其他示例数据...
    ]

    stockStore.addStocks(exampleStocks) // 使用批量添加方法
  }
})
</script>

<style lang="scss" scoped>
.stock-table-container {
  padding: 20px;

  .el-table {
    --el-table-header-bg-color: #f5f7fa;
    --el-table-row-hover-bg-color: #fafafa;

    .cell {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
