<template>
  <div class="news-li today-news">
    <span class="news-title">新浪今日热点新闻新闻</span>
    <el-divider></el-divider>
    <ul>
      <li v-for="(item, index) in newsList" :key='item.id'>
        <span class="new_n">{{index+1}}</span>
        <span @click="getDetail(item.url)" class="new_c">
          {{item.title}}
        </span>
        <span class="new_t">{{item.time}}</span>
      </li>
    </ul>
    <el-drawer :title="newsDetail.title" :visible.sync="drawer" :direction="ttb">
      <div v-html="newsDetail.html"></div>
    </el-drawer>
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
        nowTime: '',
        drawer: false,
        newsDetail: {}
      }
    },
    methods: {
      async getNewslist() {
        const {
          data: res
        } = await this.$http.get('news')
        this.newsList = res.data.list.lists
      },
      async getDetail(url) {
        console.log(url)
        this.drawer = true
        const {
          data: res
        } = await this.$http.post('newsDetail', {
          url: url
        })
        this.newsDetail = res.data
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .news-li {
    height: 430px;
  }

  .new_c {
    cursor: pointer;
  }
</style>
