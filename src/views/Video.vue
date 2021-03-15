<template>
  <div class="Video">
    <template v-if="MvDatas && State">
      <ul>
        <VideoItem
          v-for="item in MvDatas"
          :key="item.id"
          :item="item"
          @stopPlay="stopPlay"
          :playState="playState"
        ></VideoItem>
      </ul>
      <footer>—— 我也是有底线的 ——</footer>
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
import VideoItem from "../components/VideoItem";
export default {
  // /mv/url?id=
  // /mv/detail?mvid=
  components: {
    VideoItem,
  },
  data() {
    return {
      MvDatas: null,
      State: false,
      playState: true,
    };
  },
  created() {
    this.axios.get("/mv/exclusive/rcmd").then((response) => {
      this.MvDatas = response.data.data;
    });
    this.State = true;
  },
  methods: {
    stopPlay() {
      this.playState = !this.playState;
    },
  },
};
</script>

<style lang="less">
.Video {
  padding-top: 100px;
  .load {
    width: 100vw;
    height: calc(100vh - 150px);
    position: relative;
    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      p {
        font-size: 14px;
        // color: #ff0000;
        font-weight: bold;
      }
      i {
        display: inline-block;
        width: 3px;
        height: 22px;
        background-color: red;
        margin-left: 3px;
        animation: jump 0.6s infinite -0.4s linear alternate;
        transform-origin: center bottom;
        &:nth-child(2) {
          animation-delay: -0.2s;
        }
        &:nth-child(3) {
          animation-delay: 0s;
        }
        &:nth-child(4) {
          animation-delay: 0.2s;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
      @keyframes jump {
        0% {
        }
        100% {
          transform: scaleY(0);
        }
      }
    }
  }
  footer {
    width: 100%;
    text-align: center;
    color: #dee0e1;
    padding-bottom: 10px;
  }
}
</style>