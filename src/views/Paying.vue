<template>
  <top-bar title="在线支付"></top-bar>
  <div class="order-info">
    <span style="color: #666666;margin-bottom: 3vw">订单信息:</span>
    <div class="business-name-and-price" style="width: 100%">
      <div style="width:100%;display: flex;justify-content: space-between">
        <el-link style="color:#02b6fd;font-size: 5vw" @click="showFoodList=!showFoodList">
          {{ businessName }}
          <el-icon>
            <ArrowDown/>
          </el-icon>
        </el-link>
        <span class="price">￥{{ totalPrice }}</span>
      </div>
      <!--      ul会自带padding-left,没必要-->
      <el-collapse-transition>
        <div v-if="showFoodList" style="font-size: 4vw;padding: 2vw 0">
          <span v-for="food in foodList" :key="food.foodId"
                style="width:100%;display: flex;justify-content: left;margin-bottom: 2vw">
            <span style="display: inline-block;white-space: nowrap;width: 40%;overflow: hidden;text-overflow:ellipsis;text-align: left">
              {{ food.foodName }}</span>
            <span style="width:5%"></span>
            <span class="food-count" style="flex: 1;text-align: left">x{{ food.foodCount }}</span>
            <span style="flex: 1"></span>
            <span class="price" style="flex: 1;text-align: right">￥{{ food.foodPrice }}</span>
          </span>
        </div>
      </el-collapse-transition>
    </div>

    <div class="pay-ways">
      <label style="display: flex;align-items: center">
        <img src="../assets/alipay.png"
             style="width: 10vw;margin-right: 4vw" alt="alipay"/>
        <span style="height:100%;text-align: center">支付宝</span>
        <el-radio style="position: absolute;right: 4vw" label="ali" v-model="selectedPayWay">{{ "" }}</el-radio>
      </label>
      <label style="margin-top:3vw;display: flex;align-items: center">
        <img src="../assets/wechat.png"
             style="width: 10vw;margin-right: 4vw"
             alt="wexinpay">
        <span style="text-align: center">微信支付</span>
        <el-radio style="position: absolute;right: 4vw" label="weixin" v-model="selectedPayWay">{{ "" }}</el-radio>
      </label>

    </div>
    <el-button style="width: 90%;height: 12vw;border-radius: 12vw;margin:5vw auto 0" type="success"
    >立即支付</el-button>
  </div>

</template>

<script>
import TopBar from "@/components/TopBar";
import {computed, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import cookie from "js-cookie";
import {ElMessage} from "element-plus";
import Order from "@/api/Order";

export default {
  name: "Paying",
  components: {TopBar},
  setup() {
    const route = useRoute()
    const router = useRouter()
    if (!cookie.get('token')) {
      ElMessage.error({message: "请先登录", showClose: true})
      router.push('/login')
    }
    let orderId = route.query.orderId
    let data = reactive({
      showFoodList: false,
      selectedPayWay: "",
      //不写着占位1000%会报错
      businessName: "",
      totalPrice: 0,
      foodList: [{foodName: "", foodCount: 0, foodPrice: 0}],
    })

    //如果不包一层,setup不会等待,而是直接return 导致出问题
    function getData() {
      Order.getOrderById(orderId).then(
          resp => {
            let order = resp.data.data
            data.businessName = order.businessName
            data.totalPrice = order.totalPrice
            data.foodList = order.orderFoodList
          }
      )
    }

    getData()


    return {
      ...toRefs(data),
      ...toRefs()
    }
  }
}
</script>

<style scoped>
.order-info {
  box-sizing: border-box;
  padding: 3vw 4vw 2vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 5vw;
}


.pay-ways {
  margin-top: 10vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 7vw;
}
</style>
