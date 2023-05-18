<template>
  <header class="business-top-bar">
    <back class="back-icon" @click="backToPrevious"></back>
    <Star class="star-icon"/>
    <Search class="search-icon"/>
  </header>
  <header class="business-background" :style="'background-image:url('+business.cover+')'">
    <div class="business-info">
      <div class="business-info-words">
        <span class="business-name">{{ business.businessName }}</span>
        <span class="business-timeCost">蜂鸟快送 约44分钟</span>
        <span class="business-explain">{{ business.businessExplain }}</span>
        <span class="business-discounts"></span>
        <span v-show="business.discounts&&business.discounts.length!==0" class="discounts small-font">
          <span class="discount" v-for="discount in business.discounts">{{ discount }}</span>
          <span v-show="business.redPacket&&business.redPacket!==''" class="redPacket small-font">
          {{ business.redPacket }}
          </span>
        </span>
      </div>
      <el-image class="business-info-avatar" :src="business.cover">
      </el-image>
    </div>

  </header>
  <div class="main">
    <el-tabs v-model="selectedPane" class="demo-tabs" @tab-click="changeTabPane(id)">
      <el-tab-pane label="点餐" name="first">
        <div class="foods-container">
          <div class="foods-list">
            <food-item v-for="food in foodList" class="food-item" :food="food" @addFood="addFood">

            </food-item>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评价" name="second">
        <el-empty description="不许看"/>
      </el-tab-pane>
      <el-tab-pane label="商家" name="third">
        <el-empty description="不许看"/>
      </el-tab-pane>
    </el-tabs>

  </div>

  <cart :delivery-price="prices.deliveryPrice" :total-origin-price="prices.totalOriginPrice"
        :total-price="prices.totalPrice" :start-price="prices.startPrice"
        :count="selectedFoods.length" @setSettlementData="setSettlementData">

  </cart>
</template>

<script>
import Cart from "@/components/Cart";
import {useRoute, useRouter} from "vue-router";
import {reactive, toRefs} from "vue";
import FoodItem from "@/components/FoodItem";
import Business from "@/api/Business";
import cookie from "js-cookie";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "BusinessInfo",
  components: {FoodItem, Cart},
  setup(props, content) {
    const route = useRoute();
    const router = useRouter();
    if (!cookie.get('token')) {
      ElMessageBox.confirm(
          '这项功能需要登录才能查看,是否立即登录?',
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

    let data = reactive({
      id: route.query.id,
      business: {},
      foodList: [],
      selectedPane: "first",
      selectedFoods: [],
      prices: {
        totalPrice: 0,
        totalOriginPrice: 0,
        deliveryPrice: 0,
        startPrice: 0,
      }
    })
    Business.getBusinessById(data.id).then(
        resp => {
          console.log(resp.data.data)
          data.business = resp.data.data.business
          data.foodList = resp.data.data.foods
          data.business.discounts = JSON.parse(data.business.discounts)
          data.prices.deliveryPrice = data.business.deliveryPrice
          data.prices.startPrice = data.business.startPrice
        }
    )

    function changeTabPane(id) {
      data.selectedPane = id
    }

    function backToPrevious() {
      window.history.go(-1)
    }

    function addFood(foodId, num, price, originPrice) {
      let flag = true
      data.selectedFoods.forEach((food, index) => {
        if (food.foodId === foodId) {
          food.count += num
          flag = false
          if (food.count === 0) {
            data.selectedFoods.splice(index, 1)
          }

        }
      })
      //如果selectedFoods找不到,就在foodList内找到相应id的放入
      if (flag) {
        data.foodList.forEach(
            food => {
              if (food.foodId === foodId) {
                data.selectedFoods.push({...food, count: 1})
              }
            }
        )
      }

      //修改总价
      data.prices.totalPrice += price * num
      //toFixed会把类型变成浮点型,需要转回来
      data.prices.totalPrice = Number(data.prices.totalPrice.toFixed(3))
      data.prices.totalOriginPrice += originPrice * num
      data.prices.totalOriginPrice = Number(data.prices.totalOriginPrice.toFixed(3))


    }


    //切换到订单界面时,cart组件会回调本方法
    function setSettlementData() {
      let business = JSON.stringify({
        businessName: data.business.businessName,
        deliveryPrice: data.business.deliveryPrice,
        businessId: data.business.businessId
      })
      let foodList = JSON.stringify(data.selectedFoods)
      router.push({
        path: '/order',
        query: {
          business,
          foodList
        },
      })

    }

    return {
      ...toRefs(data),
      changeTabPane,
      backToPrevious,
      addFood,
      setSettlementData
    }
  }
}
</script>

<style scoped>

.main {
  margin-top: 10vw;
  box-sizing: border-box;
  width: auto;
  padding: 4vw;
}

.foods-container {
  width: 100%;
}

.business-background {
  box-sizing: border-box;
  padding: 5vw 4vw 0;
  width: 100%;
  height: 40vw;
  display: flex;
  flex-direction: column;

}

.business-background::before {
  /*将背景和⾼斯模糊全部设置在了伪元素内，并让伪元素的z-index=-1,避免遮盖其他元素*/
  filter: brightness(30%);
  height: 100%;
  width: 100%;

  z-index: -1;
}


.business-info {
  box-sizing: border-box;
  padding: 5vw;
  width: 100%;

  filter: none;
  height: 35vw;

  border: 1px white;
  border-radius: 4vw;
  overflow: hidden;

  background: white;

  display: flex;

  position: relative;
  left: 0;
  top: 10vw;
  z-index: 999;

  /*阴影模糊*/
  box-shadow: 0.5vw 2vw 1vw rgba(0, 0, 0, .06);

}

.business-info-words {
  flex: 1;


  display: flex;
  flex-direction: column;
  justify-content: left;
}

.business-name {
  font-size: 5vw;
  font-weight: 600;
  display: flex;
  justify-content: left;
  white-space: nowrap;
}

.business-timeCost {
  margin-top: 3vw;
  color: #666666;
  display: flex;
  font-size: 3.25vw;
}

.business-explain {
  margin-top: 3vw;
  color: #666666;
  display: flex;
  font-size: 3.25vw;
}

.discounts {
  margin-top: 2vw;
  display: flex;
  justify-content: left;
  max-width: 100%;
}

.discount {
  color: #FF4B33;
  margin-right: 1vw;
  border: 1px solid #FF7708;
  border-radius: 2px;
  width: fit-content;
  overflow: hidden;
}

.redPacket {
  color: #AE6C28;
  border: 1px solid rgb(220, 160, 90);
  border-radius: 2px;
  width: fit-content;
  overflow: hidden;
}

.business-info-avatar {
  width: 20vw;
  height: 20vw;
}

.food-item {
  margin-bottom: 5vw;
}

.business-top-bar {
  /*位置*/
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  /*大小及透明度*/
  opacity: 0.5;
  background: white;
  width: 100%;
  height: 10vw;
}

.back-icon {
  height: 6vw;
  position: absolute;
  left: 2vw;
  bottom: 2vw;
  /*color: white;*/
}

.search-icon {
  height: 6vw;
  position: absolute;
  right: 10vw;
  bottom: 2vw;
  /*color: white;*/
}

.star-icon {
  height: 6vw;
  position: absolute;
  right: 2vw;
  bottom: 2vw;
  /*color: white;*/
}
</style>
