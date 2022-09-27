<template>
  <div class="container">
    <HomeHeader/>
    <!-- 点餐分类部分 -->
    <ul class="foodtype radius-border">
      <li @click="toBusinessList('food')">
        <img src="@/assets/dcfl01.png">
        <p>美食</p>
      </li>
      <li @click="toBusinessList('breakfast')">
        <img src="@/assets/dcfl02.png">
        <p>早餐</p>
      </li>
      <li @click="toBusinessList('run')">
        <img src="@/assets/dcfl03.png">
        <p>跑腿代购</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl04.png">
        <p>汉堡披萨</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl05.png">
        <p>甜品饮品</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl06.png">
        <p>速食简餐</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl07.png">
        <p>地方小吃</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl08.png">
        <p>米粉面馆</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl09.png">
        <p>包子粥铺</p>
      </li>
      <li onclick="location.href='businessList.html'">
        <img src="@/assets/dcfl10.png">
        <p>炸鸡炸串</p>
      </li>
    </ul>
    <div class="list">
      <div class="divider">
        <el-divider content-position="center"><span style="color: #999999">为您推荐附近的商家</span></el-divider>
      </div>
      <BusinessList type="food"></BusinessList>
    </div>

    <!--  &lt;!&ndash; 超级会员部分 &ndash;&gt;-->
    <!--  <div class="supermember">-->
    <!--    <div class="left">-->
    <!--      <img src="@/assets/super_member.png">-->
    <!--      <h3>超级会员</h3>-->
    <!--      <p>&#8226; 每月享超值权益</p>-->
    <!--    </div>-->
    <!--    <div class="right">-->
    <!--      立即开通 &gt;-->
    <!--    </div>-->
    <!--  </div>-->


  </div>
  <tab-bar selected="home"></tab-bar>
</template>

<script>
// @ is an alias to /src
import TabBar from "@/components/TabBar";
import HomeHeader from "@/components/HomeHeader";
import {useRouter} from "vue-router";
import {reactive} from "vue";
import BusinessList from "@/components/BusinessList";
import Business from "@/api/Business";

export default {
  name: 'Home',
  components: {
    TabBar, HomeHeader, BusinessList
  },
  setup() {
    let router = useRouter()


    function getBusinessList() {
      //todo
      return Business.getBusinessList();
    }

    function toBusinessList(type) {
      router.push({
        path: '/businessList',
        query: {
          type: type
        }
      })
    }

    function toLogin() {
      router.push({
        path: '/login',
      })
    }

    return {
      toBusinessList,
      getBusinessList,
      toLogin
    }
  },
}
</script>

<style scoped>


.container {
  background: #f4f4f5;
  width: 100vw;
}

.foodtype {
  background: white;
  margin: 3vw 2vw 0;
  width: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 3vw 0;
}


.divider {
  margin-top: 2vw;
  padding: 3vw;
  height: 2em;
  background: white;
  display: flex;
  align-items: center;
  margin-bottom: 2vw;
}

.foodtype li {
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.foodtype li img {
  width: 17vw;

}

.list {
  margin-left: 2vw;
  margin-right: 2vw;
  margin-bottom: 14vw;
}
</style>
