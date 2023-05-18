import request from "@/api/BaseApi";
export default {
    getBusinessList(type,current,size) {
        return request({
            url:`/business/current/${current}/size/${size}?type=${type}`,
            method:'get',
        })
    },
    getBusinessById(id){
        return request({
            url:`/business/${id}`,
            method:'get'
        })
    }

}


