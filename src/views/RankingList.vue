<template>
  <div class="RankingList">
      <Back>排行榜</Back>
      <template v-if="officialList && globalList">
        <RankingTitle>官方榜</RankingTitle>
        <div class="officialRank">
            <div class="officialItem" v-for="item in officialList" :key="item.id" @click="ToCloudRank(item.id,item)">
                <RankingItem :item="item"></RankingItem>
                <ul>
                    <li v-for="(item,index) in item.tracks" :key="index">{{(index + 1 ) + '.' + item.first + ' - ' + item.second}}</li>
                </ul>
            </div>
        </div>
        <RankingTitle>全球榜</RankingTitle>
        <div class="globalRank">
            <RankingItem v-for="item in globalList" :key="item.id" :item="item" @click.native="ToRankDetail(item.id)"></RankingItem>
        </div>
      </template>
      <template v-else>
      <div class="load">
        <div>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <p>加载中...</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Back from '../components/Back'
import RankingItem from '../components/RankingItem'
import RankingTitle from '../components/RankingTitle'
export default {
    components:{
        Back,
        RankingItem,
        RankingTitle
    },
    data(){
        return {
            officialList:null,
            globalList:null,
        }
    },
    created(){
        this.axios.get("/toplist/detail").then((response)=>{
            this.officialList = response.data.list.slice(0,4);
            this.globalList = response.data.list.slice(4);
        })
    },
    methods:{
        ToRankDetail(id){
            this.$router.push({
                path:'/SongListList',
                query:{
                    id
                }
            })
        },
        ToCloudRank(id,info){
            this.$router.push({
                path:'/CloudRank',
                name:'CloudRank',
                query:{
                    id
                },
                params:{
                    info
                }
            })
        }
    }
}
</script>

<style lang="less">
.RankingList{
    width: 100%;
    padding-top: 50px;
    .load{
    width: 100vw;
    height: calc(100vh - 150px);
    position: relative;
    >div{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      p{
        font-size: 14px;
        // color: #ff0000;
        font-weight: bold;
      }
      i{
        display: inline-block;
        width: 3px;
        height: 22px;
        background-color: red;
        margin-left: 3px;
        animation: jump .6s infinite -0.4s linear alternate;
        transform-origin: center bottom;
        &:nth-child(2){
          animation-delay: -0.2s;
        }
        &:nth-child(3){
          animation-delay: 0s;
        }
        &:nth-child(4){
          animation-delay: 0.2s;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
      @keyframes jump {
        0%{
        }
        100%{
          transform: scaleY(0);
        }
      }
    }
    
  }
    .officialRank{
        width: 100%;
        .officialItem{
            width: 100%;
            display: flex;
            border-bottom: 1px solid #e7e9ea;
            margin-top: 5px;
            .RankingItem{
                flex: 1;
            }
            ul{
                flex: 2;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                li{
                    width: 100%;
                    color: #616262;
                    font-size: 14px;
                    white-space: nowrap;
                    word-break: break-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 60vw;
                }
            }
        }
    }
    .globalRank{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .RankingItem{
            margin-top: 5px;
            flex: calc((100% - 10px) / 3);
            .cover{
                margin-right: 0;
            }
            &:nth-child(3n-1){
                margin-left: 5px;
                margin-right: 5px;
            }
            &:last-child{
                width: 33.33%;
                padding-right: 5px;
                flex: none;
            }
        }
    }
}
</style>