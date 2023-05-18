import request from "@/api/BaseApi";

export default {
    createOrder(orderQuery) {
        return request({
            url: '/order/generateOrder',
            method: 'post',
            data: orderQuery
        })
    },
    getOrderById(id) {
        return request({
            url: `/order/${id}`,
            method: 'get',
        })
    },
    getHistoryOrder(type) {
        return request({
            url: `/order/byType?type=${type}`,
            method: 'get',
        })
    }
}
