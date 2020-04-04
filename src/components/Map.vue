<template>
	<div id="container"></div>
</template>

<script>
import 'echarts/map/js/china'
export default {
  async mounted() {
    var myChart = this.$echarts.init(document.getElementById('container')) 
    // 获取数据
    const { data: res } = await this.$http.get('newsDistribute')
    // console.log(res)
    const data = res.data.list.lists
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '今日全国各省新闻分布情况',
        left: 'center',
        textStyle: {
          color: 'white'
        }
      },
      tooltip: {
        formatter: function(res) {
          return `
            ${res.name}</br>
            新闻数量：${res.value}</br>
            `
        }
      },
      visualMap: {
        show: true,
        min: 0,
        max: 30,
        left: 100,
        top: 'bottom',
        calculable: true,
        inRange: {
          // color: ['#ffc0cb', '#800080'] // 红紫
          // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
          // color: ['#23074d', '#cc5333'] // 紫红
          color: ['#A5CC82', '#00467F'] // 绿蓝
          // color: ['#1488CC', '#2B32B2'] // 浅蓝
        }
      },
      series: [{
        type: 'map',
        map: 'china',
        roam: false,
        zoom: 1.2,
        // 文字
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        // 区域
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        data
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>
<style scoped>
#container{
    width: 770px;
    height: 730px;
}
</style>
