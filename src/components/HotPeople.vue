<template>
  <div>
    <span class="news-title">出现频繁的人名</span>
    <el-divider></el-divider>
    <div id="hot-people">
      <!-- echarts图表显示区域 -->
    </div>
  </div>
</template>

<script>
  // 按需引入
  import 'echarts/lib/chart/bar'
  // 引入提示框和title组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    async mounted() {
      var myChart = this.$echarts.init(document.getElementById('hot-people'))
      var {
        data: res
      } = await this.$http.get('hotPeople')
      // console.log(res)
      var data = res.data.list.lists
      var option = {
        dataset: {
          dimensions: ['name', 'value'],
          source: data
        },
        tooltip: {
          show: true,
          formatter: function(res) {
            return `
            ${res.data.name}</br>
            出现次数：${res.data.value}</br>
            `
          }
        },
        // 开启缩放功能
        dataZoom: [{
          id: 'dataZoomX',
          type: 'inside',
          xAxisIndex: [0],
          filterMode: 'filter'
        }],
        xAxis: {
          type: 'category',
          axisLabel: {
            color: 'white',
            rotate: 90,
            fontSize: 12
          }
        },
        yAxis: {
          axisLabel: {
            color: 'white'
          }
        },
        series: {
          type: 'bar',
          itemStyle: {
            normal: {
              color: (params) => {
                  const colors = ['#4150d8', '#28bf7e', '#ed7c2f', '#f2a93b', '#f9cf36', '#4a5bdc', '#4cd698', '#f4914e', '#fcb75b', '#ffe180', '#b6c2ff', '#96edc1']
                  return colors[params.dataIndex]
              }
            }
          }
        }
      }
      myChart.setOption(option)
    }
  }
</script>

<style lang="less" scoped>
  #hot-people {
    width: 535px;
    height: 400px;
  }
</style>
