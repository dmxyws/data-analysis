import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStockStore = defineStore(
  'stocks',
  () => {
    // 状态管理
    const stocks = ref([])

    // 获取所有股票
    const getAllStocks = () => stocks.value

    // 添加股票
    const addStock = (stockData) => {
      const newStock = {
        id: stocks.length > 0 ? this.stocks[stocks.length - 1].id + 1 : 1,
        ...stockData
      }
      stocks.value.push(newStock)
      return newStock
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
      addStock,
      updateStockById,
      deleteStockById
    }
  },
  { persist: true }
)
