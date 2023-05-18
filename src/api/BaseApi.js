import axios from 'axios'
import cookie from 'js-cookie'
import {ElMessage, ElMessageBox} from 'element-plus'
// 创建axios实例,配置请求的url,同时配置request和response的拦截器
console.log(process.env)
const service = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL
    , // api的base_url
    timeout: 15000 // 请求超时时间
})

//请求拦截器,为每次请求加上token
// http request 拦截器
service.interceptors.request.use(
    config => {
        //判断token是否存在,如果存在,就随着请求头一起发送
        if (cookie.get('token')) {
            config.headers['Authorization'] = cookie.get('token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    })
// http response 拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code === 20000) {
            return response;
        }
        //开始处理错误信息

        //表示登录状态过期,需要跳转回登录界面
        if (response.data.code === 28003 || response.data.code === 28004) {
            console.log("登录过期了")
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            showLogin()
        } else {
            let message = response.data ? response.data.message : "服务异常"
            ElMessage({
                message: message,
                type: 'error',
                duration: 3 * 1000
            })
            //打印错误信息
        }
    },
    error => {
        //网络超时异常处理
        console.log("哪有错误了? ", error)
        if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('"timeout')) {
            ElMessage({
                message: '请求超时,服务繁忙',
                type: 'error',
                duration: 3 * 1000
            })
            return Promise.reject(error.response)   // 返回接口返回的错误信息
        }
    });

export default service


function showLogin() {
    ElMessageBox.confirm(
        '您还未登录,是否立即登录?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '回首页',
            type: 'warning',
        }
    ).then(() => {
        window.location.href = "/login"
    })
        .catch(() => {
            window.location.href = "/"
        })
}
