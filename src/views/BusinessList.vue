<template>
  <div class="wrapper">
    <header>
      <!--      el-icon-back-->
      <back class="back-icon" @click="jumpTo('/')"></back>
      商家列表
    </header>
    <business-list-component :type="data.type" class="business-list"></business-list-component>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import {reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import BusinessListComponent from "@/components/BusinessList";
import TabBar from "@/components/TabBar";

export default {
  name: "BusinessList",
  components: {BusinessListComponent, TabBar},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = reactive(
        {
          type: route.query.type,
        }
    )

    function jumpTo(path) {
      router.push(path)
    }

    return {
      data,
      jumpTo
    }
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
}

header {
  box-sizing: border-box;
  display: flex;
  padding: 4vw;
  width: 100%;
  height: 15vw;
  background: #02b6fd;
  font-size: 7vw;
  color: white;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  /*固定上方*/
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

}

.business-list {

  margin-top: 17vw;
}

.clear-float {
  clear: both;
}

.back-icon{
  height: 7vw;
  position: absolute;
  left: 2vw;
  bottom: 4vw;
}
</style>
