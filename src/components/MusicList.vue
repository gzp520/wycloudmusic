<template>
  <div class="MusicList" @mousewheel.prevent>
    <div class="nav">
      <van-icon
        name="arrow-left"
        color="#0e0e0e"
        size="28px"
        @click="back"
        class="nav_icon"
      />
      <span class="nav_title">歌曲列表</span>
    </div>
    <div class="type">
      <div>
        <span
          :class="{ active: MusicListType == 'like' }"
          @click="toggle('like')"
          >喜欢</span
        >
      </div>
      <div>
        <span
          :class="{ active: MusicListType == 'recent' }"
          @click="toggle('recent')"
          >最近播放</span
        >
      </div>
    </div>
    <ul class="list" v-if="currentMusicList">
      <li
        v-for="item in currentMusicList"
        :key="item.id"
        @click="play(item.id)"
        :style="`color:${currentMusic ? (item.id == currentMusic.id ? 'red' : '') : '' }`"
      >
        <div class="left">
          <p>{{ item.name }}</p>
        </div>
        <div class="right">
          <van-icon name="cross" color="#8f8f8f" @click="del(item.id)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      currentMusicList: (state) => state.currentMusicList,
      MusicListType: (state) => state.MusicListType,
      likeList: (state) => state.likeList,
      recentlist: (state) => state.recentlist,
      currentMusic: (state) => state.play.currentMusic,
    }),
  },
  methods: {
    back() {
      this.$store.state.MusicListState = false;
    },
    del(id) {
      if (this.MusicListType == "like") {
        this.$store.state.likeList = this.likeList.filter((item) => {
          return item.id != id;
        });
        this.$store.state.currentMusicList = this.likeList;
      } else {
        this.$store.state.recentlist = this.recentlist.filter((item) => {
          return item.id != id;
        });
        this.$store.state.currentMusicList = this.recentlist;
      }
      this.$forceUpdate();
    },
    play(id) {
      this.axios
        .get("/song/detail?ids=" + id)
        .then((response) => {
          this.$store.state.play.currentMusic = response.data.songs[0];
        })
        .then(() => {
          this.axios.get("/lyric?id=" + id).then((response) => {
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
    toggle(type) {
      if (type == "like") {
        this.$store.state.currentMusicList = this.likeList;
      } else {
        this.$store.state.currentMusicList = this.recentlist;
      }
      this.$store.state.MusicListType = type;
    },
  },
};
</script>

<style lang="less">
.MusicList {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  overflow-y: auto;
  .nav {
    width: 100%;
    height: 50px;
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
    position: relative;
    .nav_title {
      font-size: 18px;
    }
    .nav_icon {
      position: absolute;
      left: 10px;
    }
  }
  .type {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    background-color: #fff;
    > div {
      flex: 1;
      text-align: center;
      span {
        padding-bottom: 10px;
        &.active {
          border-bottom: 2px solid #eb513b;
        }
      }
    }
  }
  .list {
    width: 100%;
    padding: 0 10px;
    background-color: #fff;
    li {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        width: 80vw;
        p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
    }
  }
}
</style>