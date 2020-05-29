<template>
  <div>
    <span class="news-title">网络热搜事件</span>
    <el-divider></el-divider>
    <div class="hot-things-button">
      <el-button type="text" @click="changeData('nowSearch')">近五小时</el-button>
      <el-button type="text" @click="changeData('todaySearch')">今日</el-button>
      <el-button type="text" @click="changeData('sevenSearch')">近七日</el-button>
      <el-button type="text" @click="changeData('manLiveSearch')">民生</el-button>
      <el-button type="text" @click="changeData('funSearch')">娱乐</el-button>
      <el-button type="text" @click="changeData('sportSearch')">体育</el-button>
    </div>
    <div class="news-li">
      <ul>
        <li v-for="item in newsList" :key='item.mum'>
        	<span class="new_n">{{item.num}}</span>
        	<span class="new_c">{{item.name}}</span>
        	<span class="new_t">{{item.level}}</span>
          <span class="iconfont" :class="[item.trend == 'rise' ? 'icon-shangshengzengjia' : 'icon-xiajiangjianshao']"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import date from 'date-and-time'
  export default {
    created() {
      this.getNewslist()
    },
    data() {
      return {
        newsList: {},
        nowDate: date.format(new Date(), 'YYYYMMDD'),
        nowTime: ''
      }
    },
    methods: {
      async getNewslist() {
        const {
          data: res
        } = await this.$http.get('hotSearchEvent')
        this.newsList = res.data.list.hot.nowSearch
      },
      async changeData(name) {
        const {
          data: res
        } = await this.$http.get('hotSearchEvent')
        this.newsList = res.data.list.hot[name]
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-divider{
    margin: 12px 0 0 0;
  }
  .news-li{
    height: 352px;
  }
  .news-li>ul {
    height: 340px;
  }
  .iconfont{
    width: 40px;
  }
</style>
