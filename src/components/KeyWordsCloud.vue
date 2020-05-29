<template>
  <div class="word-cloud">
    <span class="news-title">今日热点词云</span>
    <el-divider></el-divider>
    <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>  
  </div>
</template>

<script>
  import date from 'date-and-time'
  export default {
    created() {
      this.getWordCloud()
    },
    data() {
      this.chartSettings = {
        color: ['#629fc9', '#94bedb', '#c9e0ef', '#67C23A', '#F56C6C', '#909399', '#303133', '#1f77b4'],
        shape: 'diamond'
      }
      return {
        wordClouds: [],
        wordObj: {},
        defaultWords: [],
        chartData: {},
        nowDate: date.format(new Date(), 'YYYYMMDD')
      }
    },
    methods: {
      // 获取新闻热词
      async getWordCloud() {
        const {
          data: res
        } = await this.$http.get('cloud')
        // console.log(res)
        this.wordClouds = res.data.list.words
        this.wordClouds.map((a) => {
          if (a in this.wordObj) {
            this.wordObj[a]++
          } else {
            this.wordObj[a] = 1
          }
        })
        for (const key in this.wordObj) {
          const obj = {
            word: key,
            count: this.wordObj[key]
          }
          this.defaultWords.push(obj)
        }
        this.chartData = {
          columns: ['word', 'count'],
          rows: this.defaultWords
        }
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .word-cloud{
    height: 430px;
  }
</style>
