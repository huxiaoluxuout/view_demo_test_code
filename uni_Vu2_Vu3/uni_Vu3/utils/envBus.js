
export const $DataInfo = {
    setDataInfo(key, data) {
        this[key] = data
    },
    getDataInfo(key) {
        return {
            data: this[key]
        }
    }

}

