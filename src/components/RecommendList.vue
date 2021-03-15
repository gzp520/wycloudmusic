<template>
  <ul class="RecommendList">
      <RecommendItem v-for="item in $store.state.RecommendSongList" :key="item.id" :item="item"></RecommendItem>
  </ul>
</template>

<script>
import RecommendItem from './RecommendItem'
export default {
    components:{
        RecommendItem
    }
}
</script>

<style lang="less">
.RecommendList{
    width: 100%;
    margin-top: 15px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    li{
        flex:((100% - 20px) / 3);
    }
}
</style>