<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogType === 'add' ? '新增' : '编辑'"
    width="600px"
  >
    <el-form ref="formRef" :model="formData" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="股票名称" prop="stockName">
            <el-input
              v-model="formData.stockName"
              placeholder="请输入股票名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="股票代码" prop="stockCode">
            <el-input
              v-model="formData.stockCode"
              placeholder="请输入股票代码"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="买入价" prop="buyPrice">
            <el-input-number
              v-model="formData.buyPrice"
              :min="0"
              :step="0.01"
              :precision="2"
              placeholder="请输入买入价"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卖出价" prop="sellPrice">
            <el-input-number
              v-model="formData.sellPrice"
              :min="0"
              :step="0.01"
              :precision="2"
              placeholder="请输入卖出价"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="收益率" prop="profitRate">
        <el-input-number
          v-model="formData.profitRate"
          :step="0.01"
          :precision="2"
          placeholder="请输入收益率"
        />
      </el-form-item>

      <el-form-item label="K线类型" prop="kLineType">
        <el-radio-group v-model="formData.kLineType">
          <el-radio-button
            v-for="item in kLineTypes"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="涨幅" prop="priceChange">
        <el-radio-group v-model="formData.priceChange">
          <el-radio-button
            v-for="item in priceChanges"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="昨日量能" prop="yesterdayVolume">
        <el-radio-group v-model="formData.yesterdayVolume">
          <el-radio-button
            v-for="item in yesterdayVolumes"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="今日量能" prop="todayVolume">
        <el-radio-group v-model="formData.todayVolume">
          <el-radio-button
            v-for="item in todayVolumes"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="量比" prop="volumeRatio">
        <el-radio-group v-model="formData.volumeRatio">
          <el-radio-button
            v-for="item in volumeRatios"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="走势类型" prop="trendType">
        <el-radio-group v-model="formData.trendType">
          <el-radio-button
            v-for="item in trendTypes"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="分时走势" prop="intradayTrend">
        <el-radio-group v-model="formData.intradayTrend">
          <el-radio-button
            v-for="item in intradayTrends"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="价格波动" prop="priceFluctuation">
        <el-radio-group v-model="formData.priceFluctuation">
          <el-radio-button
            v-for="item in priceFluctuations"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="历史价位" prop="historicalPrice">
        <el-radio-group v-model="formData.historicalPrice">
          <el-radio-button
            v-for="item in historicalPrices"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="均线系统" prop="movingAverage">
        <el-radio-group v-model="formData.movingAverage">
          <el-radio-button
            v-for="item in movingAverages"
            :key="item.key"
            :value="item.key"
          >
            {{ item.value }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="持有天数" prop="holdingDays">
        <el-input-number
          v-model="formData.holdingDays"
          :min="0"
          placeholder="请输入持有天数"
        />
      </el-form-item>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="买入日期" prop="buyDate">
            <el-date-picker
              v-model="formData.buyDate"
              type="date"
              placeholder="请选择买入日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卖出日期" prop="sellDate">
            <el-date-picker
              v-model="formData.sellDate"
              type="date"
              placeholder="请选择卖出日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
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
} from '../useStockFormatters.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dialogType: {
    type: String,
    default: 'add'
  },
  stockId: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['update:visible'])

// 使用计算属性双向绑定visible
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emits('update:visible', value)
  }
})

const stockStore = useStockStore()

// 从hooks获取格式化函数
const { kLineTypes } = useKLineTypes()
const { priceChanges } = usePriceChanges()
const { yesterdayVolumes } = useYesterdayVolumes()
const { todayVolumes } = useTodayVolumes()
const { volumeRatios } = useVolumeRatios()
const { trendTypes } = useTrendTypes()
const { intradayTrends } = useIntradayTrends()
const { priceFluctuations } = usePriceFluctuations()
const { historicalPrices } = useHistoricalPrices()
const { movingAverages } = useMovingAverages()

const formRef = ref()

const formData = reactive({
  id: null,
  stockName: '',
  stockCode: '',
  buyPrice: 0,
  sellPrice: 0,
  profitRate: 0,
  kLineType: 1,
  priceChange: 1,
  yesterdayVolume: 1,
  todayVolume: 1,
  volumeRatio: 1,
  trendType: 1,
  intradayTrend: 1,
  priceFluctuation: 1,
  historicalPrice: 1,
  movingAverage: 1,
  holdingDays: 0,
  buyDate: null,
  sellDate: null
})

// 监听dialogVisible变化，重置表单
watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      // 关闭对话框时重置表单
      formRef.value?.resetFields()
    } else if (props.dialogType === 'edit') {
      const stock = stockStore.getStockById(props.stockId)
      if (stock) {
        Object.assign(formData, stock)
      }
    }
  }
)
</script>

<style></style>
