<template>
  <div class="SingerClassifyList">
      <Back>{{$route.query.name}} - 热门歌手</Back>
      <template v-if="SingerClassifyList != ''">
        <ul>
            <li v-for="item in SingerClassifyList" :key="item.id" @click="ToSearch(item.name,item.id)">
                <img v-lazy="item.img1v1Url + '?imageView=1&type=webp&thumbnail=80x80'" alt="" class="photo">
                <div class="info">
                    <span>{{item.name}}</span>
                </div>
            </li>
        </ul>
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
export default {
    data(){
        return {
            SingerClassifyList:[],
        }
    },
    components:{
        Back
    },
    created() {
        this.axios.get("/artist/list?cat=" + this.$route.query.id).then((response)=>{
            this.SingerClassifyList = response.data.artists;
        })
    },
    methods:{
        ToSearch(name,id){
            this.$router.push({
                name:'Search',
                params:{
                    id,
                    name
                }
            })
        },
    },
}
</script>

<style lang="less">
.SingerClassifyList{
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
    ul{
        width: 100%;
        padding-left: 10px;
        padding-bottom: 10px;
        li{
            width: 100%;
            height: 85px;
            margin-top: 5px;
            display: flex;
            .photo{
                width: 80px;
                height: 80px;
                margin-right: 8px;
            }
            .info{
                flex: 1;
                border-bottom: 1px solid #e3e5e6;
                display: flex;
                align-items: center;
                span{
                    color: #313232;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>