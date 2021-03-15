<template>
  <div id="app">
    <template v-if="adver">
      <div class="adver" @mousewheel.prevent @click="adver = false">
        <span>{{ time }} 关闭</span>
      </div>
    </template>
    <template v-else>
      <PageNav v-if="$route.meta.isShow"></PageNav>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <MusicController :progressTime="progressTime"></MusicController>
      <PlayList v-if="$store.state.play.List_state"></PlayList>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <Detail
          v-if="$store.state.play.detail_state"
          @setprogress="progressTime = $event"
        ></Detail>
      </transition>
    </template>
    <van-dialog
      v-model="show"
      title="编辑姓名(最长六个字符)"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <van-cell-group>
        <van-field v-model="value" placeholder="请输入修改内容" />
      </van-cell-group>
    </van-dialog>
    <van-dialog
      v-model="show2"
      title="编辑个性签名(最长六个字符)"
      show-cancel-button
      @confirm="confirm2"
      @cancel="cancel"
    >
      <van-cell-group>
        <van-field v-model="value2" placeholder="请输入修改内容" />
      </van-cell-group>
    </van-dialog>
    <transition name="fade">
      <MusicList v-if="MusicListState"></MusicList>
    </transition>
  </div>
</template>

<script>
import PageNav from "./views/PageNav";
import MusicController from "@/components/MusicController";
import PlayList from "@/components/PlayList";
import Detail from "@/components/Detail";
import MusicList from "@/components/MusicList";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    PageNav,
    MusicController,
    PlayList,
    Detail,
    MusicList,
  },
  computed: {
    ...mapState({
      dialogFalg: (state) => state.dialogFalg,
      dialogFalg2: (state) => state.dialogFalg2,
      contactUs: (state) => state.contactUs,
      about: (state) => state.about,
      MusicListState: (state) => state.MusicListState,
    }),
    ...mapGetters(["isIndexData"]),
  },
  data() {
    return {
      adver: true,
      time: 3,
      progressTime: null,
      value: "",
      value2: "",
      show: false,
      show2: false,
    };
  },
  watch: {
    dialogFalg() {
      this.show = this.dialogFalg;
    },
    dialogFalg2() {
      this.show2 = this.dialogFalg2;
    },
    contactUs() {
      this.$dialog
        .alert({
          title: "联系我们",
          message: "QQ:1195193099\nTel:15913987722",
          theme: "round-button",
        })
        .then(() => {});
    },
    about() {
      this.$dialog.alert({
        title: "关于",
        message: "致力打造小而精音乐播放器",
        theme: "round-button",
      });
    },
  },
  mounted() {},
  created() {
    console.log("http://music.kele8.cn/");
    // console.log("http://api.kele8.cn/agent/http://music.kele8.cn/");
    var Index = localStorage.getItem("IndexData") || null;
    Index = JSON.parse(Index);
    if (Index && Index.expiretime > new Date().getTime()) {
      this.adver = false;
      this.$store.state.banners = Index.banners;
      this.$store.state.RecommendSongList = Index.recommendlist;
      this.$store.state.NewMusicList.RecommendList = Index.newsongs;
    } else {
      this.advertising();
      var obj = {
        banners: "",
        recommendlist: "",
        newsongs: "",
        expiretime: "",
      };
      this.axios.get("/banner?type=2").then((response) => {
        this.$store.state.banners = response.data.banners;
        obj.banners = response.data.banners;
        obj.expiretime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem("IndexData", JSON.stringify(obj));
      });
      this.axios.get("/personalized").then((response) => {
        this.$store.state.RecommendSongList = response.data.result.slice(0, 6);
        obj.recommendlist = response.data.result.slice(0, 6);
        obj.expiretime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem("IndexData", JSON.stringify(obj));
      });
      this.axios.get("/personalized/newsong").then((response) => {
        this.$store.state.NewMusicList.RecommendList = response.data.result;
        obj.newsongs = response.data.result;
        obj.expiretime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem("IndexData", JSON.stringify(obj));
      });
    }
  },
  methods: {
    ...mapMutations(["saveuser"]),
    confirm() {
      this.$store.state.dialogFalg = false;
      if (this.value == "") return;
      this.$store.state.name = this.value.slice(0, 6);
      this.saveuser();
    },
    confirm2() {
      this.$store.state.dialogFalg2 = false;
      if (this.value2 == "") return;
      this.$store.state.motto = this.value2.slice(0, 6);
      this.saveuser();
    },
    cancel() {
      this.$store.state.dialogFalg = false;
      this.$store.state.dialogFalg2 = false;
    },
    advertising() {
      setInterval(() => {
        this.time--;
      }, 1000);
      setTimeout(() => {
        this.time = 3;
        this.adver = false;
      }, 3500);
    },
  },
};
</script>

<style lang="less">
// @import url("../node_modules/swiper/swiper-bundle.css");
#app {
  max-width: 1080px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 50px;
  div {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  .adver {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-image: url(./assets/adver.jpg);
    background-size: 100% 100vh;
    background-position: center;
    position: relative;
    span {
      position: absolute;
      color: white;
      right: 15px;
      top: 10px;
      border: 1px solid white;
      padding: 5px 8px;
      border-radius: 20px;
    }
  }
  .animate__animated.animate__fadeOutDown {
    --animate-duration: 0.8s;
  }
  .fade-enter {
    visibility: hidden;
    opacity: 0;
  }
  .fade-leave-to {
    display: none;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-to,
  .fade-leave {
    visibility: visible;
    opacity: 1;
  }
  .van-dialog__header {
    margin-bottom: 10px;
  }
}
</style>
