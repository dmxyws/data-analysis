// 导入所有hook
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

// 统一转换函数：将hook数据转为condition格式
const convertHookToCondition = (options, conditionId, conditionName) => {
  return {
    id: conditionId, // 唯一ID（建议与业务语义一致）
    name: conditionName, // 条件名称
    options: options.map((option) => ({
      ...option,
      conditionId: conditionId // 为每个选项添加所属条件ID
    }))
  }
}

// 生成完整的conditions数组（包含所有10个数据源）
export const buildAllConditions = () => [
  // 1. K线类型
  convertHookToCondition(useKLineTypes().kLineTypes, 'kLineType', 'K线类型'),

  // 2. 价格变化
  convertHookToCondition(
    usePriceChanges().priceChanges,
    'priceChange',
    '价格变化'
  ),

  // 3. 昨日成交量
  convertHookToCondition(
    useYesterdayVolumes().yesterdayVolumes,
    'yesterdayVolume',
    '昨日成交量'
  ),

  // 4. 今日成交量
  convertHookToCondition(
    useTodayVolumes().todayVolumes,
    'todayVolume',
    '今日成交量'
  ),

  // 5. 量比
  convertHookToCondition(useVolumeRatios().volumeRatios, 'volumeRatio', '量比'),

  // 6. 趋势类型
  convertHookToCondition(useTrendTypes().trendTypes, 'trendType', '趋势类型'),

  // 7. 日内趋势
  convertHookToCondition(
    useIntradayTrends().intradayTrends,
    'intradayTrend',
    '日内趋势'
  ),

  // 8. 价格波动
  convertHookToCondition(
    usePriceFluctuations().priceFluctuations,
    'priceFluctuation',
    '价格波动'
  ),

  // 9. 历史价格位置
  convertHookToCondition(
    useHistoricalPrices().historicalPrices,
    'historicalPrice',
    '历史价格位置'
  ),

  // 10. 均线状态
  convertHookToCondition(
    useMovingAverages().movingAverages,
    'movingAverage',
    '均线状态'
  )
]
