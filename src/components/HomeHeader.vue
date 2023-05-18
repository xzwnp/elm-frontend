<template>
  <div class="home-header">
    <span class="location-box">
      <el-icon>
        <Location/>
      </el-icon>
      云南大学呈贡校区
    </span>
    <div class="search-box">
      <el-icon color="gray" style="margin-left:1vw;margin-right: 2vw;height: 4vw;width: 4vw">
        <Search></Search>
      </el-icon>
      <input class="search-box-body" v-model="searchKey" placeholder="搜索饿了么商家、商品名称"/>
      <el-button style="color: white;background: #02b6fd;border-radius: 4vw;width: 17vw;height:8.5vw" >搜索</el-button>
    </div>

  </div>
  <div style="margin-top: 30vw;background: white"></div>
</template>

<script>
import {Location} from "@element-plus/icons-vue";
import {ref} from "vue";

export default {
  components: {
    Location
  },
  setup() {
    let searchKey = ref('')

    function remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }

    return {
      searchKey,
      remoteMethod,
      options: [],
      value: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return {value: `value:${item}`, label: `label:${item}`};
    });
  },
}
</script>

<style scoped>
.home-header {
  background-color: #02b6fd;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: left;
  padding-bottom: 5vw;
  width: 100%;
  position: fixed;
  top:0;
  left: 0;
  z-index: 999;
}

.search-box {
  width: 96%;
  height: 10vw;
  display: flex;
  background: white;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  /*圆角边框*/
  border: 1px;
  border-radius: 4vw;
  overflow: hidden;
}


.search-box-body {
  /*仅设置body的flex占比而不设置icon的,代表body占据所有剩余空间*/
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  max-height: 100%;
  border: none;
  width: max-content;

}

.search-box-body:focus {
  /*去除选中时的金框*/
  outline: none;
}


.search-box-icon {
  width: 2.5em;
  height: 2.5em;
}

.location-box {
  margin: 4vw;
  display: flex;
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
}
</style>
