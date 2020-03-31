<template>
  <div id="hotOrg"></div>
</template>

<script>
  // 按需引入
  import 'echarts/lib/chart/bar'
  // 引入提示框和title组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    mounted() {
      var myChart = this.$echarts.init(document.getElementById('hotOrg'))
      // 获取数据
      // const data = await this.$http.get('')
      var data = []
      var option = {
        dataset: {
          dimensions: ['name', 'value'],
          source: data
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: 'white'
          }
        },
        yAxis: {
          axisLabel: {
            color: 'white'
          }
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
        series: {
          type: 'bar',
          itemStyle: {
            color: 'blue'
          }
        }
      }
      myChart.setOption(option)
    }
  }
</script>

<style scoped="scoped">
  #hotOrg {
    width: 535px;
    height: 350px;
  }
</style>
