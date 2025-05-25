// useStockFormatters.js
export const useKLineTypes = () => {
  const kLineTypes = [
    { key: 1, value: '长上影线' },
    { key: 2, value: '先跌后涨阳线' },
    { key: 3, value: '先跌后涨十字星' },
    { key: 4, value: '大阳线' },
    { key: 5, value: '中阳线' },
    { key: 6, value: '小阳线' },
    { key: 7, value: '梭子线' }
  ]

  // 从 key 到 value 的映射
  const keyToValueMap = new Map(
    kLineTypes.map((item) => [item.key, item.value])
  )

  // 从 value 到 key 的映射
  const valueToKeyMap = new Map(
    kLineTypes.map((item) => [item.value, item.key])
  )

  const formatKLineType = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseKLineType = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { kLineTypes, formatKLineType, parseKLineType }
}

export const usePriceChanges = () => {
  const priceChanges = [
    { key: 1, value: '小于3%' },
    { key: 2, value: '3%-7%' },
    { key: 3, value: '大于7%' }
  ]

  const keyToValueMap = new Map(
    priceChanges.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    priceChanges.map((item) => [item.value, item.key])
  )

  const formatPriceChange = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parsePriceChange = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { priceChanges, formatPriceChange, parsePriceChange }
}

export const useYesterdayVolumes = () => {
  const yesterdayVolumes = [
    { key: 1, value: '均量' },
    { key: 2, value: '地量' }
  ]

  const keyToValueMap = new Map(
    yesterdayVolumes.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    yesterdayVolumes.map((item) => [item.value, item.key])
  )

  const formatYesterdayVolume = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseYesterdayVolume = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { yesterdayVolumes, formatYesterdayVolume, parseYesterdayVolume }
}

export const useTodayVolumes = () => {
  const todayVolumes = [
    { key: 1, value: '2倍' },
    { key: 2, value: '3倍' },
    { key: 3, value: '3倍以上' }
  ]

  const keyToValueMap = new Map(
    todayVolumes.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    todayVolumes.map((item) => [item.value, item.key])
  )

  const formatTodayVolume = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseTodayVolume = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { todayVolumes, formatTodayVolume, parseTodayVolume }
}

export const useVolumeRatios = () => {
  const volumeRatios = [
    { key: 1, value: '小于1' },
    { key: 2, value: '等于1' },
    { key: 3, value: '大于1' },
    { key: 4, value: '大于2' }
  ]

  const keyToValueMap = new Map(
    volumeRatios.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    volumeRatios.map((item) => [item.value, item.key])
  )

  const formatVolumeRatio = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseVolumeRatio = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { volumeRatios, formatVolumeRatio, parseVolumeRatio }
}

export const useTrendTypes = () => {
  const trendTypes = [
    { key: 1, value: '下跌趋势末' },
    { key: 2, value: '超跌黄金坑' },
    { key: 3, value: '中继形态' }
  ]

  const keyToValueMap = new Map(
    trendTypes.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    trendTypes.map((item) => [item.value, item.key])
  )

  const formatTrendType = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseTrendType = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { trendTypes, formatTrendType, parseTrendType }
}

export const useIntradayTrends = () => {
  const intradayTrends = [
    { key: 1, value: '温和放量' },
    { key: 2, value: '连续脉冲' },
    { key: 3, value: '脉冲回调走平' },
    { key: 4, value: '脉冲回调走弱' }
  ]

  const keyToValueMap = new Map(
    intradayTrends.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    intradayTrends.map((item) => [item.value, item.key])
  )

  const formatIntradayTrend = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseIntradayTrend = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { intradayTrends, formatIntradayTrend, parseIntradayTrend }
}

export const usePriceFluctuations = () => {
  const priceFluctuations = [
    { key: 1, value: '横盘整理' },
    { key: 2, value: '温和震荡' },
    { key: 3, value: '缓慢上涨' },
    { key: 4, value: '剧烈震荡' }
  ]

  const keyToValueMap = new Map(
    priceFluctuations.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    priceFluctuations.map((item) => [item.value, item.key])
  )

  const formatPriceFluctuation = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parsePriceFluctuation = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { priceFluctuations, formatPriceFluctuation, parsePriceFluctuation }
}

export const useHistoricalPrices = () => {
  const historicalPrices = [
    { key: 1, value: '低位' },
    { key: 2, value: '中位' },
    { key: 3, value: '高位' }
  ]

  const keyToValueMap = new Map(
    historicalPrices.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    historicalPrices.map((item) => [item.value, item.key])
  )

  const formatHistoricalPrice = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseHistoricalPrice = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { historicalPrices, formatHistoricalPrice, parseHistoricalPrice }
}

export const useMovingAverages = () => {
  const movingAverages = [
    { key: 1, value: '上破55日均线' },
    { key: 2, value: '回踩55日均线' },
    { key: 3, value: '55日均线之上' },
    { key: 4, value: '55日均线之下' }
  ]

  const keyToValueMap = new Map(
    movingAverages.map((item) => [item.key, item.value])
  )
  const valueToKeyMap = new Map(
    movingAverages.map((item) => [item.value, item.key])
  )

  const formatMovingAverage = (key) => {
    return keyToValueMap.get(key) || '-'
  }

  const parseMovingAverage = (value) => {
    return valueToKeyMap.get(value) || null
  }

  return { movingAverages, formatMovingAverage, parseMovingAverage }
}
