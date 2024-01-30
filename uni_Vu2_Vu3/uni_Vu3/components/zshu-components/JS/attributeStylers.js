
/**
 * 根据提供的键映射数组，返回包含所有键的样式对象。
 * @param {Object} item - 包含样式属性的对象。
 * @param {Array} keyMap - 要包含的键的数组。
 * @returns {Object} - 包含所有非空非undefined键值对的样式对象。
 */

export const attributeStylers = (item, keyMap = []) => {
    // 原始数组
    const originalArray = ['flex', 'backgroundColor', 'filter', 'color'];

    // 创建一个新数组，将原始数组和键映射数组合并，同时去除重复的键。
    const mergedKeys = Array.from(new Set([...originalArray, ...keyMap]));

    // 初始化结果对象。
    const result = {};

    // 遍历合并后的键数组，提取属性值并添加到结果对象中。
    for (const key of mergedKeys) {
        const value = item[key];
        if (value !== null && value !== undefined) {
            result[key] = value;
        }
    }

    return result;
};
