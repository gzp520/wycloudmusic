<template>
  <div class="BroadCastDetail">
    <Back>电台</Back>
    <template v-if="info && program">
      <div class="cover">
        <div class="mask">
          <img :src="info.picUrl" alt="" />
          <span class="name">{{ info.name }}</span>
          <span class="sub">{{ info.subCount | FormatSubCount }}人已订阅</span>
          <div @click="sub">
            <span class="subscribe">订阅</span>
            <svg
              t="1612513256110"
              class="icon"
              viewBox="0 0 1057 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2367"
              width="20"
              height="20"
            >
              <path
                d="M810.677677 1023.735742c-11.726452 0-23.25471-2.906839-33.626838-8.456258L528.516129 883.117419l-248.567742 132.129033a71.646968 71.646968 0 0 1-97.28-30.554839c-7.366194-14.203871-9.909677-30.455742-7.234064-46.245161l47.434322-280.212646-201.100387-197.962322a73.496774 73.496774 0 0 1-1.222193-103.12671 71.812129 71.812129 0 0 1 41.158193-21.206709l278.032516-40.794839 124.168258-254.546581A71.448774 71.448774 0 0 1 528.284903 0a71.580903 71.580903 0 0 1 64.412903 40.596645l124.300388 254.744774 277.900387 40.794839c39.440516 5.549419 66.923355 42.413419 61.44 82.283355-2.213161 15.855484-9.51329 30.587871-20.810323 41.851871l-201.067355 198.193548 47.500387 280.245678c6.672516 39.770839-19.786323 77.493677-59.127742 84.232258-3.864774 0.693677-7.795613 1.024-11.759483 1.057032l-0.396388-0.264258zM83.406452 412.044387l195.418838 192.677161c16.978581 16.747355 24.708129 40.893935 20.678194 64.512L253.357419 941.089032l241.630968-128.462451a71.118452 71.118452 0 0 1 67.055484 0l241.564903 128.462451-46.146064-272.086709a73.496774 73.496774 0 0 1 20.678193-64.512l195.484903-192.412904-270.071741-39.704774a72.175484 72.175484 0 0 1-54.272-39.869935L528.516129 84.859871l-120.798968 247.609806a72.109419 72.109419 0 0 1-54.272 39.869936l-270.005677 39.704774z"
                :fill="subFlag? '#d33a31':'#ffffff'"
                p-id="2368"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="nav">
          <div class="title">
              <span>节目</span>
              <span>{{program.length}}</span>
          </div>
          <div class="author">
              <span>主播</span>
              <img :src="info.dj.avatarUrl" alt="">
              <span>{{info.dj.nickname}}</span>
          </div>
      </div>
      <div class="content">
        <div class="head">
          <span>{{program.length}}期</span>
          <div class="sort" @click="Reserve">
            <span :class="{icon:true,reverse:reverseFlag}">⬆</span>
            <span class="text">排序</span>
          </div>
        </div>
        <ul class="body">
          <ProgramItem v-for="(item,index) in program" @click.native="$store.state.play.currentList = program" :key="item.id" :item="item" :index="reverseFlag ? program.length - index : index+1"></ProgramItem>
        </ul>
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
import Back from "@/components/Back";
import ProgramItem from '@/components/ProgramItem'
export default {
  components: {
    Back,
    ProgramItem
  },
  data(){
      return {
          program:null,
          info:null,
          reverseFlag:true,
          subFlag:false,
      }
  },
  methods:{
    Reserve(){
      this.reverseFlag = !this.reverseFlag;
      this.program = this.program.reverse();
    },
    sub(){
      var id = this.$route.query.id;
      var result = this.$store.state.BroadSublist.some(item=>{
        return item.id == id;
      })
      if(result){
        this.subFlag = false;
        this.$store.state.BroadSublist = this.$store.state.BroadSublist.filter(item=>{
            return item.id != id;
        })
      }else{
        this.$store.state.BroadSublist.push({id});
        this.subFlag = true;
      }
      this.$store.commit("saveBroadSublist");
    }
  },
  created() {
    this.axios
      .get("/dj/program?limit=40&rid=" + this.$route.query.id)
      .then((response) => {
          this.program = response.data.programs
      });
      this.axios.get("/dj/detail?rid=" + this.$route.query.id).then(response =>{
          this.info = response.data.djRadio
      })

    this.$store.state.BroadSublist = JSON.parse(localStorage.getItem("BroadSublist")) || []
    this.subFlag = this.$store.state.BroadSublist.some(item=>{
      return item.id == this.$route.query.id;
    })
    
  },
  filters: {
    FormatSubCount(InitValue) {
      if (InitValue < 10 ** 4) {
        return InitValue;
      } else {
        return (InitValue / 10 ** 4).toFixed(1) + "万";
      }
    },
  },
};
</script>

<style lang="less">
.BroadCastDetail {
  width: 100%;
  // padding-top: 50px;
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
  .cover {
    width: 100%;
    .mask {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      .name {
        position: absolute;
        left: 15px;
        bottom: 35px;
        color: white;
        width: 60%;
        line-height: 22px;
        text-shadow: 1px 0 1px black;
      }
      .sub {
        position: absolute;
        color: #afafb1;
        left: 15px;
        bottom: 10px;
        font-size: 14px;
        text-shadow: 1px 0 1px black;
      }
      .subscribe {
        position: absolute;
        color: white;
        border: 1px solid white;
        padding: 8px 20px 8px 40px;
        border-radius: 20px;
        bottom: 25px;
        right: 20px;
      }
      .icon {
        position: absolute;
        bottom: 33px;
        right: 80px;
      }
    }
  }
  .nav{
      width: 100%;
      display: flex;
      border-top: 1px solid #eee;
      .title{
          flex: 1;
          height: 50px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 2px solid #d33a31;
          border-right: 1px solid #d33a31;
          span{
              &:first-child{
                  color: #d33c33;
              }
              &:nth-child(2){
                  color:#b2b3b3;
                  font-size: 14px;
                  margin-left: 5px;
              }
          }
      }
      .author{
          flex: 1;
          height: 50px;
          padding-left: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #ccc;
          img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 5px;
          }
          span{
              font-size: 14px;
              &:nth-child(1){
                  width: 20px;
                  margin-right: 5px;
              }
              &:nth-child(3){
                  margin-right: 5px;
              }
          }
      }
  }
  .content{
    width: 100%;
    .head{
      width: 100%;
      height: 30px;
      background-color: #e7e9e9;
      span{
        font-size: 14px;
        color: #5f6060;
        line-height: 30px;
        margin-left: 10px;
      }
      .sort{
        display: flex;
        float: right;
        margin-right: 10px;
        .icon{
          transform: scale(1.3);
        }
        .reverse{
          transform: rotateZ(180deg) scale(1.3);
        }
      }
    }
  }
}
</style>