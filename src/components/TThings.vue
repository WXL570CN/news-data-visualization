<template>
  <div class="news-li today-tThings">
    <span class="news-title">历史上的今天</span>
    <el-divider></el-divider>
  	<ul>
  		<li v-for="(item, index) in thingsList" :key='item.id'>
  			<span class="new_n">{{index+1}}</span>
  			<span class="new_c">{{item.title}}</span>
  			<span class="new_t">{{item.year}}-{{item.month}}-{{item.day}}</span>
  		</li>
  	</ul>
  </div>
</template>

<script>
import date from 'date-and-time'
export default {
  created() {
    this.getThingslist()
  },
  data() {
    return {
      thingsList: {},
      nowDate: date.format(new Date(), 'MMDD')
    }
  },
  methods: {
    async getThingslist() {
      const {
        data: res
      } = await this.$http.get('todayThing')
      this.thingsList = res.data.list.things
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  .news-li{
    height: 430px;
  }
</style>
