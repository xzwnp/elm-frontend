<template>
  <header>
    <back class="back-icon" @click="backToPrevious"></back>
    确认订单
  </header>
  <div class="wrapper">
    <el-tabs
        v-model="activeTab"
        class="send-tabs"
        @tab-click="handleClick"
        type="border-card"
        stretch
        style="box-sizing: border-box"
        v-loading="loading"
    >
      <el-tab-pane label="外卖配送" name="first" width="40vw">
        <div class="takeout-page">
          <span style="font-size: 6vw"><el-tag>学校</el-tag>云南大学呈贡校区(南1门)</span>
          <div class="personal-info">
            <span style="margin-right: 5vw">张三(先生)</span>
            <span>17777770086</span>
          </div>
          <div class="send-type">
            <span style="">立即送出</span>
            <span style="color: #02b6fd">大约25:61送到</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="到店自取" name="second">
        <el-empty description="不许看"/>
      </el-tab-pane>
    </el-tabs>

    <div class="cart-info">
      <span class="business-title">{{ business.businessName }}</span>
      <div class="selected-foods">
        <div class="food-item" v-for="food in foodList">
          <el-image class="food-image" :src="food.cover" fit="fill"></el-image>
          <div class="food-title-and-count">
            <span class="food-title">{{ food.foodName }}</span>
            <span class="food-count" style="color: #999999;font-size: 3vw">x {{ food.count }}</span>
          </div>
          <div class="food-price">
            <span class="now-price"><span style="font-size: 3.5vw">￥</span>{{ food.foodPrice }}</span>
            <span class="origin-price small-font">￥{{ food.originPrice }}</span>
          </div>
        </div>

      </div>
      <div class="wrapper-fee fee"><span>包装费</span><span>￥2</span></div>
      <div class="delivery-fee fee"><span>配送费</span><span>￥{{ business.deliveryPrice }}</span></div>
      <div class="red-packet fee">
        <span>
          <img src="https://gw.alicdn.com/tfs/TB1S5x3EVP7gK0jSZFjXXc5aXXa-48-48.png"
               style="width: 4vw; height: 4vw;object-fit:contain;object-position:center center;"
               draggable="auto">
        红包
        </span>

        <button class="red-packet-btn">未选红包,最高6元可用 ></button>
      </div>
      <el-divider></el-divider>
      <div class="discount-info fee">
        <span>优惠说明</span>
        <span>已优惠￥{{ totalDiscount }}</span>
        <span>小计￥{{ totalPrice }}</span>
      </div>
    </div>


  </div>
  <footer>
    <div class="footer-prices">
      <span>
        <span>合计</span>
        <span style="color: #FF5128">￥</span>
        <span style="color: #FF5128;font-size: 6vw;font-weight: bold;">{{ totalPrice }}</span>
      </span>

    </div>
    <el-button class="settlement-btn" type="primary" @click="submitOrder">提交订单
    </el-button>
  </footer>
</template>

<script>
import {computed, reactive, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import Order from "@/api/Order";
import {ElMessage} from "element-plus";
import cookie from "js-cookie";

export default {
  name: "Order",
  setup() {
    const route = useRoute()
    const router = useRouter()
    //数据处理
    if (!route.query || route.query === {}) {
      this.$router.push('/')
    }

    let business = JSON.parse(route.query.business)
    let foodList = JSON.parse(route.query.foodList)
    let totalPrice = computed(() => {
      let total = 0
      foodList.forEach(food => {
        total += food.foodPrice * food.count
      })
      return total.toFixed(2)
    })
    let totalDiscount = computed(() => {
      let total = 0
      foodList.forEach(food => {
        total += (food.originPrice - food.foodPrice) * food.count
      })
      return total.toFixed(2)
    })


    let data = reactive({
      activeTab: 'first',
      business,
      foodList,
      totalPrice,
      totalDiscount,
      loading: false
    })

    function backToPrevious() {
      window.history.go(-1)
    }

    function submitOrder() {
      data.loading = true
      Order.createOrder({
        ...business,
        foodList,
        totalPrice: data.totalPrice
      }).then(resp => {
        console.log(resp.data.data)
        let orderId = resp.data.data
        ElMessage.success("订单创建成功!")
        router.push({
          path: "/paying",
          query: {
            orderId
          }
        })
      }).catch(err => {
        ElMessage.error("创建订单失败!")
        console.log(err)
      }).finally(() => {
        data.loading = false
      })
    }

    return {
      ...toRefs(data),
      backToPrevious,
      submitOrder
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 12vw;
  box-sizing: border-box;
  width: 100%;
  padding: 3vw;
  background: #f4f4f5;
  height: 100vh;
}

header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  height: 12vw;
  width: 100%;
  background: #02b6fd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 6vw;
  font-weight: 600;
}

.back-icon {
  height: 8vw;
  position: fixed;
  left: 2vw;
  top: 2vw;
  color: white;
}

.send-tabs {
  width: 100%;
  border-radius: 3vw;
  overflow: hidden;
}

.takeout-page {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.personal-info {
  margin-top: 4vw;
  color: #999;
}

.send-type {
  margin-top: 6vw;
  display: flex;
  justify-content: space-between;
}

.cart-info {
  background: white;
  margin-top: 4vw;
  box-sizing: border-box;
  padding: 3vw 2vw;

  border: 2px #f4f4f5 solid;
  border-radius: 3vw;
  overflow: hidden;

  display: flex;
  flex-direction: column;

}

.business-title {
  color: #999999;
  text-align: left;
  font-size: 4.5vw;
}

.food-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
}

.food-image {
  width: 15vw;
  height: 15vw;
}


.food-title {
  flex: 0.7 1 auto;
  text-align: left;
  font-size: 4vw;
  line-height: 5vw;
  max-width: 50vw;
  word-wrap: break-word;
  word-break: normal;
}

.food-price {
  width: 10vw;
  margin-top: 1.5vw;
  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/
  align-items: flex-end;
  height: 15vw;
}

.now-price {
  display: flex;
  justify-content: left;
  align-items: center;
  color: red;
  font-size: 5vw;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.origin-price {
  margin-left: 1.5vw;
}

.fee {
  padding-top: 2vw;
  display: flex;
  justify-content: space-between;
}

.red-packet-btn {
  background-image: linear-gradient(-180deg, rgb(255, 122, 82) 0%, rgb(255, 95, 66) 99%);
  border: 0;
  border-radius: 2vw;
  color: white;
  font-size: 2.5vw;
}

.selected-foods {

  box-sizing: border-box;
  width: 100%;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.food-title-and-count {
  height: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.settlement-btn {
  height: 80%;
  width: 35vw;
  /*position: absolute;*/
  /*bottom: 1vw;*/
  /*right: 2vw;*/
  background-color: #02b6fd;
  font-size: 4.5vw;
  font-weight: bolder;
  border-radius: 6vw;
  overflow: hidden;
}

footer {
  /*固定位置,置顶*/
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;

  /**/
  box-sizing: border-box;
  padding-left: 4vw;
  padding-right: 2vw;

  /*设置大小*/
  width: 100%;
  height: 14vw;
  /*hsla() 函数使用色相、饱和度、亮度、透明度来定义颜色。*/
  background: hsla(0, 0%, 100%, .95);

  /*  弹性布局*/
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: right;

}

.footer-prices {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 4vw;
}

footer .total-price {
  color: red;
}
</style>
