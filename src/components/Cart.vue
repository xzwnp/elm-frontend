<template>
  <div style="margin-bottom: 14vw"></div>
  <div class="cart-container">
    <div class="circle-outer">
      <div :class="count<=0?'circle-inner-disabled':'circle-inner'">
        <ShoppingCart class="cart-icon"/>
      </div>
    </div>
    <div class="cart-price-area">
      <div>
        <span class="total-price-unit">￥</span>
        <span class="total-price">{{ totalPrice }}</span>
        <span class="total-origin-price" v-if="totalOriginPirce!==0&&totalOriginPirce!==totalPrice">
          ￥{{totalOriginPrice }}</span>
      </div>
      <span class="small-font">预估加配送费￥{{ deliveryPrice }}</span>
    </div>
    <el-button class="settlement-btn" type="primary" @click="toSettleAccounts"
               :disabled="totalPrice < startPrice">{{totalPrice >= startPrice?'去结算':'差'+(startPrice-totalPrice)+'元起送'}}
    </el-button>

  </div>
</template>

<script>


import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

export default {
  name: "Cart",
  props: ['totalPrice', 'totalOriginPrice', 'deliveryPrice', 'startPrice', 'count'],
  emits:['setSettlementData'],
  setup(props,context) {

    const router = useRouter();

    function toSettleAccounts() {

      console.log(props.totalPrice, props.startPrice)
      if (props.totalPrice < props.startPrice) {
        ElMessage("还没到起送价格!")
        return
      }
      context.emit('setSettlementData')
    }

    return {
      toSettleAccounts
    }


  }
}
</script>

<style scoped>
.cart-container {
  /*固定位置,置顶*/
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;

  /*设置大小*/
  width: 100%;
  height: 14vw;
  /*hsla() 函数使用色相、饱和度、亮度、透明度来定义颜色。*/
  background: hsla(0, 0%, 100%, .95);

  /*  弹性布局*/
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;

}

.circle-outer {
  width: 20vw;
  height: 20vw;
  border: 2px red;
  border-radius: 10vw;
  background: hsla(0, 0%, 100%, .95);

  position: absolute;
  bottom: 1vw;
  left: 3vw;
}

.circle-inner {
  width: 16vw;
  height: 16vw;
  border: 2px red;
  border-radius: 8vw;
  background: #02b6fd;

  position: absolute;
  bottom: 2vw;
  left: 2vw;
}

.circle-inner-disabled {
  width: 16vw;
  height: 16vw;
  border: 2px red;
  border-radius: 8vw;
  background: gray;

  position: absolute;
  bottom: 2vw;
  left: 2vw;
}

.cart-icon {
  width: 10vw;
  height: 10vw;
  color: white;
  /*font-size: 5vw;*/
  /*font-weight: 900;*/

  position: absolute;
  bottom: 3vw;
  left: 2.5vw;
}

.cart-price-area {
  box-sizing: border-box;
  padding-top: 2vw;
  padding-bottom: 1vw;
  height: 100%;

  position: absolute;
  left: 25vw;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.total-price {
  font-size: 6vw;
  font-weight: bolder;
  color: black;
}

.total-price-unit {
  color: black;
  font-weight: bolder;
}

.total-origin-price {
  color: #666666;
  margin-left: 1vw;
  text-decoration: line-through;
  text-underline: #666666;

}

.settlement-btn {
  height: 80%;
  width: 35vw;
  position: absolute;
  bottom: 1vw;
  right: 2vw;
  background-color: #02b6fd;
  font-size: 4.5vw;
  font-weight: bolder;
  border-radius: 6vw;
  overflow: hidden;
}

.settlement-btn:disabled {
  height: 80%;
  width: 35vw;
  position: absolute;
  bottom: 1vw;
  right: 2vw;
  background-color: gray;
  font-size: 4.5vw;
  font-weight: bolder;
  border-radius: 6vw;
  overflow: hidden;
}
</style>
