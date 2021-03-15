<template>
  <div class="RankingItem" >
      <div class="cover">
        <img v-lazy="item.coverImgUrl + `?imageView=1&type=webp&thumbnail=${picSize}x${picSize}`" alt="">
        <span>{{item.updateFrequency }}</span>
      </div>
      <p v-if="!item.tracks.length">{{item.name}}</p>
  </div>
</template>

<script>
export default {
    props:['item'],
    data(){
        return {
            picSize:null,
        }
    },
    created(){
        this.picSize = (window.innerWidth - 10) / 3;
    }
}
</script>

<style lang="less">
.RankingItem{
    width: 100%;
    .cover{
        flex: 1;
        margin-right: 10px;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        span{
            color: white;
            font-size: 14px;
            position: absolute;
            left: 5px;
            bottom: 5px;
        }
    }
    p{
        font-size: 14px;
        padding:  10px 0 10px 5px;
    }
}
</style>