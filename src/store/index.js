import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogFalg: false,
    dialogFalg2: false,
    name: "添加名字",
    motto: "编辑个性签名",
    photo: require('../assets/error.jpg'),
    RecommendSongList: null,
    currentPlayListInfo: null,
    currentListSongInfo: null,
    contactUs: false,
    banner:null,
    about: false,
    NewMusicList: {
      RecommendList: null,
      ElseList: null
    },
    play: {
      currentMusic: null,
      currentList: [],
      icon_state: false,
      List_state: false,
      detail_state: false,
      lyric: null,
      time: {
        currentTime: null,
        totalTime: null,
      },
      videoId: null,
    },
    likeList: [],
    videolist: [],
    playmodel: true,
    playlistrecord: [],
    randomNum: null,
    recentlist: [],
    playeffect: true,
    playspeed: '1.0',
    BroadSublist: [],
    pulltime: 0,
    currentMusicList: null,
    MusicListState: false,
    MusicListType: null,
  },
  getters:{
    isIndexData(state){
      return  state.banner && state.RecommendSongList && state.NewMusicList.RecommendList
    }
  },
  mutations: {
    saveuser(state) {
      var obj = {
        name: state.name,
        motto: state.motto,
        photo: state.photo,
      }
      localStorage.setItem("user", JSON.stringify(obj))
    },
    norepeat(state) {
      this.state.likeList = [...new Set(state.likeList)];
      localStorage.setItem("likelist", JSON.stringify(state.likeList))
    },
    savevideolist(state) {
      localStorage.setItem("videolist", JSON.stringify(state.videolist))
    },
    saverecentList(state) {
      localStorage.setItem("recentlist", JSON.stringify(state.recentlist))
    },
    saveBroadSublist(state) {
      localStorage.setItem("BroadSublist", JSON.stringify(state.BroadSublist))
    },
    modelToggle() {
      this.state.playmodel = !this.state.playmodel
    },
    random(state, payload) {
      if (state.playlistrecord.length == state.play.currentList.length) {
        this.state.playlistrecord = [];
      }
      if ((typeof payload) == "number") {
        this.state.playlistrecord.push(payload);
      }
      if (state.playmodel) return;
      var random_num = Math.floor(Math.random() * (state.play.currentList.length));
      if (state.playlistrecord.indexOf(random_num) == -1) {
        this.state.randomNum = random_num
      } else {
        this.commit("random")
      }
    },
    changespeed(state, payload) {
      console.log();
      if (payload) {
        this.state.playspeed = Number(state.playspeed) + 0.1
      } else {
        this.state.playspeed -= 0.1
        if (state.playspeed <= 0) {
          this.state.playspeed = 0.1;
          alert("最小值 → 0.1")
        }
      }
      this.state.playspeed = this.state.playspeed.toFixed(1);
      console.log('调整速度,当前时速=>', state.playspeed);
    },
  },
  actions: {
  },
  modules: {
  }
})
