<template>
  <header>
    <back class="back-icon" @click="backToPrevious"></back>
    {{ title }}
  </header>
  <!--  -->
  <div style="margin-top: 12vw"></div>
</template>

<script>
export default {
  name: "TopBar",
  props: ['title'],
  setup() {
    function backToPrevious() {
      window.history.go(-1)
    }

    return {
      backToPrevious
    }
  }

}

</script>

<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  height: 12vw;
  width: 100vw;
  background: #02b6fd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 6vw;
  font-weight: 600;
}

.back-icon {
  height: 8vw;
  position: fixed;
  left: 2vw;
  top: 2vw;
  color: white;
}
</style>
