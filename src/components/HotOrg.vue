<template>
  <div>
    <span class="news-title">出现频繁的机构</span>
    <el-divider></el-divider>
    <div id="hot-organize"></div>
  </div>
</template>

<script>
  // 按需引入
  import 'echarts/lib/chart/pie'
  // 引入提示框和title组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  export default {
    async mounted() {
      var myChart = this.$echarts.init(document.getElementById('hot-organize'))
      // 获取数据
      const { data: res } = await this.$http.get('hotOrg')
      const data = res.data.list.lists
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
        series: {
          type: 'pie'
        }
      }
      myChart.setOption(option)
    }
  }
</script>

<style lang="less" scoped>
  #hot-organize {
    width: 535px;
    height: 450px;
  }
</style>

