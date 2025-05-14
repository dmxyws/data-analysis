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
