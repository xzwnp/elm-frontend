<template>
  <tab-bar selected="user"></tab-bar>
</template>

<script>
import Login from "@/views/Login";
import {useRouter} from "vue-router";
import TabBar from "@/components/TabBar";
export default {
  name: "Mine",
  components: {TabBar},
  setup(){
    const router = useRouter()
    router.push({path:'/login'})
  }
}
</script>

<style scoped>

</style>
