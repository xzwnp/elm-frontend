<template>

  <footer class="tabbar-container">
    <el-link :type="selected==='home'?'primary':'default'" @click="jumpTo('/')" :underline="false">
      <div class="tabbar-item">
        <!--warning是误报-->
        <Eleme class="tabbar-item-icon"/>
        <span class="tabbar-item-word">首页</span>
      </div>

    </el-link>
    <el-link :type="selected==='discovery'?'primary':'default'" @click="jumpTo('/discovery')" :underline="false">
      <div class="tabbar-item">
        <!--warning是误报-->
        <Expand class="tabbar-item-icon"/>
        <span class="tabbar-item-word">发现</span>
      </div>

    </el-link>
    <el-link :type="selected==='orders'?'primary':'default'" @click="jumpTo('/orderList')" :underline="false">
      <div class="tabbar-item">
        <!--warning是误报-->
        <Tickets class="tabbar-item-icon"/>
        <span class="tabbar-item-word">订单</span>
      </div>

    </el-link>
    <el-link :type="selected==='user'?'primary':'default'" @click="jumpTo('/user')" :underline="false">
      <div class="tabbar-item">
        <!--warning是误报-->
        <User class="tabbar-item-icon"/>
        <span class="tabbar-item-word">我的</span>
      </div>

    </el-link>
  </footer>
</template>

<script>
import {useRouter} from 'vue-router';

export default {
  name: "TabBar",
  props:['selected'],
  setup() {
    const router = useRouter()

    function jumpTo(path) {
      router.push(path)
    }
    return {
      jumpTo,
    }
  },
}
</script>

<style scoped>
.tabbar-container {
  background: white;
  /*以下两条用于置底*/
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 14vw;
  display: flex;
  /*是行优先还是列优先*/
  flex-direction: row;
  /*弹性模型的换行相关配置*/
  /*默认为nowrap:如果子元素太大,会缩小子元素*/
  flex-wrap: nowrap;
  /*子元素水平居中显示*/
  justify-content: space-between;

  border: 1px solid #EBEEF5;
  border-radius: 2px


}

.tabbar-item {
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tabbar-item-icon {
  /*em的大小取决于字体大小,默认字体大小16px,所以默认1em=16px*/
  width: 2em;
  height: 2em;
}
</style>
