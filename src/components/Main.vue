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
            <span class="news-title">今日热点新闻新闻</span>
            <el-divider></el-divider>
            <div class="news-list">
              <ul>
                <li v-for="(item, index) in newsList" :key='item.id'><span>{{index+1}}</span>{{item.title}}</li>
              </ul>
            </div>
            <span class="news-title">Echarts图表</span>
            <el-divider></el-divider>
          </div>
        </el-col>
        <!-- 中部分 -->
        <el-col :span="10">
          <div class="grid-content bg-purple-light">
            <span class="news-title">热点地区分布</span>
            <span class="now-time">{{nowTime}}</span>
            <el-divider></el-divider>
            <div class="map">
              <Map></Map>
            </div>
          </div>
        </el-col>
        <!-- 右部分 -->
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <span class="news-title">热点词云</span>
            <el-divider></el-divider>
            <div class="word-cloud">
              <VChartsWordCloud></VChartsWordCloud>
            </div>
            <span class="news-title">Echarts图表2</span>
            <el-divider></el-divider>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import date from 'date-and-time'
import Map from './Map'
import VChartsWordCloud from './VChartsWordCloud.vue'
export default {
  name: 'hello',
  created() {
    this.getNewslist()
    this.getTime()
  },
  data () {
    return {
      newsList: {},
      nowDate: date.format(new Date(), 'YYYYMMDD'),
      nowTime: ''
    }
  },
  methods: {
    // 获取新闻列表
    async getNewslist () {
      const { data: res } = await this.$http.get('list')
      const count = res.data.count
      for (var i = 0; i < count; i++) {
        if (res.data.list[i].date === this.nowDate) {
          this.newsList = res.data.list[i].lists
        }
      }
    },
    // 获取当前时间
    getTime () {
      setInterval(() => {
        this.nowTime = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
      }, 1000)
    }
  },
  components: {
    Map,
    VChartsWordCloud
  }
}
</script>

<style lang="less" scoped>
  .main-container{
    background-color: #000A2F;
    height: 100%;
    color: #FFEFD5;
  }
  .el-header{
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    font-family: "微软雅黑";
    letter-spacing: 0.2em;
    background: url(../assets/img/headerBGM.png) 100% 100%;
    padding-top: 5px;
  }
  .el-col{
    padding-right: 10px;
  }
  // 新闻排行
  .news-title{
    font-size: 18px;
    color: darkgray;
  }
  .news-list{
    width: 100%;
    height: 400px;
    >ul>li{
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    >ul>li>span{
      margin-right: 20px;
    }
  }

  // 地图
  .map{
    width: 100%;
    height: 773px;
    background-image: url(../assets/img/mapBGM.png);
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .this-map{
    width: 100%;
    height: 100%;
  }

  // 词云
  .word-cloud{
    position: relative;
    width: 100%;
    height: 400px;
  }
</style>

