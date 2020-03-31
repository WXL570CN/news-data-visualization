<template>
  <div>
    <span class="news-title">出现频繁的游戏名</span>
    <el-divider></el-divider>
    <div class="hot-things-button">
      <el-button type="text" @click="changeCharts('网络游戏')">网络游戏</el-button>
      <el-button type="text" @click="changeCharts('手机游戏')">手机游戏</el-button>
      <el-button type="text" @click="changeCharts('单机游戏')">单机游戏</el-button>
      <el-button type="text" @click="changeCharts('网页游戏')">网页游戏</el-button>
    </div>
    <div id="hot-game">
      <!-- echarts图表显示区域 -->
    </div>
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        chartsd: null,
        chartsData: []
      }
    },
    async mounted() {
      // 优先显示网络游戏数据
      var {
        data: res
      } = await this.$http.get('hotGame')
      // console.log(res)
      var arr = res.data.list.hot['网络游戏'].slice(0, 5)
      this.chartsData = arr.map(item => {
        return {
          name: item.name,
          value: parseInt(item.level)
        }
      })
      this.chartsd = this.$echarts.init(document.getElementById('hot-game'))
      this.drawCharts()
    },
    methods: {
      drawCharts() {
        var option = {
          dataset: {
            dimensions: ['name', 'value'],
            source: this.chartsData
          },
          // 开启缩放功能
          dataZoom: [{
            id: 'dataZoomX',
            type: 'inside',
            xAxisIndex: [0],
            filterMode: 'filter'
          }],
          tooltip: {
            show: true,
            formatter: function(result) {
              return `
                ${result.data.name}</br>
                热度：${result.data.value}</br>
                `
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: 'white',
              rotate: 45
            }
          },
          yAxis: {
            axisLabel: {
              color: 'white'
            }
          },
          series: {
            type: 'bar'
          }
        }
        this.chartsd.setOption(option)
      },
      async changeCharts(nameSort) {
        var {
          data: res
        } = await this.$http.get('hotGame')
        // console.log(res)
        var arr = res.data.list.hot[nameSort].slice(0, 5)
        this.chartsData = arr.map(item => {
          return {
            name: item.name,
            value: parseInt(item.level)
          }
        })
      }
    },
    watch: {
      chartsData: function() {
        this.drawCharts()
      }
    }
  }
</script>

<style lang="less" scoped>
  #hot-game {
    width: 535px;
    height: 400px;
  }
</style>
