<template>
  <!--  商家列表部分-->
  <div class="business-list radius-border" v-loading="data.showLoading">
    <el-empty v-if="!data.businessList||data.businessList.length===0" description="这个分类没有数据呢"
              style="background: white"></el-empty>
    <div v-for="business in data.businessList" class="business-item" @click="toBusinessInfo(business.businessId)">
      <el-image class="business-image" :src="business.cover" fit="fill"></el-image>
      <div class="business-body">
        <span class="business-title">{{ business.title }}</span>

        <div class="score-time-distance">
        <span class="business-score-area">
          <span class="business-score ">{{ business.score }}分</span>
          <span class="business-sellCount small-font"> 月售{{ business.sellCount }}</span>
        </span>
          <span class="time-distance small-font">45分钟 3.2km</span>
        </div>

        <span class="business-delivery">
          <span class="business-start-price small-font">起送{{ business.startPrice }}&nbsp&nbsp</span>
          <span class="business-delivery-price-free small-font" v-if="business.deliveryPrice==0">免配送费</span>
          <span class="business-delivery-price small-font" v-else>配送{{ business.deliveryPrice }}</span>
        </span>

        <span class="hot-comment small-font">
          {{ business.hotComment }}
        </span>
        <span v-show="business.discounts&&business.discounts.length!==0" class="discounts small-font">
          <span class="discount" v-for="discount in business.discounts">{{ discount }}</span>
          <span v-show="business.redPacket&&business.redPacket!==''" class="redPacket small-font">
          {{ business.redPacket }}
          </span>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from "vue";
import Business from "@/api/Business";
import {useRouter} from "vue-router";

export default {
  name: "BusinessList",
  props: ['type'],
  setup(props, content) {
    const router = useRouter()
    const data = reactive({
      showLoading: false,
      current: 1,
      size: 10,
      type: props.type,
      businessList: [],
      list: [{}, {}, {}]
    })

    function getData() {
      data.showLoading = true
      Business.getBusinessList(data.type, data.current, data.size).then(response => {
        let list = response.data.data
        console.log("商家列表:", data.businessList)
        //数据转换
        list.forEach(item => {
          item.title = item.businessName
          item.discounts = item.discounts.split(',')
        })
        data.businessList = list
      }).catch(err => console.log("获取商家信息错误", err))
          .finally(() => {
            data.showLoading = false

          })
    }

    function toBusinessInfo(id) {
      router.push({
        path: '/businessInfo',
        query: {
          id
        }
      })
    }

    //没有created了,直接写就行
    getData()
    return {
      data,
      toBusinessInfo
    }
  }
}
</script>

<style scoped>
.business-list {
  background: #f4f4f5;
}


.business-item {
  box-sizing: border-box;
  background: white;
  display: flex;
  flex-wrap: nowrap;
  padding: 3vw 4vw;
  border: 2px white;
  border-radius: 2vw;
  overflow: hidden;
  margin-bottom: 2vw;
}

.business-image {
  width: 30vw;
  height: 30vw;
}

.business-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 4vw;
}

.business-title {
  font-size: 1.17em;
  font-weight: 600;
  text-align: left;
}


.score-time-distance {
  margin-top: 2vw;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.business-score-area {
  width: 45%;
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;
  align-items: center;
}

.time-distance {
  width: 40%;
  justify-content: right;

}


.small-font {
  color: #666666;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 3vw;
}

.business-score {
  color: #FF6300;
  font-size: 1em;
}

.business-delivery {
  margin-top: 2vw;
  width: 45%;
  display: flex;

  justify-content: space-between;
}

.business-delivery-price-free {
  color: #FF7708;
}

.hot-comment {
  margin-top: 2vw;
  color: #F56105;
  background: #FEF0E5;
  /*宽度随文字长度自适应*/
  width: fit-content;
}

.discounts {
  margin-top: 2vw;
  display: flex;
  justify-content: left;
  max-width: 100%;
  flex-wrap: wrap;
}

.discount {
  color: #FF4B33;
  margin-right: 1vw;
  border: 1px solid #FF7708;
  border-radius: 2px;
  width: fit-content;
  overflow: hidden;
  white-space: nowrap;
  height: 3vw;
}

.redPacket {
  color: #AE6C28;
  border: 1px solid rgb(220, 160, 90);
  border-radius: 2px;
  width: fit-content;
  overflow: hidden;
  white-space: nowrap;
  height: 3vw;
}
</style>
