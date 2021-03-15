<template>
  <div class="CloudRank">
      <Back>歌单详情</Back>
      <template v-if="!nodata">
        <div class="cover" :style="`backgroundImage:url(${$route.params.info.coverImgUrl})`" v-if="$route.params">
            <span class="CloudMusic">云音乐</span>
            <span class="UpdateTime">最近更新:{{$route.params.info.updateTime | FormatUpdateTime}}</span>
            <span class="introduce">{{$route.params.info.description | Format}}</span>
        </div>
        <div class="NewSongs_list">
            <div class="play_all"  v-if="SongListPlus">
            <span class="text">播放全部</span>
            <span class="num">（共{{SongListPlus.length}}首）</span>
            </div>
            <ul class="list">
            <Song v-for="(item,index) in SongListPlus" :key="item.id" :index="index" @click.native="$store.state.play.currentList = SongListPlus" :picUrl="item.picUrl" :item="item"></Song>
            </ul>
        </div>
        <footer>
            —— 我也是有底线的 ——
        </footer>
        </template>
        <template v-else>
            <div class="nodata">
                该歌单暂无数据
            </div>
        </template>
  </div>
</template>

<script>
import Back from '@/components/Back'
import Song from '@/components/Song'
export default {
    components:{
        Back,
        Song
    },
    data(){
        return {
            SongListPlus:'',
            nodata:false,
        }
    },
    filters:{
        FormatUpdateTime(InitValue){
            var DateArr = new Date(InitValue).toLocaleDateString().split('/');
            return DateArr[1] + '月' + DateArr[2] + '日'
        },
        Format(InitValue){
            if(InitValue.indexOf("申请") != -1){
                var result = InitValue.split('申请')
                return result[0]
            }
            return InitValue;
        }
    },
    created(){
        this.axios.get("/playlist/detail?id=" + this.$route.params.info.id).then((response)=>{
            console.log("当前歌单数据=>",response.data);
            if(!response.data.playlist){
                this.nodata = true;
                return;
            }
            var Ids = response.data.playlist.trackIds;
            var IdStr = '';
            for(var i=0;i<Ids.length;i++){
                IdStr += Ids[i].id + ','
            }
            return IdStr.slice(0,IdStr.length-1)
        }).then((response)=>{
            this.axios.get("/song/detail?ids=" + response).then(response=>{
                this.SongListPlus = response.data.songs
            })
        })
    }
}
</script>

<style lang="less">
.CloudRank{
    width: 100%;
    padding-top: 50px;
    .cover{
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        position: relative;
        .CloudMusic{
            color: white;
            font-style: italic;
            font-size: 24px;
            position: absolute;
            left: 50px;
            top: 10px;
        }
        .UpdateTime{
            color: white;
            font-size: 14px;
            position: absolute;
            left: 40px;
            bottom: 40px;
        }
        .introduce{
            font-size: 14px;
            color: white;
            position: absolute;
            left: 40px;
            top: 165px;
        }
    }
    .NewSongs_box{
        width: 100%;
        .cover{
        height: 100%;
        height: 180px;
        position: relative;
        background-size: cover;
        h1{
            position: absolute;
            color: white;
            left: 20px;
            bottom: 30px;
            text-shadow: 1px 0px 1px black;
        }
        p{
            position: absolute;
            left: 20px;
            text-shadow: 1px 0px 1px black;
            letter-spacing: 2px;
            font-size: 14px;
            color: rgba(255, 255, 255, .8);
            bottom: 30px;
        }
        }
    }
    .NewSongs_list{
      width: 100%;
      position: relative;
      z-index: 1;
      background-color: #fff;
      border-radius: 30px;
      .play_all{
        width: 100%;
        padding: 15px;
        .text{
          color: #343434;
          font-size: 20px;
          padding-left: 30px;
          padding-bottom: 5px;
          background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=) no-repeat;
          background-position: -24px 2px;
          background-size: 166px 97px;
        }
        .num{
          color: #999999;
        }
      }
      
    }
    footer{
        width: 100%;
        text-align: center;
        color: #dee0e1;
        padding-bottom: 10px;
    }
    .nodata{
        width: 100%;
        height: 100vh;
        text-align: center;
        line-height: calc(100vh - 100px);
    }
}
</style>