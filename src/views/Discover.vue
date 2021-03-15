<template>
  <div class="Discover">
    <template v-if="banners && DataNewSongs && $store.state.RecommendSongList">
      <div class="swiper-container main-swiper-container" v-if="banners">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in banners" :key="item.bannerId">
            <img :src="item.pic" alt="" />
            <span>{{ item.typeTitle }}</span>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination main-swiper-pagination"></div>
      </div>
      <div class="Discover_nav">
        <ul>
          <li @click="ToNewSong">
            <div class="icon_box">
              <svg
                t="1611541822586"
                class="icon_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7059"
                width="30"
                height="30"
              >
                <path
                  d="M722.47696386 111.37204922h13.10878221c108.99436897 0 197.22089196 88.22652299 197.22089195 197.22089194v447.02420246c0 108.99436897-88.37381268 197.22089196-197.22089195 197.22089194H288.56154362c-108.99436897 0-197.22089196-88.37381268-197.22089195-197.22089194V308.59294116c0-108.99436897 88.37381268-197.22089196 197.22089195-197.22089194h13.10878221v-19.73681818c0-11.78317502 6.33345658-22.53532223 16.49644505-28.42690974 10.16298847-5.89158752 22.68261193-5.89158752 32.84560036 0s16.49644503 16.79102442 16.49644503 28.42690974V111.37204922h289.27694683v-19.73681818c0-11.78317502 6.33345658-22.53532223 16.49644504-28.42690974 10.16298847-5.89158752 22.68261193-5.89158752 32.84560036 0s16.49644503 16.79102442 16.49644504 28.42690974l-0.14728968 19.73681818z m0 65.69120073V196.80006812c0 11.78317502-6.33345658 22.53532223-16.49644504 28.42690975-10.16298847 5.89158752-22.68261193 5.89158752-32.84560038 0s-16.49644503-16.79102442-16.49644503-28.42690975v-19.73681817H367.50881627V196.80006812c0 11.78317502-6.33345658 22.53532223-16.49644503 28.42690975-10.16298847 5.89158752-22.68261193 5.89158752-32.84560036 0s-16.49644503-16.79102442-16.49644505-28.42690975v-19.73681817h-13.10878221c-72.6138161 0-131.52969119 58.91587511-131.52969121 131.52969121h709.93629518c0-72.6138161-58.91587511-131.52969119-131.52969121-131.52969121h-12.96149252zM545.87662819 440.12263236L380.61759849 653.10352091v52.58241854h163.34426377v72.46652641h52.58241854v-72.46652641h50.22578353v-44.03961666h-50.22578353V440.12263236H545.87662819z m-3.38766282 69.9626017h1.47289689v151.41379905h-118.27361931l116.80072242-151.41379905z m0 0z"
                  p-id="7060"
                  fill="#ffffff"
                ></path>
                <path
                  d="M304.64405009 383.29630697h454.03802827v477.27619506H304.64405009z"
                  p-id="7061"
                  fill="#ffffff"
                ></path>
              </svg>
              <span class="icon_time">{{ RecommendTime }}</span>
            </div>
            <span class="text">每日推荐</span>
          </li>
          <!-- <li>
            <div class="icon_box">
              <svg
                t="1611542600850"
                class="icon_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8229"
                width="30"
                height="30"
              >
                <path
                  d="M833.39330732 212.09423558a128.56555107 128.56555107 0 0 1 128.56555195 128.56555108V790.76778227a128.56555107 128.56555107 0 0 1-128.56555195 128.56555107H190.56555107a128.56555107 128.56555107 0 0 1-128.56555107-128.56555107V340.65978666a128.56555107 128.56555107 0 0 1 128.56555107-128.56555108h642.82775625z m0 64.28277598H190.56555107a64.28277598 64.28277598 0 0 0-64.28277509 64.2827751V790.76778227a64.28277598 64.28277598 0 0 0 64.28277509 64.28277509h642.82775625a64.28277598 64.28277598 0 0 0 64.28277598-64.28277509V340.65978666a64.28277598 64.28277598 0 0 0-64.28277598-64.2827751z m-546.40359228 129.20837871h128.56555108a32.14138799 32.14138799 0 0 1 32.14138799 32.14138799v0.12856553a32.14138799 32.14138799 0 0 1-32.14138799 32.14138799h-128.56555108a32.14138799 32.14138799 0 0 1-32.14138799-32.14138799V437.85534379a32.14138799 32.14138799 0 0 1 32.14138799-32.14138799z m0 128.82268213h128.56555108a32.14138799 32.14138799 0 0 1 32.14138799 32.14138799v0.06428321a32.14138799 32.14138799 0 0 1-32.14138799 32.14138799h-128.56555108a32.14138799 32.14138799 0 0 1-32.14138799-32.14138799v-0.06428321a32.14138799 32.14138799 0 0 1 32.14138799-32.14138799z m128.56555108 128.75839981a32.14138799 32.14138799 0 0 1 32.14138799 32.14138798v0.06428321a32.14138799 32.14138799 0 0 1-32.14138799 32.14138711h-128.56555108a32.14138799 32.14138799 0 0 1-32.14138799-32.14138711v-0.06428321a32.14138799 32.14138799 0 0 1 32.14138799-32.14138798h128.56555108z m257.13110214-265.23073213c88.71023057 0 160.70693906 71.99670849 160.70693906 160.89978779a160.83550459 160.83550459 0 0 1-160.70693906 160.96407012c-88.71023057 0-160.70693906-72.0609917-160.70693906-160.96407012A160.83550459 160.83550459 0 0 1 672.68636826 398.00002328z m0 64.3470583A96.48844628 96.48844628 0 1 0 769.11053223 558.83552787c0-53.35470352-43.1980251-96.55272862-96.42416397-96.55272949z m40.62671455-431.59455527l3.34270459 4.75692539 96.29559757 167.00665078a32.14138799 32.14138799 0 0 1-52.3261793 36.9625957l-3.3427046-4.69264219v-0.0642832L660.98690352 67.65083881a32.14138799 32.14138799 0 0 1 52.32617929-36.9625957z"
                  fill="#ffffff"
                  p-id="8230"
                  data-spm-anchor-id="a313x.7781069.0.i16"
                  class="selected"
                ></path>
              </svg>
            </div>
            <span class="text">私人FM</span>
          </li> -->
          <li @click="ToPlayList">
            <div class="icon_box">
              <svg
                t="1611542734453"
                class="icon_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12938"
                data-spm-anchor-id="a313x.7781069.0.i22"
                width="55"
                height="55"
              >
                <path
                  d="M387.878788 263.757576h263.757576c64.263758 0 116.363636 52.099879 116.363636 116.363636v263.757576c0 64.263758-52.099879 116.363636-116.363636 116.363636H387.878788c-64.263758 0-116.363636-52.099879-116.363636-116.363636V380.121212c0-64.263758 52.099879-116.363636 116.363636-116.363636z m248.242424 139.636363l39.408485 45.971394A10.162424 10.162424 0 0 0 690.424242 449.939394a12.838788 12.838788 0 0 0 1.303273-16.632242L636.121212 356.848485h-23.272727v197.818182a58.181818 58.181818 0 1 0 23.148606 50.424242H636.121212V403.393939z m-252.121212-23.272727a19.393939 19.393939 0 1 0 0 38.787879h162.909091a19.393939 19.393939 0 1 0 0-38.787879h-162.909091z m0 100.848485a19.393939 19.393939 0 1 0 0 38.787879h131.878788a19.393939 19.393939 0 1 0 0-38.787879h-131.878788z m0 100.848485a19.393939 19.393939 0 1 0 0 38.787879h85.333333a19.393939 19.393939 0 1 0 0-38.787879h-85.333333z"
                  p-id="12939"
                  data-spm-anchor-id="a313x.7781069.0.i21"
                  class=""
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
            <span class="text">歌单</span>
          </li>
          <li @click="ToRanking">
            <div class="icon_box">
              <svg
                t="1611542875514"
                class="icon_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="14443"
                width="28"
                height="28"
              >
                <path
                  d="M271.504 916.064c0 56.56-45.856 102.368-102.416 102.368l0 0c-56.544 0-102.368-45.808-102.368-102.368L66.72 399.568c0-56.544 45.84-102.384 102.368-102.384l0 0c56.56 0 102.416 45.84 102.416 102.384L271.504 916.064z"
                  p-id="14444"
                  fill="#ffffff"
                ></path>
                <path
                  d="M977.088 916.56c0 56.56-45.856 102.4-102.4 102.4l0 0c-56.56 0-102.384-45.84-102.384-102.4L772.304 602.688c0-56.528 45.824-102.4 102.384-102.4l0 0c56.544 0 102.4 45.872 102.4 102.4L977.088 916.56z"
                  p-id="14445"
                  fill="#ffffff"
                ></path>
                <path
                  d="M624.304 916.56c0 56.56-45.872 102.4-102.416 102.4l0 0c-56.544 0-102.384-45.84-102.384-102.4L419.504 107.392c0-56.544 45.84-102.384 102.384-102.384l0 0c56.544 0 102.416 45.84 102.416 102.384L624.304 916.56z"
                  p-id="14446"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
            <span class="text">排行榜</span>
          </li>
          <li @click="ToSinger">
            <div class="icon_box">
              <svg
                t="1611542998485"
                class="icon_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="15718"
                width="28"
                height="28"
              >
                <path
                  d="M347.682133 1024H255.044267C131.140267 1024 68.266667 966.656 68.266667 853.674667v-58.094934c0-88.746667 127.249067-204.049067 235.2128-263.850666-51.234133-61.44-83.694933-152.610133-83.694934-241.902934C219.784533 121.856 342.664533 0 512 0c169.301333 0 292.181333 121.856 292.181333 289.792 0 89.326933-32.426667 180.497067-83.694933 241.902933C828.484267 591.530667 955.733333 706.798933 955.733333 795.579733v58.094934c0 112.981333-62.8736 170.325333-186.811733 170.325333h-114.210133a33.1776 33.1776 0 0 1-32.9728-33.416533c0-18.432 14.779733-33.3824 32.9728-33.3824h114.210133c100.352 0 120.900267-41.403733 120.900267-103.5264v-58.094934c0-56.7296-127.044267-175.991467-238.4896-223.914666l-51.234134-22.016 43.690667-34.9184c54.784-43.793067 94.5152-138.376533 94.5152-224.938667 0-131.310933-93.047467-222.993067-226.304-222.993067S285.696 158.481067 285.696 289.792c0 86.493867 39.7312 181.077333 94.549333 224.904533l43.656534 34.9184-51.2 22.016c-111.479467 47.9232-238.523733 167.185067-238.523734 223.914667v58.094933c0 62.122667 20.5824 103.5264 120.900267 103.5264h92.603733c18.193067 0 32.9728 14.984533 32.9728 33.416534S365.8752 1024 347.682133 1024z m153.326934-155.818667c18.193067 0 32.9728 14.9504 32.9728 33.3824v89.053867c0 18.432-14.779733 33.3824-32.9728 33.3824a33.1776 33.1776 0 0 1-32.938667-33.3824v-89.053867c0-18.432 14.7456-33.3824 32.938667-33.3824z"
                  fill="#ffffff"
                  p-id="15719"
                  data-spm-anchor-id="a313x.7781069.0.i34"
                  class="selected"
                ></path>
                <path
                  d="M501.009067 623.274667c-54.613333 0-98.850133 44.885333-98.850134 100.215466v111.274667c0 55.330133 44.270933 100.181333 98.850134 100.181333 54.613333 0 98.884267-44.8512 98.884266-100.1472v-111.3088c0-55.330133-44.270933-100.181333-98.884266-100.181333m0 66.7648c18.193067 0 32.9728 15.018667 32.9728 33.416533v111.274667c0 18.432-14.779733 33.416533-32.9728 33.416533a33.211733 33.211733 0 0 1-32.938667-33.3824v-111.3088c0-18.432 14.779733-33.416533 32.938667-33.416533"
                  fill="#ffffff"
                  p-id="15720"
                  data-spm-anchor-id="a313x.7781069.0.i33"
                  class="selected"
                ></path>
              </svg>
            </div>
            <span class="text">全部歌手</span>
          </li>
        </ul>
      </div>
      <div class="Discover_RecommendSongList">
        <ModuleTitle>
          <template #main>
            <span class="tuijian">推荐歌单</span>
          </template>
          <template #sub>
            <span @click="ToPlaza" class="gedan">歌单广场</span>
          </template>
        </ModuleTitle>
        <RecommendList></RecommendList>
      </div>
      <div class="Discover_NewSong">
        <ModuleTitle>
          <template #main>
            <span>新歌</span>
          </template>
          <template #sub>
            <span @click="ToNewSong">新歌推荐</span>
          </template>
        </ModuleTitle>
        <div class="swiper-container song-swiper-container" v-if="DataNewSongs">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in DataNewSongs" :key="item.id" @click="play(item.id);$store.state.play.currentList = DataNewSongs">
              <img v-lazy="item.picUrl" alt="">
              <p class="name">{{item.name}}</p>
              <p class="artists">{{item.song.artists | FormatArtists}}</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        —— 我也是有底线的 ——
      </footer>
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
import Swiper from "swiper/swiper-bundle";
import "swiper/swiper-bundle.min.css";
import ModuleTitle from '../components/ModuleTitle'
import RecommendList from '../components/RecommendList'
export default {
  components: {
    ModuleTitle,
    RecommendList
  },
  data() {
    return {
      banners: null,
      RecommendTime: null,
      DataNewSongs:null,
    };
  },
  methods:{
    ToPlaza(){
      this.$router.push({
        path:'/SongListPlaza'
      })
    },
    ToNewSong(){
      this.$router.push({
        path:'/NewSongs'
      })
    },
    ToPlayList(){
      this.$router.push({
        path:'/SongListPlaza'
      })
    },
    ToRanking(){
      this.$router.push({
        path:'/RankingList'
      })
    },
    ToSinger(){
      this.$router.push({
        path:'/Search/SingerClassify'
      })
    },
    play(id){
        this.axios.get("/song/detail?ids=" + id).then(response=>{
            this.$store.state.play.currentMusic = response.data.songs[0]
        }).then(()=>{
        this.axios.get("/lyric?id=" + id).then(response=>{
            if(!response.data.lrc){
              this.$store.state.play.lyric = [{text:'暂无歌词'}]
              return;
            }
            this.lyricStr = response.data.lrc.lyric;
            var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
            this.lyricStr = this.lyricStr
            .split("\n")
            .filter(e=>e)
            .map(str=>{
                var time = str.match(patt)[0].replace(/(\[|\])/gi,"");
                var timeArr = time.split(":");
                time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
                var text = str.replace(patt,"");
                return {time,text};
            })
            this.$store.state.play.lyric = this.lyricStr
        });
      });
    }
  },
  created() {
    this.banners = this.$store.state.banners;
    this.DataNewSongs = this.$store.state.NewMusicList.RecommendList.slice(0,6)
    this.RecommendTime = new Date().getDate().toString().padStart(2, "0");
  },
  watch: {
    banners() {
      setTimeout(() => {
        new Swiper(".main-swiper-container", {
          loop: true,
          pagination: {
            el: ".main-swiper-pagination",
          },
          autoplay: true,
        });
      }, 500);
    },
    DataNewSongs(){
      setTimeout(()=>{
        new Swiper('.song-swiper-container', {
          slidesPerView: 3,
          spaceBetween: 10,
        });
      },0)
    }
  },
  filters:{
    FormatArtists(InitValue){
      var result = '';
      for(var i=0;i<InitValue.length;i++){
        result += InitValue[i].name + "/";
      }
      return result.slice(0,result.length-1);
    }
  }
};
</script>

<style lang="less">
.Discover {
  padding-top: 100px;
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
  .main-swiper-container{
    width: 100%;
    .swiper-wrapper {
      .swiper-slide {
        span {
          position: absolute;
          right: 0;
          bottom: 5px;
          color: white;
          padding: 6px 10px 6px 15px;
          background-color: #d44a42;
          border-radius: 20px 0 0 20px;
          font-size: 14px;
        }
        img {
          vertical-align: middle;
        }
      }
    }
    .swiper-pagination-bullet {
      background-color: rgba(255, 255, 255, 1);
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background-color: #cc5249;
    }
  }
  .Discover_nav {
    ul {
      width: 100%;
      height: 120px;
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon_box {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #ff4538;
          margin-bottom: 10px;
          display: flex;
          position: relative;
          .icon_icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .icon_time {
            position: absolute;
            color: #ff5a4c;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -5px);
            font-weight: bold;
            font-size: 14px;
          }
        }
        .text {
          font-size: 14px;
          color: #404040;
        }
      }
    }
  }
  .Discover_RecommendSongList{
    width: 100%;
    .tuijian{
      margin-left: 10px;
    }
    .gedan{
      
    }
  }
  .Discover_NewSong{
    width: 100%;
    padding: 0 15px 20px;
    .song-swiper-container{
      background-color: #fff;
      .swiper-wrapper{
        .swiper-slide{
          img{
            width: 100%;
            border-radius: 8px;
          }
          p{
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .name{
            margin-top: 5px;
          }
          .artists{
            margin-top: 3px;
            color: #828282;
          }
        }
      }
    }
  }
  footer{
    width: 100%;
    text-align: center;
    color: #dee0e1;
    padding-bottom: 10px;
  }
}
</style>