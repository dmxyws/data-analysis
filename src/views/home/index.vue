<template>
  <div class="stock-table-container">
    <!-- 查询表单 -->
    <el-form :model="searchForm" label-width="100px" class="search-form">
      <el-row :gutter="24">
        <el-col :span="4">
          <el-form-item label="K线类型">
            <el-select
              v-model="searchForm.kLineType"
              placeholder="请选择K线类型"
            >
              <el-option
                v-for="item in kLineTypes"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="涨幅">
            <el-select
              v-model="searchForm.priceChange"
              placeholder="请选择涨幅"
            >
              <el-option
                v-for="item in priceChanges"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="昨日量能">
            <el-select
              v-model="searchForm.yesterdayVolume"
              placeholder="请选择昨日量能"
            >
              <el-option
                v-for="item in yesterdayVolumes"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="今日量能">
            <el-select
              v-model="searchForm.todayVolume"
              placeholder="请选择今日量能"
            >
              <el-option
                v-for="item in todayVolumes"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="量比">
            <el-select
              v-model="searchForm.volumeRatio"
              placeholder="请选择量比"
            >
              <el-option
                v-for="item in volumeRatios"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="走势类型">
            <el-select
              v-model="searchForm.trendType"
              placeholder="请选择走势类型"
            >
              <el-option
                v-for="item in trendTypes"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="分时走势">
            <el-select
              v-model="searchForm.intradayTrend"
              placeholder="请选择分时走势"
            >
              <el-option
                v-for="item in intradayTrends"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="价格波动">
            <el-select
              v-model="searchForm.priceFluctuation"
              placeholder="请选择价格波动"
            >
              <el-option
                v-for="item in priceFluctuations"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="历史价位">
            <el-select
              v-model="searchForm.historicalPrice"
              placeholder="请选择历史价位"
            >
              <el-option
                v-for="item in historicalPrices"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="均线系统">
            <el-select
              v-model="searchForm.movingAverage"
              placeholder="请选择均线系统"
            >
              <el-option
                v-for="item in movingAverages"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="text-align: right">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="showDialog('add')">
              新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table
      :data="tableData"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%; margin-top: 20px"
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
          <el-button
            size="small"
            type="primary"
            @click="showDialog('edit', row.id)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(row.id)"
            style="margin-left: 5px"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <FormDialog
    v-model:visible="dialogVisible"
    :dialogType="dialogType"
    :stockId="stockId"
    @onSuccess="handleSearch"
  />
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
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
import FormDialog from './components/formDialog.vue'
import { filterArrayByForm } from '@/utils/arrayUtils.js'

// 获取股票store
const stockStore = useStockStore()

// 从store获取股票数据
const stocks = computed(() => stockStore.getAllStocks())

const tableData = ref([])

// 从hooks获取格式化函数
const { kLineTypes, formatKLineType } = useKLineTypes()
const { priceChanges, formatPriceChange } = usePriceChanges()
const { yesterdayVolumes, formatYesterdayVolume } = useYesterdayVolumes()
const { todayVolumes, formatTodayVolume } = useTodayVolumes()
const { volumeRatios, formatVolumeRatio } = useVolumeRatios()
const { trendTypes, formatTrendType } = useTrendTypes()
const { intradayTrends, formatIntradayTrend } = useIntradayTrends()
const { priceFluctuations, formatPriceFluctuation } = usePriceFluctuations()
const { historicalPrices, formatHistoricalPrice } = useHistoricalPrices()
const { movingAverages, formatMovingAverage } = useMovingAverages()

const createFormData = () => ({
  kLineType: null,
  priceChange: null,
  yesterdayVolume: null,
  todayVolume: null,
  volumeRatio: null,
  trendType: null,
  intradayTrend: null,
  priceFluctuation: null,
  historicalPrice: null,
  movingAverage: null
})

// 查询表单数据
const searchForm = reactive(createFormData())

const handleSearch = () => {
  tableData.value = filterArrayByForm(stocks.value, searchForm)
}

const handleReset = () => {
  Object.assign(searchForm, createFormData())
  handleSearch()
}

// 对话框状态
const dialogVisible = ref(false)
const dialogType = ref('add')
const stockId = ref(0)

// 显示对话框
const showDialog = (type, id = 0) => {
  dialogType.value = type
  stockId.value = id
  dialogVisible.value = true
}

// 删除股票
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除这支股票吗？', '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      stockStore.deleteStockById(id)
      ElMessage({ type: 'success', message: '删除成功' })
    })
    .catch(console.log)
}

// 初始化数据
onMounted(() => {
  // 如果store中没有数据，添加一些示例数据
  // if (stocks.value.length === 0) {
  //   const exampleStocks = [
  //     {
  //       stockName: '上证指数',
  //       stockCode: '000001',
  //       buyPrice: 3250.56,
  //       sellPrice: 3280.78,
  //       profitRate: 0.93,
  //       kLineType: 2,
  //       priceChange: 2,
  //       yesterdayVolume: 1,
  //       todayVolume: 2,
  //       volumeRatio: 3,
  //       trendType: 2,
  //       intradayTrend: 3,
  //       priceFluctuation: 2,
  //       historicalPrice: 2,
  //       movingAverage: 3,
  //       holdingDays: 5,
  //       buyDate: '2023-06-15',
  //       sellDate: '2023-06-20'
  //     },
  //     {
  //       stockName: '深证成指',
  //       stockCode: '399001',
  //       buyPrice: 11058.63,
  //       sellPrice: 11123.96,
  //       profitRate: 0.59,
  //       kLineType: 1,
  //       priceChange: 1,
  //       yesterdayVolume: 2,
  //       todayVolume: 1,
  //       volumeRatio: 2,
  //       trendType: 1,
  //       intradayTrend: 1,
  //       priceFluctuation: 3,
  //       historicalPrice: 1,
  //       movingAverage: 2,
  //       holdingDays: 5,
  //       buyDate: '2023-06-15',
  //       sellDate: '2023-06-20'
  //     }
  //   ]
  //   stockStore.addStocks(exampleStocks) // 使用批量添加方法
  // }

  handleSearch()
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
