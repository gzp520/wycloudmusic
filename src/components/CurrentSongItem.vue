<template>
  <li class="CurrentSongItem" @click="play(item.mainSong ? item.mainSong.id:item.id)">
    <svg
      t="1613893319091"
      class="play_icon"
      viewBox="0 0 1059 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6912"
      width="20"
      height="20"
      v-if="currentMusic ? currentMusic.id == item.id || (item.mainSong ? currentMusic.id == item.mainSong.id : false) : false"
    >
      <path
        d="M648.490101 1013.692421 648.490101 943.34831C844.095194 897.066596 989.80068 721.769482 989.80068 512 989.80068 302.264649 844.095194 126.967535 648.490101 80.65169L648.490101 34.165189 648.490101 10.341711C882.151323 57.783881 1058.062796 264.345044 1058.062796 512 1058.062796 759.689087 882.151323 966.25025 648.490101 1013.692421ZM68.262116 716.786348C30.547297 716.786348 0 686.239051 0 648.524232L0 375.475768C0 337.79508 30.547297 307.213652 68.262116 307.213652L238.917406 307.213652 546.096927 0.034131 546.096927 1023.965869 238.917406 716.786348 68.262116 716.786348ZM477.834811 853.34471 477.834811 170.723552 273.048463 375.509899 68.262116 375.509899 68.262116 648.558363 273.048463 648.558363 477.834811 853.34471ZM819.14539 494.934471C819.14539 612.550097 749.040197 713.543897 648.490101 759.108859L648.490101 681.392441C709.926005 641.936938 750.883274 573.401773 750.883274 494.934471 750.883274 416.5013 709.926005 347.966136 648.490101 308.510633L648.490101 230.794214C749.040197 276.359176 819.14539 377.352976 819.14539 494.934471Z"
        fill="#ff0000"
        p-id="6913"
      ></path>
    </svg>
    <div class="info">
      <p class="text">
        <font
          :class="{ color: currentMusic ? currentMusic.id == item.id || (item.mainSong ? currentMusic.id == item.mainSong.id : false) : false }"
          >{{ item.name }}</font
        >
        <font
          :class="{ color: currentMusic ? currentMusic.id == item.id : false }"
          v-if="item.ar || item.song"
        >
          - {{ item.ar || item.song.artists | FormatAr }}</font
        >
      </p>
      <svg
        t="1613894074417"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7670"
        width="25"
        height="25"
        @click.stop="del(item.id)"
      >
        <path
          d="M557.44 512L784 285.44c12.8-12.8 12.8-32.64 0-45.44-12.8-12.8-32.64-12.8-45.44 0L512 466.56 285.44 240.64c-12.8-12.8-32.64-12.8-45.44 0-12.8 12.8-12.8 32.64 0 45.44L466.56 512 240 738.56c-12.8 12.8-12.8 32.64 0 45.44 6.4 6.4 14.72 9.6 22.4 9.6s16.64-3.2 22.4-9.6L512 557.44 738.56 784c6.4 6.4 14.72 9.6 22.4 9.6s16.64-3.2 22.4-9.6c12.8-12.8 12.8-32.64 0-45.44L557.44 512z"
          p-id="7671"
          fill="#999999"
        ></path>
      </svg>
    </div>
  </li>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["item"],
  filters: {
    FormatAr(InitValue) {
      var result = "";
      for (var i = 0; i < InitValue.length; i++) {
        result += InitValue[i].name + "/";
      }
      return result.slice(0, result.length - 1);
    },
  },
  computed: {
    ...mapState({
      currentMusic: (state) => state.play.currentMusic,
      currentList: (state) => state.play.currentList,
    }),
  },
  methods: {
    play(id) {
      this.axios.get("/song/detail?ids=" + id).then((response) => {
        this.$store.state.play.currentMusic = response.data.songs[0];
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
    },
    del(id){
        this.$store.state.play.currentList = this.currentList.filter(item=>{
            if(item.id!=id){
                return item;
            }
        })
    }
  },
};
</script>

<style lang="less">
.CurrentSongItem {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  .play_icon {
    margin-right: 8px;
  }
  .info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .text {
      line-height: 25px;
      width: 80vw;
      white-space: nowrap;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      font {
        &:nth-child(2) {
          font-size: 14px;
          color: #999;
        }
        &.color {
          color: #ff3a3a;
        }
      }
    }
  }
}
</style>