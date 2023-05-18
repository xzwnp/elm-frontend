import request from "@/api/BaseApi";

export default {
    login(phone, code, type) {
        if (type === 'code') {
            return request({
                url: '/user/login/byCode',
                method: 'post',
                data: {
                    phone,
                    code
                }
            })
        } else {
            return request({
                url: 'user/login/byPassword',
                method: 'post',
                data: {
                    phone,
                    password: code
                }
            })
        }

    },
    sendCode(phone) {
        return request({
            url:`/message/getCode/${phone}`,
            method:'get',
        })
    }
}
