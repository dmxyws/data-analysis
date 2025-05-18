<template>
  <el-dialog title="数据分析" v-model="dialogVisible" width="90%">
    <div>
      <p>{{ combinationsRank }}</p>
      <p>{{ indicatorsRank }}</p>
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
