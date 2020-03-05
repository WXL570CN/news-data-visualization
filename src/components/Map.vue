<template>
  <ve-map
   :data="chartData"
   :settings="chartSettings"
   height='700px'
   :events="chartEvents"
   :loading="loading">
  </ve-map>
</template>

<script>
export default {
  data () {
    this.chartSettings = {
      position: 'china',
      itemStyle: {
        normal: {	// 正常显示
          label: {
            color: '#FFF5EE'
          },
          areaColor: '#090C1D',
          borderWidth: 0.5,
          borderColor: '#19407F',
          // 阴影效果
          shadowColor: '#2E4FB6',
          shadowBlur: 5
        },
        emphasis: {	// 鼠标hover时的样式
          label: {
            color: '#fff'
          },
          areaColor: '#0F184E',
          borderWidth: 1,
          borderColor: '#fff'
        }
      }
    }
    this.chartEvents = {
      click: function (e) {
        this.$router.replace('/menu')
      }
    }
    return {
      chartData: {
        columns: ['位置', '热点新闻数量'],
        rows: [
          // { 位置: '江西', 热点新闻数量: 123 },
          // { 位置: '重庆', 热点新闻数量: 123 }
        ]
      },
      loading: true
    }
  }
}
</script>
