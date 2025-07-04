import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStockStore = defineStore(
  'stocks',
  () => {
    // 状态管理
    const stocks = ref([])

    // 获取所有股票
    const getAllStocks = () => stocks.value

    // 根据ID获取单支股票
    const getStockById = (id) => {
      return stocks.value.find((stock) => stock.id === id) || null
    }

    // 添加单支股票
    const addStock = (stockData) => {
      const newId =
        stocks.value.length > 0
          ? stocks.value[stocks.value.length - 1].id + 1
          : 1

      const newStock = {
        ...stockData,
        id: newId
      }

      stocks.value.push(newStock)
      return newStock
    }

    // 批量添加股票
    const addStocks = (stockList) => {
      if (!Array.isArray(stockList) || stockList.length === 0) {
        return []
      }

      // 计算新的起始ID
      const lastId =
        stocks.value.length > 0 ? stocks.value[stocks.value.length - 1].id : 0

      // 为每支股票分配ID并添加
      const newStocks = stockList.map((stock, index) => {
        return {
          ...stock,
          id: lastId + index + 1
        }
      })

      stocks.value = [...stocks.value, ...newStocks]
      return newStocks
    }

    // 根据ID修改股票
    const updateStockById = (id, updatedData) => {
      const index = stocks.value.findIndex((stock) => stock.id === id)
      if (index === -1) return null

      const updatedStock = {
        ...stocks.value[index],
        ...updatedData
      }

      stocks.value.splice(index, 1, updatedStock)
      return updatedStock
    }

    // 删除股票
    const deleteStockById = (id) => {
      const index = stocks.value.findIndex((stock) => stock.id === id)
      if (index === -1) return false

      stocks.value.splice(index, 1)
      return true
    }

    return {
      stocks,
      getAllStocks,
      getStockById,
      addStock,
      addStocks,
      updateStockById,
      deleteStockById
    }
  },
  { persist: true }
)
