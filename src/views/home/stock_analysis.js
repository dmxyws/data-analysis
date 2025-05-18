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

/**
 * 分析股票指标组合频率
 * @param {Array} stocks - 股票数据数组
 * @param {number} [topN=5] - 返回的排行数量
 * @returns {Array} 最常见的指标组合及其出现次数
 */
export const analyzeIndicatorCombinations = (stocks, topN = 5) => {
  // 获取所有格式化函数
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

  // 过滤出收益率为正的股票
  const positiveReturnStocks = stocks.filter((stock) => stock.profitRate > 0)

  // 用于记录每种指标组合出现的次数
  const combinationCounts = new Map()

  // 遍历每只正收益股票，统计指标组合频率
  positiveReturnStocks.forEach((stock) => {
    // 构建指标组合对象
    const combination = {
      kLineType: formatKLineType(stock.kLineType),
      priceChange: formatPriceChange(stock.priceChange),
      yesterdayVolume: formatYesterdayVolume(stock.yesterdayVolume),
      todayVolume: formatTodayVolume(stock.todayVolume),
      volumeRatio: formatVolumeRatio(stock.volumeRatio),
      trendType: formatTrendType(stock.trendType),
      intradayTrend: formatIntradayTrend(stock.intradayTrend),
      priceFluctuation: formatPriceFluctuation(stock.priceFluctuation),
      historicalPrice: formatHistoricalPrice(stock.historicalPrice),
      movingAverage: formatMovingAverage(stock.movingAverage)
    }

    // 将指标组合转换为字符串作为Map的键
    const combinationKey = JSON.stringify(combination)

    // 更新组合计数
    combinationCounts.set(
      combinationKey,
      (combinationCounts.get(combinationKey) || 0) + 1
    )
  })

  // 将Map转换为数组并按出现次数排序
  const sortedCombinations = Array.from(combinationCounts.entries())
    .sort((a, b) => b[1] - a[1]) // 降序排列
    .slice(0, topN) // 取前topN个
    .map(([key, count]) => ({
      combination: JSON.parse(key),
      count,
      ratio: ((count / positiveReturnStocks.length) * 100).toFixed(2) + '%'
    }))

  return sortedCombinations
}

/**
 * 分析单个指标类型的出现频率
 * @param {Array} stocks - 股票数据数组
 * @param {string} indicatorName - 指标名称
 * @param {Function} formatter - 指标格式化函数
 * @param {number} [topN=10] - 返回的排行数量
 * @returns {Array} 最常见的指标类型及其出现次数
 */
export const analyzeSingleIndicator = (
  stocks,
  indicatorName,
  formatter,
  topN = 10
) => {
  // 过滤出收益率为正的股票
  const positiveReturnStocks = stocks.filter((stock) => stock.profitRate > 0)

  // 用于记录每种指标类型出现的次数
  const typeCounts = new Map()

  // 遍历每只正收益股票，统计指标类型频率
  positiveReturnStocks.forEach((stock) => {
    const typeValue = formatter(stock[indicatorName])

    // 更新类型计数
    typeCounts.set(typeValue, (typeCounts.get(typeValue) || 0) + 1)
  })

  // 将Map转换为数组并按出现次数排序
  const sortedTypes = Array.from(typeCounts.entries())
    .sort((a, b) => b[1] - a[1]) // 降序排列
    .slice(0, topN) // 取前topN个
    .map(([type, count]) => ({
      type,
      count,
      ratio: ((count / positiveReturnStocks.length) * 100).toFixed(2) + '%'
    }))

  return sortedTypes
}

/**
 * 分析所有指标类型的出现频率
 * @param {Array} stocks - 股票数据数组
 * @param {number} [topN=10] - 返回的排行数量
 * @returns {Object} 包含所有指标排行结果的对象
 */
export const analyzeAllIndicators = (stocks, topN = 10) => {
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

  return {
    kLineType: analyzeSingleIndicator(
      stocks,
      'kLineType',
      formatKLineType,
      topN
    ),
    priceChange: analyzeSingleIndicator(
      stocks,
      'priceChange',
      formatPriceChange,
      topN
    ),
    yesterdayVolume: analyzeSingleIndicator(
      stocks,
      'yesterdayVolume',
      formatYesterdayVolume,
      topN
    ),
    todayVolume: analyzeSingleIndicator(
      stocks,
      'todayVolume',
      formatTodayVolume,
      topN
    ),
    volumeRatio: analyzeSingleIndicator(
      stocks,
      'volumeRatio',
      formatVolumeRatio,
      topN
    ),
    trendType: analyzeSingleIndicator(
      stocks,
      'trendType',
      formatTrendType,
      topN
    ),
    intradayTrend: analyzeSingleIndicator(
      stocks,
      'intradayTrend',
      formatIntradayTrend,
      topN
    ),
    priceFluctuation: analyzeSingleIndicator(
      stocks,
      'priceFluctuation',
      formatPriceFluctuation,
      topN
    ),
    historicalPrice: analyzeSingleIndicator(
      stocks,
      'historicalPrice',
      formatHistoricalPrice,
      topN
    ),
    movingAverage: analyzeSingleIndicator(
      stocks,
      'movingAverage',
      formatMovingAverage,
      topN
    )
  }
}
