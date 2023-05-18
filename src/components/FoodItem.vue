<template>
  <div class="food-container">
    <el-image class="food-image" :src="food.cover" fit="fill"></el-image>
    <div class="food-main small-font">
      <span class="food-title">{{ food.foodName }}</span>
      <span class="food-description">{{ food.foodExplain }}</span>
      <span v-if="food.foodPrice<food.originPrice" class="food-discount">{{ food.discount }}</span>

      <span class="food-price">
        <span class="now-price"><span style="font-size: 3.5vw">￥</span>{{ food.foodPrice }}</span>
        <span v-if="food.foodPrice<food.originPrice" class="origin-price small-font">￥{{ food.originPrice }}</span>
        <span class="food-counter">
          <button v-show="food.count>0" class="subtraction-button" @click="handleAddFood(-1)">
            <SemiSelect style="width: 3vw;height: 3vw"/>
          </button>
          <span v-show="food.count>0" style="margin-left: 3vw;margin-right: 3vw;font-size: 4vw">{{ food.count }}</span>
          <button class="plus-button" @click="handleAddFood(1)">+</button>
        </span>
      </span>
    </div>

  </div>

</template>

<script>
import {reactive} from "vue";

export default {
  name: "FoodItem",
  props: ['food'],
  emits: ['addFood'],
  setup(props, content) {
    let food = props.food
    //初始化
    food.discount = (food.foodPrice / food.originPrice).toFixed(2) + '折 | 限1份'
    food.count = 0

    function handleAddFood(mark) {
      food.count += mark;
      content.emit('addFood', food.foodId, mark, food.foodPrice,food.originPrice)
    }

    return {
      food,
      handleAddFood

    }
  }

}
</script>

<style scoped>
.food-container {
  width: 100%;
  display: flex;
}

.food-image {
  width: 30vw;
  height: 30vw;
}

.food-main {
  flex: 1;

  box-sizing: border-box;
  padding: 2vw;

  display: flex;
  flex-direction: column;
  justify-content: left;

}


.food-title {
  text-align: left;
  font-size: 4vw;
  line-height: 5vw;
  font-weight: 700;
  color: black;
}

.small-font {
  color: #666666;
  font-size: 3vw;
}


.food-description {
  margin-top: 1.5vw;
  display: flex;
  justify-content: left;
}

.food-price {
  margin-top: 1.5vw;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-end;
  width: 100%;
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

.food-discount {
  color: #FF4B33;
  margin-top: 1.5vw;
  margin-right: 1vw;
  border: 1px solid #FF7708;
  border-radius: 2px;
  width: fit-content;
  overflow: hidden;
}


.food-counter {
  position: absolute;
  right: 2vw;
  z-index: 999;
}

.plus-button {
  width: 6vw;
  height: 6vw;
  background: #02B6FD;
  border: 0;
  /*  画圆*/
  border-radius: 3vw;

  color: white;
  font-weight: 500;
  font-size: 5vw;
  text-align: center

}

.subtraction-button {
  width: 6vw;
  height: 6vw;
  background: white;
  /*  画圆*/
  border-radius: 3vw;
  color: #02B6FD;
  font-weight: 500;
  font-size: 5vw;
  text-align: center;
  border: .0625rem solid #02b6fd;
  right: .9375rem;
  transition: color .3s ease;

}
</style>
