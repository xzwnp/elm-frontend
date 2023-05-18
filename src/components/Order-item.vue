<template>
  <div class="business-name-and-price" style="width: 100%">
    <div style="width:100%;display: flex;justify-content: space-between">
      <el-link style="color:#02b6fd;font-size: 5vw" @click="showFoodList=!showFoodList">
        {{ businessName }}
        <el-icon>
          <ArrowDown/>
        </el-icon>
      </el-link>
      <span class="price">{{ totalPrice }}</span>
    </div>
    <!--      ul会自带padding-left,没必要-->
    <el-collapse-transition>
      <div v-if="showFoodList" style="font-size: 4vw;padding: 2vw">
        <span v-for="food in foodList" :key="food.foodId"
              style="width:100%;display: flex;justify-content: space-between;margin-bottom: 2vw">
          <span style="display: inline-block;white-space: nowrap;width: 40%;overflow: hidden;text-overflow:ellipsis;">
            {{ food.foodName }}</span>
          <span class="food-count">x{{ food.count }}</span>
          <span class="price">{{ food.foodPrice }}</span>
        </span>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {computed, reactive, toRefs} from "vue";

export default {
  name: "Order-item",
  setup() {
    const route = useRoute()
    let data = reactive({
      showFoodList: false,
      businessName: route.query.businessName,
      foodList: JSON.parse(route.query.foodList),
      totalPrice: 0,
      selectedPayWay: "",
    })
    data.totalPrice = computed(() => {
      let total = 0
      data.foodList.forEach(food => {
        total += food.foodPrice * food.count
      })
      return total.toFixed(2)
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style scoped>

</style>
