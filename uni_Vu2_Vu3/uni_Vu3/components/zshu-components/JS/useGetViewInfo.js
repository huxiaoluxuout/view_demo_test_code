export const getViewInfo = (selector, callback, that) => {
    uni.createSelectorQuery()
        .in(that)
        .select(selector)
        .boundingClientRect((rect) => {
            callback(rect)
        })
        .exec()
}
