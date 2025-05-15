/**
 * 根据查询表单字段过滤数组
 * @param {Array} data - 要过滤的数组
 * @param {Object} formData - 查询表单数据
 * @returns {Array} 过滤后的数组
 */
export function filterArrayByForm(data, formData) {
  // 检查输入参数
  if (!Array.isArray(data)) {
    throw new Error('第一个参数必须是数组')
  }

  if (typeof formData !== 'object' || formData === null) {
    throw new Error('第二个参数必须是对象')
  }

  // 提取有值的过滤条件
  const filterConditions = {}
  for (const [key, value] of Object.entries(formData)) {
    if (value !== null) {
      filterConditions[key] = value
    }
  }

  // 如果没有有效的过滤条件，直接返回原始数据
  if (Object.keys(filterConditions).length === 0) {
    return [...data]
  }

  // 使用过滤条件过滤数组
  return data.filter((item) => {
    return Object.entries(filterConditions).every(([field, value]) => {
      // 如果数组项中不存在该字段，返回 false
      if (!item.hasOwnProperty(field)) {
        return false
      }

      // 对于数组值，检查是否包含查询值
      if (Array.isArray(item[field])) {
        return item[field].includes(value)
      }

      // 对于字符串值，执行不区分大小写的包含检查
      if (typeof item[field] === 'string' && typeof value === 'string') {
        return item[field].toLowerCase().includes(value.toLowerCase())
      }

      // 对于其他类型，执行严格相等检查
      return item[field] === value
    })
  })
}

/**
 * 在浏览器环境中将JavaScript数组导出为JSON文件
 *
 * @param {Array} dataArray - 要导出的数组数据
 * @param {string} [fileName="data.json"] - 导出的文件名
 * @param {number} [indent=2] - JSON缩进空格数
 *
 * @throws {TypeError} - 当dataArray不是数组时抛出
 */
export function exportArrayToJson(
  dataArray,
  fileName = 'data.json',
  indent = 2
) {
  // 类型检查
  if (!Array.isArray(dataArray)) {
    throw new TypeError('dataArray必须是一个数组')
  }

  // 转换数组为JSON字符串
  const jsonString = JSON.stringify(dataArray, null, indent)

  // 创建Blob对象
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  // 创建下载链接
  const a = document.createElement('a')
  a.href = url
  a.download = fileName

  // 执行下载
  document.body.appendChild(a)
  a.click()

  // 清理资源
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 0)
}
