<template>
  <el-dialog title="数据分析" v-model="dialogVisible" width="90%">
    <div class="kline-data-container">
      <el-table
        :data="combinationsRank"
        stripe
        border
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column type="index" label="排序" width="60">
        </el-table-column>
        <el-table-column
          prop="combination.kLineType"
          label="K线类型"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="combination.priceChange"
          label="价格变化"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="combination.yesterdayVolume"
          label="昨日成交量"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="combination.todayVolume"
          label="今日成交量"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="combination.volumeRatio"
          label="量比"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="combination.trendType"
          label="趋势类型"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="combination.intradayTrend"
          label="日内趋势"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="combination.priceFluctuation"
          label="价格波动"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="combination.historicalPrice"
          label="历史价格位置"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="combination.movingAverage"
          label="均线情况"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="count"
          label="出现次数"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="ratio"
          label="占比"
          min-width="80"
        ></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  analyzeIndicatorCombinations,
  analyzeAllIndicators
} from '../stock_analysis.js'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  dataSource: {
    type: Array,
    default: () => []
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

const combinationsRank = ref([])
const indicatorsRank = ref([])
const handleAnalysis = () => {
  combinationsRank.value = analyzeIndicatorCombinations(props.dataSource, 3) // 获取Top 3组合
  indicatorsRank.value = analyzeAllIndicators(props.dataSource, 5) // 获取各指标Top 5类型
  console.log('最常见的3种指标组合:', combinationsRank) // 在控制台输出最常见的3种指标组合
  console.log('各指标Top 5类型:', indicatorsRank) // 在控制台输出各指标Top 5类型
}

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      handleAnalysis() // 在对话框打开时执行分析
    }
  }
)
</script>

<style scoped>
.kline-data-container {
  padding: 20px;
}
</style>
