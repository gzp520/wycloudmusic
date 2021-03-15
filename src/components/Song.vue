<template>
  <li class="Song" @click="play(item.id)">
    <div class="order">
        <svg
          t="1613893319091"
          class="icon"
          viewBox="0 0 1059 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6912"
          width="20"
          height="20"
          v-if="$store.state.play.currentMusic?$store.state.play.currentMusic.id == item.id:false"
        >
          <path
            d="M648.490101 1013.692421 648.490101 943.34831C844.095194 897.066596 989.80068 721.769482 989.80068 512 989.80068 302.264649 844.095194 126.967535 648.490101 80.65169L648.490101 34.165189 648.490101 10.341711C882.151323 57.783881 1058.062796 264.345044 1058.062796 512 1058.062796 759.689087 882.151323 966.25025 648.490101 1013.692421ZM68.262116 716.786348C30.547297 716.786348 0 686.239051 0 648.524232L0 375.475768C0 337.79508 30.547297 307.213652 68.262116 307.213652L238.917406 307.213652 546.096927 0.034131 546.096927 1023.965869 238.917406 716.786348 68.262116 716.786348ZM477.834811 853.34471 477.834811 170.723552 273.048463 375.509899 68.262116 375.509899 68.262116 648.558363 273.048463 648.558363 477.834811 853.34471ZM819.14539 494.934471C819.14539 612.550097 749.040197 713.543897 648.490101 759.108859L648.490101 681.392441C709.926005 641.936938 750.883274 573.401773 750.883274 494.934471 750.883274 416.5013 709.926005 347.966136 648.490101 308.510633L648.490101 230.794214C749.040197 276.359176 819.14539 377.352976 819.14539 494.934471Z"
            fill="#ff0000"
            p-id="6913"
          ></path>
        </svg>
        <span v-else-if="typeof index == 'number'">{{ (index + 1) > 10 ? (index + 1) : '0'+(index + 1) }}</span>
        <img alt="" v-lazy="picUrl + '?imageView=1&type=webp&thumbnail=45x45'" v-show="!picUrl? false:picUrl && $store.state.play.currentMusic?$store.state.play.currentMusic.id != item.id:true" />
    </div>
    <div class="Song_info">
      <p
        class="Song_name"
        v-html="$options.filters.FormatName(item.name, SearchContent)"
      ></p>
      <p
        class="ar"
        v-html="$options.filters.FormatAr(item.ar, item.al.name, SearchContent)"
      ></p>
      <template>
        <div class="play_icon_current" v-if="$store.state.play.currentMusic?$store.state.play.currentMusic.id == item.id:false">
          <i :class="{pause:!$store.state.play.icon_state}"></i>
          <i :class="{pause:!$store.state.play.icon_state}" ></i>
          <i :class="{pause:!$store.state.play.icon_state}" ></i>
          <i :class="{pause:!$store.state.play.icon_state}" ></i>
        </div>
        <span class="play_icon" v-else></span>
      </template>
    </div>
  </li>
</template>

<script>
export default {
  props: ["item", "index", "picUrl", "SearchContent"],
  filters: {
    FormatName(InitValue, Key) {
      return InitValue.replace(Key, `<span style="color:red">${Key}</span>`);
    },
    FormatAr(ar, name, Key) {
      var result = "";
      for (var i = 0; i < ar.length; i++) {
        result += ar[i].name + "/";
      }
      result = result.slice(0, result.length - 1) + " - " + name;
      return result.replace(Key, `<span style="color:red">${Key}</span>`);
    },
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
  },
  data(){
    return {
      lyricStr:null,
      photo:null,
    }
  }
};
</script>

<style lang="less">
.Song {
  width: 100%;
  height: 50px;
  display: flex;
  .order {
    width: 60px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #999999;
    font-size: 18px;
    img {
      width: 45px;
      height: 45px;
      vertical-align: middle;
    }
    .icon{
        margin-top: 15px;
    }
  }
  .Song_info {
    width: calc(100% - 60px);
    height: 50px;
    border-bottom: 1px solid #f6f6f6;
    padding-top: 10px;
    position: relative;
    .Song_name {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }
    .ar {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }
    .play_icon_current{
      position: absolute;
      right: 10px;
      top: 14px;
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
    .play_icon {
      position: absolute;
      right: 10px;
      top: 14px;
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-position: -24px 0;
      background-size: 166px 97px;
    }
  }
}
</style>