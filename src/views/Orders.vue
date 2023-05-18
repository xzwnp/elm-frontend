<template>
  <top-bar title=""></top-bar>
  <el-tabs v-model="activeName" @tab-click="changeOrderType" class="tabs-container animated slideInDown">
    <el-tab-pane class="tab" label="全部" name="-1"></el-tab-pane>
    <el-tab-pane class="tab" label="未支付" name="0"></el-tab-pane>
    <el-tab-pane class="tab" label="已支付" name="1"></el-tab-pane>
    <el-tab-pane class="tab" label="退款" name="3"></el-tab-pane>
  </el-tabs>
  <div v-for="order in orderList" style="padding: 4vw">
    <div class="business-name-and-price" style="width: 100%;margin-bottom: 3vw">
      <div style="width:100%;display: flex;justify-content: space-between;flex-wrap: nowrap">
        <el-link style="color:#02b6fd;font-size: 5vw;white-space: nowrap"
                 @click="order.showFoodList=!order.showFoodList"
        >
          {{ order.businessName }}
          <el-icon>
            <ArrowDown/>
          </el-icon>
        </el-link>
        <span class="price">￥{{ order.totalPrice }}</span>
      </div>
      <!--      ul会自带padding-left,没必要-->
      <el-collapse-transition>
        <div v-show="order.showFoodList" style="font-size: 4vw;padding: 2vw 0;z-index: 999">
          <span style="display: block;text-align: start">创建时间:{{ order.createTime }}</span>
          <span v-for="food in order.orderFoodList" :key="food.foodId"
                style="width:100%;display: flex;justify-content: left;margin-bottom: 2vw">
            <span
                style="display: inline-block;white-space: nowrap;width: 40%;overflow: hidden;text-overflow:ellipsis;text-align: left">
              {{ food.foodName }}</span>
            <span style="width:5%"></span>
            <span class="food-count" style="flex: 1;text-align: left">x{{ food.foodCount }}</span>
            <span style="flex: 1"></span>
            <span class="price" style="flex: 1;text-align: right">￥{{ food.foodPrice }}</span>
          </span>
        </div>
      </el-collapse-transition>
    </div>
  </div>
  <div style="margin-bottom: 14vw"></div>
  <tab-bar selected="orders"></tab-bar>
</template>

<script>
import TopBar from "@/components/TopBar";
import {reactive, toRefs} from "vue";
import Order from "@/api/Order";
import TabBar from "@/components/TabBar";

export default {
  name: "Orders",
  components: {TabBar, TopBar},
  setup() {

    let data = reactive({
      activeName: "-1",
      //不写着占位1000%会报错
      orderList: [{
        foodId: '123',
        foodName: "叫什么",
        foodCount: 1
      }],
    })
    getData(-1)

    function changeOrderType(tab, event) {
      data.activeName = tab.props.name
      getData(tab.props.name)
    }

    function getData(type) {
      Order.getHistoryOrder(type).then(resp => {
        console.log(resp.data.data)
        data.orderList = resp.data.data
        data.orderList.forEach(item => {
          item.showFoodList = false
        })
      })


    }

    return {
      ...toRefs(data),
      changeOrderType
    }
  }
}
</script>

<style scoped>
.tabs-container {
  width: 100%;
  box-sizing: border-box;
  padding: 3vw 4vw 3vw;
}

.tabs-container .tab {
  width: 20%;
}


</style>
