<template>
  <div class="detail">
    <img :src="currentMusic.al.picUrl + `?imageView=1&type=webp&thumbnail=${picSize}x${picSize}`" alt="" class="bg" />
    <div class="head">
      <svg
        t="1611317403852"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6017"
        width="30"
        height="30"
        @click="back"
      >
        <path
          d="M475.9 193.8L182.7 487H937v50H182.7l293.2 293.2-35.4 35.4L87 512l353.6-353.6 35.3 35.4z"
          fill="#ffffff"
          p-id="6018"
        ></path>
      </svg>
      <div class="title">
        <p>{{ currentMusic.name }}</p>
        <p v-if="currentMusic.ar">{{ currentMusic.ar | FormatAr }}</p>
      </div>
      <svg
        t="1614078696006"
        class="xin_icon"
        viewBox="0 0 1169 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3747"
        width="30"
        height="30"
        @click="addlike"
      >
        <path
          d="M1045.333 117.333C919.467-6.4 716.8-10.667 584.533 106.667 452.267-10.667 249.6-6.4 123.733 117.333c-128 128-130.133 337.067-2.133 467.2l4.267 4.267 384 384c40.533 40.533 106.666 42.667 149.333 2.133l2.133-2.133 384-384c128-128 130.134-337.067 4.267-465.067-2.133-4.266-2.133-4.266-4.267-6.4z"
          p-id="3748"
          :fill="like ? '#d33a31' : '#999999'"
        ></path>
      </svg>
    </div>
    <lyric></lyric>
    <div class="controller">
      <div class="progress">
        <span>{{ time.currentTime | FormatTime }}</span>
        <div @click="setprogress" ref="progressBox">
          <div ref="progress"></div>
        </div>
        <span>{{ time.totalTime | FormatTime }}</span>
      </div>
      <div class="toggle">
        <svg
          t="1613891538400"
          class="icon"
          viewBox="0 0 1146 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5263"
          width="25"
          height="25"
          v-if="playmodel"
          @click="modelToggle"
        >
          <path
            d="M1130.61809 259.901795 954.01552 437.13724C935.722387 455.490647 906.067621 455.490647 887.774488 437.13724 869.511492 418.783833 869.511492 389.00852 887.774488 370.655113L987.527816 270.540141 45.205436 270.540141C20.252035 270.540141 0 250.318242 0 225.364842 0 200.381304 20.252035 180.159406 45.205436 180.159406L987.527816 180.159406 887.774488 80.044434C869.511492 61.691027 869.511492 31.94585 887.774488 13.562306 906.067621-4.791101 935.722387-4.791101 954.01552 13.562306L1130.61809 190.827889C1132.667403 192.877202 1133.631785 195.46898 1135.229044 197.759389 1136.494796 199.356647 1137.519453 201.074454 1138.574246 202.822398 1139.478355 204.600478 1140.563286 206.197737 1141.226299 208.036091 1143.546844 213.40047 1145.204377 219.096354 1145.204377 225.364842 1145.204377 232.025109 1143.576981 238.233322 1140.985203 243.929207 1138.724931 249.74564 1135.319455 255.200429 1130.61809 259.901795ZM45.205436 752.761594 987.527816 752.761594 887.774488 652.646622C869.511492 634.293215 869.511492 604.517901 887.774488 586.194631 906.067621 567.841224 935.722387 567.841224 954.01552 586.194631L1130.61809 763.430077C1132.667403 765.47939 1133.631785 768.071168 1135.229044 770.361577 1136.494796 771.958836 1137.489316 773.676642 1138.544109 775.424586 1139.448218 777.17253 1140.563286 778.799925 1141.226299 780.63828 1143.546844 786.002658 1145.204377 791.698543 1145.204377 797.96703 1145.204377 804.627298 1143.576981 810.835511 1140.985203 816.531396 1138.694794 822.347828 1135.319455 827.802618 1130.61809 832.503983L954.01552 1009.739429C935.722387 1028.092836 906.067621 1028.092836 887.774488 1009.739429 869.511492 991.386022 869.511492 961.640845 887.774488 943.257301L987.527816 843.172466 45.205436 843.172466C20.252035 843.172466 0 822.920431 0 797.96703 0 772.983492 20.252035 752.761594 45.205436 752.761594Z"
            p-id="5264"
            fill="#fff"
          ></path>
        </svg>
        <svg
          t="1614141787800"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2188"
          width="25"
          height="25"
          v-else
          @click="modelToggle"
        >
          <path
            d="M430.506667 533.333333c4.693333-11.733333 9.173333-23.466667 12.8-35.84a53.12 53.12 0 0 1 2.346666-6.186666A309.333333 309.333333 0 0 1 725.333333 280.746667v66.56a30.506667 30.506667 0 0 0 48.213334 25.173333l130.773333-91.306667a30.72 30.72 0 0 0 0-50.346666l-130.773333-91.306667A30.506667 30.506667 0 0 0 725.333333 164.693333v52.053334a372.053333 372.053333 0 0 0-303.573333 176c-3.413333 5.546667-6.613333 11.306667-9.813333 16.853333a322.56 322.56 0 0 0-16.853334 34.56l-1.92 4.693333a336.426667 336.426667 0 0 0-12.8 35.626667A309.973333 309.973333 0 0 1 114.133333 700.373333a32 32 0 0 0 5.973334 64 372.693333 372.693333 0 0 0 282.24-174.933333c3.413333-5.546667 6.4-11.093333 9.6-16.64a346.453333 346.453333 0 0 0 16.64-34.773333z"
            p-id="2189"
            fill="#ffffff"
          ></path>
          <path
            d="M114.133333 281.6a309.546667 309.546667 0 0 1 251.733334 178.773333 379.306667 379.306667 0 0 1 33.706666-71.68 372.906667 372.906667 0 0 0-279.466666-170.666666A32 32 0 0 0 85.333333 250.026667a31.786667 31.786667 0 0 0 28.8 31.573333zM904.106667 700.16l-130.56-91.306667A30.506667 30.506667 0 0 0 725.333333 634.026667v67.2a309.546667 309.546667 0 0 1-267.52-179.626667 411.946667 411.946667 0 0 1-33.28 71.68A372.266667 372.266667 0 0 0 725.333333 765.226667v51.413333a30.506667 30.506667 0 0 0 48.213334 25.173333l130.773333-91.306666a30.72 30.72 0 0 0-0.213333-50.346667z"
            p-id="2190"
            fill="#ffffff"
          ></path>
        </svg>
        <svg
          t="1613983870016"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11957"
          width="25"
          height="25"
          @click="preToggle(currentMusic.id)"
        >
          <path
            d="M131.3 96.9v827.6c0 17.7 14.4 32.1 32.1 32.1s32.1-14.4 32.1-32.1V96.9c0-17.7-14.4-32.1-32.1-32.1s-32.1 14.3-32.1 32.1z m647.6 41.4L373.5 470.2c-27.4 22.5-27.5 59 0 81.5l405.3 331.9c27.4 22.5 49.8 12 49.8-23.4V161.8c0-35.8-22.2-46-49.7-23.5z m-40.7-49.6c69.3-56.7 154.6-16.9 154.6 73.1v698.5c0 89.7-85.3 129.8-154.6 73.1l-405.3-332c-58.8-48.2-58.8-132.7 0-180.8L738.2 88.7z"
            p-id="11958"
            fill="#fff"
          ></path>
        </svg>
        <template>
          <svg
            t="1613984126916"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4924"
            width="60"
            height="60"
            v-if="!icon_state"
            @click="playToggle"
          >
            <path
              d="M512 56.888889A455.111111 455.111111 0 1 1 56.888889 512 455.623111 455.623111 0 0 1 512 56.888889m0-45.511111a500.622222 500.622222 0 1 0 500.622222 500.622222A500.622222 500.622222 0 0 0 512 11.377778zM398.222222 307.2a22.823822 22.823822 0 0 0-22.755555 22.755556v364.088888a22.755556 22.755556 0 0 0 45.511111 0V329.955556a22.823822 22.823822 0 0 0-22.755556-22.755556z m1.672534 22.755556l315.278222 182.044444-315.369245-182.044444h0.079645m0-22.755556a22.755556 22.755556 0 0 0-19.774578 11.377778 22.823822 22.823822 0 0 0 8.328533 31.084089l315.312356 182.044444a22.573511 22.573511 0 0 0 11.309511 3.026489 22.755556 22.755556 0 0 0 19.774578-11.377778 22.823822 22.823822 0 0 0-8.328534-31.084089l-315.312355-182.044444a22.573511 22.573511 0 0 0-11.275378-3.026489z m315.164444 182.044444a22.573511 22.573511 0 0 0-11.309511 3.026489l-315.312355 182.044445A22.823822 22.823822 0 0 0 380.154311 705.422222a22.755556 22.755556 0 0 0 19.774578 11.377778 22.573511 22.573511 0 0 0 11.309511-3.026489l315.312356-182.044444A22.823822 22.823822 0 0 0 734.867911 500.622222a22.755556 22.755556 0 0 0-19.774578-11.377778z"
              fill="#fff"
              p-id="4925"
            ></path>
          </svg>
          <svg
            t="1613984688185"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7877"
            width="60"
            height="60"
            v-else
            @click="playToggle"
          >
            <path
              d="M512 8.858C234.496 8.858 8.858 234.496 8.858 512S234.548 1015.142 512 1015.142c277.504 0 503.142-225.69 503.142-503.142C1015.142 234.496 789.504 8.858 512 8.858z m0 937.984A434.79 434.79 0 0 1 77.158 512 434.79 434.79 0 0 1 512 77.158 434.79 434.79 0 0 1 946.842 512 434.79 434.79 0 0 1 512 946.842zM408.474 304.947a45.978 45.978 0 0 0-45.568 45.568v320.922c0 24.832 20.736 45.568 45.568 45.568s45.568-20.736 45.568-45.568V350.515a45.978 45.978 0 0 0-45.568-45.568z m207.052 0a45.978 45.978 0 0 0-45.568 45.568v320.922c0 24.832 20.736 45.568 45.568 45.568s45.568-20.736 45.568-45.568V350.515a45.978 45.978 0 0 0-45.568-45.568z"
              p-id="7878"
              fill="#fff"
            ></path>
          </svg>
        </template>
        <svg
          t="1613984063868"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4066"
          width="29"
          height="29"
          @click="nextToggle(currentMusic.id)"
        >
          <path
            d="M843.875 914.666l0-725.624c0-15.53200001-12.593-28.12500001-28.125-28.12499999s-28.12500001 12.593-28.125 28.12499999l0 725.624c0 15.53200001 12.593 28.12500001 28.125 28.125s28.12500001-12.593 28.125-28.125v0z"
            p-id="4067"
            fill="#fff"
          ></path>
          <path
            d="M276.077 878.284v0l355.388-290.997c24.067-19.706 24.112-51.756 0-71.498l-355.388-290.997c-24.067-19.706-43.66-10.55-43.66 20.536l0 612.421c0 31.329 19.54799999 40.28 43.66 20.536v0zM311.713 921.805v0c-60.75 49.743-135.547 14.85-135.547-64.058l0-612.421c0-78.646 74.83000001-113.772 135.547-64.057l355.388 290.99700001c51.592 42.244 51.559 116.326 0 158.54199999l-355.388 290.997z"
            p-id="4068"
            fill="#fff"
          ></path>
        </svg>
        <svg
          t="1612967183393"
          class="list_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2199"
          width="30"
          height="30"
          @click="listToggle"
        >
          <path
            d="M994.78186667 215.99573333c-49.152-56.06968853-111.77528853-99.9424-180.95217814-126.70293333a36.29966187 36.29966187 0 0 0-49.51608853 33.86026667v448.37546666a189.8723552 189.8723552 0 0 0-118.32888853-41.32408853c-105.40373333 0-191.14666667 85.74293333-191.14666667 191.14666667S540.58097813 912.49777813 645.98471147 912.49777813s191.14666667-85.74293333 191.14666666-191.14666666c0-2.00248853-0.1820448-4.00497813-0.3640896-6.00746667 0-1.09226667 0.36408853-2.00248853 0.3640896-3.09475627V180.49706667c38.59342187 21.66328853 73.728 50.06222187 103.0371552 83.3763552 13.2892448 15.10968853 36.40888853 16.5660448 51.33653334 3.2768 15.10968853-13.1072 16.5660448-36.0448 3.2768-51.15448854zM645.98471147 839.68c-65.17191147 0-118.32888853-53.15697813-118.3288896-118.32888853s53.15697813-118.32888853 118.3288896-118.3288896 118.32888853 53.15697813 118.32888853 118.3288896-53.15697813 118.32888853-118.32888853 118.32888853zM163.56693333 293.54666667h418.70222187c20.02488853 0 36.40888853-16.384 36.4088896-36.40888854s-16.384-36.40888853-36.4088896-36.4088896h-418.70222187a36.40888853 36.40888853 0 1 0 0 72.81777814zM418.4291552 457.38666667h-254.86222187c-20.02488853 0-36.40888853 16.384-36.40888853 36.40888853s16.384 36.40888853 36.40888853 36.4088896h254.86222187c20.02488853 0 36.40888853-16.384 36.4088896-36.4088896s-16.384-36.40888853-36.4088896-36.40888853zM309.20248853 694.0444448h-145.6355552c-20.02488853 0-36.40888853 16.384-36.40888853 36.40888853s16.384 36.40888853 36.40888853 36.40888854h145.6355552c20.02488853 0 36.40888853-16.384 36.4088896-36.40888854s-16.384-36.40888853-36.4088896-36.40888853z"
            p-id="2200"
            fill="#fff"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import lyric from "@/components/lyric";
export default {
  components: {
    lyric,
  },
  data() {
    return {
      like: false,
      picSize:null,
    };
  },
  computed: {
    ...mapState({
      currentMusic: (state) => state.play.currentMusic,
      currentList: (state) => state.play.currentList,
      detail_state: (state) => state.play.detail_state,
      icon_state: (state) => state.play.icon_state,
      List_state: (state) => state.play.List_state,
      time: (state) => state.play.time,
      likeList: (state) => state.likeList,
      playmodel: (state) => state.playmodel,
      randomNum: (state) => state.randomNum,
    }),
  },
  methods: {
    back() {
      this.$store.state.play.detail_state = false;
    },
    setprogress(e) {
      this.$refs.progress.style.width = e.offsetX + "px";
      this.$emit(
        "setprogress",
        (e.offsetX * this.time.totalTime) / this.$refs.progressBox.offsetWidth
      );
    },
    playToggle() {
      this.$store.state.play.icon_state = !this.icon_state;
    },
    listToggle() {
      this.$store.state.play.List_state = !this.List_state;
    },
    nextToggle(id) {
      var index = this.currentList.findIndex((item) => {
        return item.mainSong ? item.mainSong.id == id : item.id == id;
      });
      if(this.playmodel){
        var curIndex = index + 1;
        this.$store.commit("random",index);
      }else{
        this.$store.commit("random",index);
        curIndex = this.randomNum;
      }
      if (curIndex >= this.currentList.length) {
        curIndex = 0;
      }
      this.axios.get("/song/detail?ids=" + this.currentList[curIndex].id).then((response) => {
            if(this.currentList[curIndex].mainSong){
              this.$store.state.play.currentMusic = {
                id:this.currentList[curIndex].mainSong.id,
                al:{
                  name:this.currentList[curIndex].name,
                  picUrl:this.currentList[curIndex].dj.avatarUrl,
                },
                dj:this.currentList[curIndex].dj,
                name:this.currentList[curIndex].name,
                mainSong:this.currentList[curIndex].mainSong,
              }
              return;
            }
            this.$store.state.play.currentMusic = response.data.songs[0];
        }).then(()=>{
            this.axios.get("/lyric?id=" + this.currentList[curIndex].id).then(response=>{
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
                if(this.currentMusic.id == this.currentList[curIndex].id){
                  this.$store.state.play.lyric = this.lyricStr
                }
            });
        });
    },
    preToggle(id) {
      var index = this.currentList.findIndex((item) => {
        return item.mainSong ? item.mainSong.id == id : item.id == id;
      });
      if(this.playmodel){
        var curIndex = index - 1;
        this.$store.commit("random",index);
      }else{
        this.$store.commit("random",index);
        curIndex = this.randomNum;
      }
      if (curIndex < 0) {
        curIndex = this.currentList.length - 1;
      }
      this.axios
        .get("/song/detail?ids=" + this.currentList[curIndex].id)
        .then((response) => {
          if (this.currentList[curIndex].mainSong) {
            this.$store.state.play.currentMusic = {
              id: this.currentList[curIndex].mainSong.id,
              al: {
                name: this.currentList[curIndex].name,
                picUrl: this.currentList[curIndex].dj.avatarUrl,
              },
                dj:this.currentList[curIndex].dj,
              name: this.currentList[curIndex].name,
              mainSong:this.currentList[curIndex].mainSong,
            };
            return;
          }
          this.$store.state.play.currentMusic = response.data.songs[0];
        })
        .then(() => {
          this.axios
            .get("/lyric?id=" + this.currentList[curIndex].id)
            .then((response) => {
              if (!response.data.lrc) {
                this.$store.state.play.lyric = [{ text: "暂无歌词" }];
                return;
              }
              this.lyricStr = response.data.lrc.lyric;
              var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
              this.lyricStr = this.lyricStr
                .split("\n")
                .filter((e) => e)
                .map((str) => {
                  var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
                  var timeArr = time.split(":");
                  time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
                  var text = str.replace(patt, "");
                  return { time, text };
                });
              this.$store.state.play.lyric = this.lyricStr;
            });
        });
    },
    addlike() {
      this.like = !this.like;
      if (this.like) {
        this.$store.state.likeList.unshift(this.currentMusic);
      } else {
        this.$store.state.likeList = this.likeList.filter((item) => {
          return item.id != this.currentMusic.id;
        });
      }
      this.$store.commit("norepeat");
    },
    judgexin() {
      for (var i = 0; i < this.likeList.length; i++) {
        if (this.likeList[i].id == this.currentMusic.id) {
          this.like = true;
          break;
        } else {
          this.like = false;
        }
      }
    },
    modelToggle() {
      this.$store.commit("modelToggle");
    },
  },
  watch: {
    "time.currentTime"(n) {
      this.$refs.progress.style.width = (n / this.time.totalTime) * 100 + "%";
    },
    currentMusic() {
      this.judgexin();
    },
  },
  filters: {
    FormatAr(InitValue) {
      var result = "";
      for (var i = 0; i < InitValue.length; i++) {
        result += InitValue[i].name + "/";
      }
      return result.slice(0, result.length - 1);
    },
    FormatTime(InitValue) {
      if(!InitValue) return '00:00';
      var m = (InitValue / 60).toString().split(".")[0].padStart(2, 0);
      var s = (InitValue % 60).toString().split(".")[0].padStart(2, 0);
      return m + ":" + s;
    },
  },
  mounted() {
    this.$refs.progress.style.width =
      (this.time.currentTime / this.time.totalTime) * 100 + "%";
    this.judgexin();
  },
  created(){
    this.picSize = window.innerHeight;
    this.$store.state.likeList = JSON.parse(localStorage.getItem("likelist")) || [];
  }
};
</script>

<style lang="less">
.detail {
  position: fixed;
  top: 0;
  left: 0;
  // transform: translateX(-50%);
  z-index: 999;
  width: 100vw;
  height: 100vh;
  max-width: 1080px;
  background-color: #414339;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    filter: brightness(20%) blur(10px);
  }
  .head {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    .title {
      width: 70%;
      height: 40px;
      color: white;
      margin-top: 8px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:nth-child(1) {
          font-weight: bold;
          font-size: 18px;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .xin_icon {
      position: absolute;
      right: 10px;
    }
  }
  .controller {
    width: 100%;
    height: 25vh;
    position: relative;
    z-index: 1;
    overflow: hidden;
    .progress {
      width: 100%;
      height: 15px;
      padding: 0 15px;
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
      > div {
        width: 70%;
        height: 2px;
        background-color: #7d7e82;
        border-radius: 4px;
        div {
          width: 0;
          height: 2px;
          background-color: red;
        }
      }
    }
    .toggle {
      width: 100%;
      height: 50px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>