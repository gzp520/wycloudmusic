<template>
  <div class="VideoItem" v-if="VideoInfo">
    <div class="cover" v-if="!videoState" ref="cover">
      <img :src="VideoInfo.cover" alt="" ref="image" />
      <span class="mask"></span>
      <span class="name">
        <svg
          t="1611819770416"
          class="name_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7325"
          width="20"
          height="20"
        >
          <path
            d="M512 0C230.016 0 0 228.8 0 512c0 281.984 228.8 512 512 512 281.984 0 512-228.8 512-512 0-281.984-228.864-512-512-512z m0 951.616A439.488 439.488 0 0 1 72.384 512 439.488 439.488 0 0 1 512 72.384 439.488 439.488 0 0 1 951.616 512 439.488 439.488 0 0 1 512 951.616z m262.08-207.296A265.728 265.728 0 0 0 624 568.64a196.352 196.352 0 0 0 91.008-165.76A196.864 196.864 0 0 0 518.272 206.08a196.864 196.864 0 0 0-196.736 196.736c0 70.016 36.16 131.328 91.072 165.76a263.808 263.808 0 0 0-150.656 175.68c-4.672 18.624 6.4 37.952 25.024 42.688 3.008 0.576 5.888 1.152 8.832 1.152a34.88 34.88 0 0 0 33.856-26.368 194.24 194.24 0 0 1 376.128 0 35.072 35.072 0 0 0 42.624 25.088 34.432 34.432 0 0 0 25.6-42.56zM518.4 276.16a126.528 126.528 0 1 1 0 253.248 126.528 126.528 0 0 1-126.592-126.656c0-70.016 56.576-126.592 126.592-126.592z"
            p-id="7326"
            fill="#ffffff"
          ></path>
        </svg>
        {{ VideoInfo.artistName }}
      </span>
      <span class="duration">
        <svg
          t="1611818472121"
          class="duration_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2592"
          width="20"
          height="20"
        >
          <path
            d="M528.7936 109.1584C309.248 106.496 128.4096 281.3952 124.3136 500.9408c4.3008 219.5456 184.9344 394.6496 404.48 391.7824 219.5456 2.8672 400.1792-172.2368 404.48-391.7824C928.9728 281.3952 748.3392 106.496 528.7936 109.1584z m0 718.2336c-183.0912 2.4576-333.6192-143.36-337.1008-326.4512 3.4816-182.8864 154.0096-328.704 337.1008-326.4512 183.0912-2.2528 333.6192 143.5648 337.1008 326.4512-3.4816 183.0912-154.2144 328.9088-337.1008 326.4512z m156.672-230.1952l-139.8784-78.2336V305.152c0-18.6368-15.1552-33.792-33.792-33.792s-33.792 15.1552-33.792 33.792v228.352c0 11.4688 15.1552 22.9376 25.3952 27.648 4.3008 4.096 9.4208 7.5776 15.1552 9.8304l138.24 81.7152c14.336 9.8304 33.9968 6.144 43.6224-8.192 9.8304-14.336 6.144-33.9968-8.192-43.6224-2.048-1.6384-4.3008-2.8672-6.7584-3.6864z"
            fill="#ffffff"
            p-id="2593"
          ></path>
        </svg>
        {{ VideoInfo.duration | FormatDuration }}
      </span>
      <span class="playCount">
        <svg
          t="1611819145757"
          class="playCount_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4198"
          width="20"
          height="20"
        >
          <path
            d="M924.681 747.015l-0.513-456.903L747.79 392.208v-42.013c0-62.432-50.793-113.226-113.225-113.226H212.543c-62.433 0-113.226 50.794-113.226 113.226V686.98c0 62.436 50.793 113.227 113.226 113.227h422.023c62.432 0 113.225-50.792 113.225-113.227V645.15l176.89 101.866zM877.94 370.393l0.331 296.444-130.48-75.14v-145.97l130.149-75.334zM701.472 686.98c0 36.898-30.013 66.91-66.906 66.91H212.543c-36.891 0-66.906-30.012-66.906-66.91V350.195c0-36.893 30.015-66.906 66.906-66.906h422.023c36.893 0 66.906 30.014 66.906 66.906v68.826l-0.008 199.45 0.008 0.004v68.505z"
            p-id="4199"
            fill="#ffffff"
          ></path>
        </svg>
        {{ VideoInfo.playCount | FormatPlayCount }}
      </span>
      <span class="play" @click="playVideo(VideoInfo.id)">
        <svg
          t="1611820123798"
          class="play_icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11801"
          width="60"
          height="60"
        >
          <path
            d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512c0 136.533333-54.044444 267.377778-150.755556 361.244444S648.533333 1024 512 1024z m0-68.266667c244.622222 0 443.733333-199.111111 443.733333-443.733333S756.622222 68.266667 512 68.266667 68.266667 267.377778 68.266667 512s199.111111 443.733333 443.733333 443.733333z m196.266667-418.133333l-273.066667 162.133333c-11.377778 5.688889-22.755556 5.688889-34.133333 0s-17.066667-17.066667-17.066667-28.444444V347.022222c0-11.377778 5.688889-22.755556 17.066667-28.444444s22.755556-5.688889 34.133333 0l273.066667 162.133333c11.377778 5.688889 17.066667 17.066667 17.066666 28.444445s-5.688889 22.755556-17.066666 28.444444z"
            p-id="11802"
            fill="#ffffff"
          ></path>
        </svg>
      </span>
    </div>
    <div class="video" v-else>
      <video
        height="100%"
        width="100%"
        :src="videoUrl"
        controls
        autoplay
        :poster="VideoInfo.cover"
        ref="video"
      ></video>
    </div>
    <div class="introduce">
      <div class="name">
        <p>{{ VideoInfo.name }}</p>
      </div>
      <div class="data">
        <ul>
          <li @click="add(VideoInfo.id, 1)">
            <svg
              t="1611826117081"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2040"
              width="25"
              height="25"
            >
              <path
                d="M832 364.763429H684.836571s19.163429-64 31.963429-179.2C723.163429 128 678.4 70.436571 614.4 64.073143h-12.8c-51.2 0-83.163429 32.036571-102.4 76.8L460.8 236.763429c-32.036571 64-57.563429 102.4-76.8 115.2-25.6 12.8-121.636571 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.636571v480.036571c0 31.963429 25.6 57.563429 64 57.563429h646.436571c95.963429 0 121.563429-64 134.363429-153.6l51.2-307.2c6.436571-70.436571-6.436571-134.436571-128-134.436571zM256 902.363429H128V422.473143H256v480.036571z m640-409.6l-51.2 307.2c-12.8 57.636571-12.8 102.4-76.8 102.4H320V422.473143c44.763429 0 70.436571-6.436571 89.6-19.236572 32.036571-12.726857 64-63.926857 108.836571-147.163428 25.6-64 38.326857-96.036571 44.763429-102.4 6.363429-19.236571 19.236571-32.036571 44.763429-32.036572H614.4c32.036571 0 44.763429 32.036571 44.763429 51.2-12.8 102.4-31.963429 166.473143-31.963429 166.473143l-25.6 83.163429h243.2c19.163429 0 32.036571 0 44.763429 12.8 12.8 12.8 6.436571 38.4 6.436571 57.563428z"
                :fill="likeCount ? 'red' : '#969696'"
                p-id="2041"
              ></path>
            </svg>
            <span class="quantity">{{
              likeCount ? VideoInfo.likeCount + 1 : VideoInfo.likeCount
            }}</span>
          </li>
          <li @click="add(VideoInfo.id, 2)">
            <svg
              t="1611826284974"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6760"
              width="25"
              height="25"
            >
              <path
                d="M512 0a43.54 43.54 0 1 1 0 87.081c-234.742 0-425.042 190.3-425.042 425.042 0 234.7 190.3 424.919 425.042 424.919 234.742 0 425.042-190.3 425.042-425.042a43.54 43.54 0 1 1 86.958 0c0 282.747-229.253 512-512 512S0 794.747 0 512 229.253 0 512 0z m263.537 217.702a42.803 42.803 0 0 1 60.784-60.129l74.957 74.998a57.795 57.795 0 0 1 0 81.838l-74.957 74.957a42.762 42.762 0 0 1-60.416-60.457l12.698-12.698h-55.214c-150.078 0-201.032 63.898-201.032 257.147 0 23.675-19.087 42.762-42.762 42.762a42.68 42.68 0 0 1-42.721-42.762c0-238.96 87.203-342.63 286.515-342.63h55.173l-13.025-13.026z"
                p-id="6761"
                :fill="shareCount ? 'red' : '#969696'"
              ></path>
            </svg>
            <span class="quantity">{{
              shareCount ? VideoInfo.shareCount + 1 : VideoInfo.shareCount
            }}</span>
          </li>
          <li @click="add(VideoInfo.id, 3)">
            <svg
              t="1611826378127"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9463"
              width="25"
              height="25"
            >
              <path
                d="M54.784 1013.696a42.88 42.88 0 0 1-38.4-21.888 39.552 39.552 0 0 1 18.816-54.4l439.744-211.2c1.472-0.64 2.24-1.344 3.776-1.344a76.928 76.928 0 0 1 64.768 0.64l3.008 1.472 437.44 211.2c21.12 9.856 29.376 34.56 18.816 54.336-10.56 19.776-36.864 27.52-57.984 17.664L511.104 800.448h-0.768l-435.2 209.024a58.624 58.624 0 0 1-20.352 4.224z m626.432-795.904H336.384c-24.064 0-42.88-18.368-42.88-40.256 0-22.592 19.584-40.256 42.88-40.256h344.832c24.128 0 42.944 18.368 42.944 40.32 0 22.528-18.816 40.192-42.88 40.192z m176.192 416H684.992c-24.064 0-42.88-18.368-42.88-40.32 0-21.888 19.584-40.256 42.88-40.256h172.416c24.128 0 42.944 18.368 42.944 40.32 0 21.888-18.816 40.192-42.88 40.192z"
                p-id="9464"
                :fill="subCount ? 'red' : '#969696'"
              ></path>
              <path
                d="M771.584 714.944c-24.064 0-42.88-18.368-42.88-40.256V513.024c0-22.656 19.584-40.32 42.88-40.32 23.36 0 42.88 18.368 42.88 40.32v161.664c0 21.888-19.52 40.32-42.88 40.32z"
                p-id="9465"
                :fill="subCount ? 'red' : '#969696'"
              ></path>
              <path
                d="M974.144 1020.8c-24.128 0-42.88-18.432-42.88-40.32V101.248c0-11.264-9.856-20.48-21.888-20.48H108.288c-12.096 0-21.888 9.216-21.888 20.48V979.84c0 22.592-19.584 40.32-42.88 40.32-24.128 0-42.88-18.432-42.88-40.32V101.248C0.64 45.504 48.704 0.256 108.224 0.256h801.088c59.52 0 107.712 45.248 107.712 100.992V979.84c0 22.592-18.88 40.96-42.944 40.96z"
                p-id="9466"
                :fill="subCount ? 'red' : '#969696'"
              ></path>
            </svg>
            <span class="quantity">{{
              subCount ? VideoInfo.subCount + 1 : VideoInfo.subCount
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div :class="{ desc: true, bre: breState }">
      <span>内容简介：</span>
      {{ VideoInfo.desc }}
      <svg
        t="1611831502302"
        :class="{ desc_icon: true, rotate: !breState }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2678"
        width="15"
        height="15"
        @click="breState = !breState"
      >
        <path
          d="M511.96131555 809.05102222L1021.23406222 275.34449778l-57.67850667-60.39438223-451.54190222 473.24387556L60.44444445 214.98311111l-57.67850667 60.35228444L511.96131555 809.05102222z"
          p-id="2679"
          fill="#969696"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ["item", "playState"],
  data() {
    return {
      VideoInfo: null,
      videoState: false,
      videoUrl: null,
      breState: true,
      likeCount: false,
      shareCount: false,
      subCount: false,
      thisflag: false,
    };
  },
  methods: {
    playVideo(id) {
      this.videoState = !this.videoState;
      if (this.videoState) {
        this.axios.get("/mv/url?id=" + id).then((response) => {
          this.videoUrl = response.data.data.url;
          this.$store.state.play.videoId = id;
          this.$emit("stopPlay");
          this.$refs.video.addEventListener("play", () => {
            this.$store.state.play.videoId = id;
            this.$emit("stopPlay");
          });
        });
      }
    },
    add(id, num) {
      var result = this.$store.state.videolist.some((item) => {
        return item.id == id;
      });
      if (result) {
        this.$store.state.videolist.forEach((item, index) => {
          if (id == item.id) {
            if (num == 1) {
              this.$store.state.videolist[index].likeCount = !this.$store.state
                .videolist[index].likeCount;
              this.likeCount = item.likeCount;
            } else if (num == 2) {
              this.$store.state.videolist[index].shareCount = !this.$store.state
                .videolist[index].shareCount;
              this.shareCount = item.shareCount;
            } else if (num == 3) {
              this.$store.state.videolist[index].subCount = !this.$store.state
                .videolist[index].subCount;
              this.subCount = item.subCount;
            }
          }
        });
      } else {
        var obj = {
          id: id,
          likeCount: false,
          shareCount: false,
          subCount: false,
        };
        if (num == 1) {
          obj.likeCount = true;
          this.likeCount = obj.likeCount;
        } else if (num == 2) {
          obj.shareCount = true;
          this.shareCount = obj.shareCount;
        } else if (num == 3) {
          obj.subCount = true;
          this.subCount = obj.subCount;
        }
        this.$store.state.videolist.push(obj);
      }
      this.$store.commit("savevideolist");
    },
  },
  created() {
    this.axios.get("/mv/detail?mvid=" + this.item.id).then((response) => {
      this.VideoInfo = response.data.data;
    });
    this.$store.state.videolist =
      JSON.parse(localStorage.getItem("videolist")) || [];
    this.$store.state.videolist.forEach((item) => {
      if (this.item.id == item.id) {
        this.likeCount = item.likeCount;
        this.shareCount = item.shareCount;
        this.subCount = item.subCount;
      }
    });
  },
  filters: {
    FormatDuration(InitValue) {
      var m = Math.floor(InitValue / 60 / 1000)
        .toString()
        .padStart(2, 0);
      var s = ((InitValue / 1000) % 60).toString().padStart(2, 0);
      return m + ":" + s;
    },
    FormatPlayCount(InitValue) {
      if (InitValue < 10 ** 5) {
        return InitValue;
      } else if (InitValue < 10 ** 8) {
        return (InitValue / 10 ** 4).toFixed(1) + "万";
      }
    },
  },
  watch: {
    playState() {
      if (!this.$refs.video) return;
      if(this.currentId != this.VideoInfo.id){

        this.$refs.video.pause();
      }
    },
  },
  computed:{
    ...mapState({
      currentId :state=>state.play.videoId
    })
  }
};
</script>

<style lang="less">
.VideoItem {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  .cover {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    span {
      position: absolute;
      color: white;
      text-shadow: 1px 0 1px black;
    }
    .mask {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .name {
      top: 10px;
      left: 10px;
      .name_icon {
        vertical-align: -5px;
      }
    }
    .duration {
      right: 10px;
      bottom: 5px;
      .duration_icon {
        vertical-align: -4px;
        margin-right: -2px;
      }
    }
    .playCount {
      bottom: 5px;
      left: 10px;
      .playCount_icon {
        vertical-align: -5px;
        margin-right: 1px;
      }
    }
    .play {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .introduce {
    width: 100%;
    display: flex;
    .name {
      flex: 1;
      display: flex;
      align-items: center;
      p {
        padding: 10px 6px;
        font-size: 14px;
        letter-spacing: 2px;
        line-height: 18px;
      }
    }
    .data {
      flex: 1;
      padding: 10px 0;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        li {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .quantity {
            margin-top: 5px;
            font-size: 14px;
            color: #979899;
          }
        }
      }
    }
  }
  .desc {
    width: 100%;
    font-size: 14px;
    letter-spacing: 2px;
    line-height: 18px;
    color: #969696;
    padding-left: 6px;
    padding-right: 20px;
    position: relative;
    span {
      color: black;
    }
    .desc_icon {
      position: absolute;
      right: 6px;
      bottom: 0;
    }
    .rotate {
      transform: rotateZ(180deg);
    }
  }
  .bre {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>