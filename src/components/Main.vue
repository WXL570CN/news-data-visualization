<template>
  <el-container class="main-container">
    <!-- 头部header区域 -->
    <el-header>热点新闻数据可视化平台</el-header>
    <!-- 主题内容区域 -->
    <el-main>
      <el-row>
        <!-- 左部分 -->
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <!-- 今日热点新闻 -->
            <div class="today-news">
              <TNews></TNews>
            </div>     
            <!-- 历史上的今天 -->
            <div class="history-today">
              <TThings></TThings>
            </div>  
            <!-- 热点人物 -->
            <div class="hot-people">
              <HotPeople></HotPeople>
            </div>
          </div>
        </el-col>
        <!-- 中部分 -->
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <span class="now-time">{{nowTime}}</span>
            <!-- 新闻分布 -->
            <div class="map">
              <Map></Map>
            </div>
            <!-- 热搜游戏 -->
            <div class="hot-game">
              <HotGame></HotGame>
            </div>
          </div>
        </el-col>
        <!-- 右部分 -->
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <!-- 热点词云 -->
            <div class="word-cloud">
              <KeyWordsCloud></KeyWordsCloud>
            </div>
            <!-- 热搜事件 -->
            <div class="hot-search">
              <HotSearch></HotSearch>
            </div>
            <!-- 出现频繁机构 -->
            <div class="hot-place">
              <HotOrg></HotOrg>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import date from 'date-and-time'
  import TNews from './TNews.vue'
  import TThings from './TThings.vue'
  import Map from './Map.vue'
  import KeyWordsCloud from './KeyWordsCloud.vue'
  import HotPeople from './HotPeople.vue'
  import HotGame from './HotGame.vue'
  import HotSearch from './HotSearch.vue'
  import HotOrg from './HotOrg.vue'
  export default {
    name: 'hello',
    created() {
      this.getTime()
    },
    data() {
      return {
        nowTime: ''
      }
    },
    methods: {
      // 获取当前时间
      getTime() {
        setInterval(() => {
          this.nowTime = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
        }, 1000)
      }
    },
    components: {
      KeyWordsCloud,
      Map,
      TNews,
      TThings,
      HotPeople,
      HotGame,
      HotOrg,
      HotSearch
    }
  }
</script>

<style lang="less" scoped>
  .main-container {
    background-color: #000A2F;
    height: 100%;
    color: #FFEFD5;
  }
  .el-header {
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    font-family: "微软雅黑";
    letter-spacing: 0.2em;
    background: url(../assets/img/headerBGM.png) 100% 100%;
    padding-top: 5px;
  }
  .el-col {
    padding-right: 10px;
  }
  // 地图
  .map {
    width: 100%;
    height: 773px;
    background-image: url(../assets/img/mapBGM.png);
    background-size: 100%;
    background-repeat: no-repeat;
    margin-bottom: 65px;
  }
</style>