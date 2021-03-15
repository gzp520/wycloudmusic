<template>
  <div class="Search">
    <template v-if="SearchHot && SearchDefault">
      <div class="Search_box">
        <div class="left_arrow" @click="Back">
          <svg
            t="1611317403852"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6017"
            width="30"
            height="30"
          >
            <path
              d="M475.9 193.8L182.7 487H937v50H182.7l293.2 293.2-35.4 35.4L87 512l353.6-353.6 35.3 35.4z"
              fill="#ffffff"
              p-id="6018"
            ></path>
          </svg>
        </div>
        <div class="Search_input">
          <input
            v-model="SearchContent"
            type="text"
            :placeholder="SearchDefault.showKeyword"
            @keyup.enter="Searching"
            @input="Searching"
          />
          <i
            class="clearIcon"
            v-show="SearchContent"
            @click="SearchContent = null"
          >
            <svg
              t="1611368860513"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11902"
              width="25"
              height="25"
            >
              <path
                d="M794.8 794.8c-14 14-36.9 14-50.9 0L229.2 280.1c-14-14-14-36.9 0-50.9s36.9-14 50.9 0L794.9 744c13.9 13.9 13.9 36.8-0.1 50.8z"
                p-id="11903"
                fill="#ffffff"
              ></path>
              <path
                d="M794.8 229.2c14 14 14 36.9 0 50.9L280.1 794.8c-14 14-36.9 14-50.9 0s-14-36.9 0-50.9L744 229.1c13.9-13.9 36.8-13.9 50.8 0.1z"
                p-id="11904"
                fill="#ffffff"
              ></path>
            </svg>
          </i>
        </div>
      </div>
      <template v-if="!SearchContent">
        <div class="SingerClassify" @click="ToSingerClassify">
          <div class="Singer_icon">
            <svg
              t="1611366827569"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10137"
              width="30"
              height="30"
            >
              <path
                d="M691.533 277.555c0 98.667-18.536 135.088-113.309 178.645-89.641 41.221-178.67-79.978-178.67-178.645 0-98.666 85.071-209.869 178.67-178.643 107.844 35.948 113.309 79.977 113.309 178.643"
                fill="#ffffff"
                p-id="10138"
                data-spm-anchor-id="a313x.7781069.0.i25"
                class="selected"
              ></path>
              <path
                d="M513.961 482.344c-112.925 0-204.814-91.863-204.814-204.789 0-112.925 91.889-204.788 204.814-204.788 112.926 0 204.789 91.862 204.789 204.788 0 112.926-91.863 204.789-204.789 204.789z m0-357.288c-84.101 0-152.525 68.411-152.525 152.499 0 84.089 68.424 152.5 152.525 152.5s152.501-68.412 152.501-152.5-68.4-152.499-152.501-152.499z"
                fill="#aaabac"
                p-id="10139"
                data-spm-anchor-id="a313x.7781069.0.i26"
                class=""
              ></path>
              <path
                d="M806.553 728.11c0 163.631-64.672 147.266-228.328 147.266-163.657 0-296.319 16.365-296.319-147.266 0-163.645 132.662-272.766 296.319-272.766 163.656 0.001 228.328 109.122 228.328 272.766"
                fill="#ffffff"
                p-id="10140"
                data-spm-anchor-id="a313x.7781069.0.i24"
                class="selected"
              ></path>
              <path
                d="M435.298 901.992c-84.484 0-156.38-5.105-201.29-49.62-28.595-28.353-42.484-68.998-42.484-124.262 0-26.54 3.217-52.429 9.574-76.914 3.6-13.965 17.949-22.39 31.863-18.739 13.966 3.612 22.366 17.885 18.741 31.864-5.234 20.207-7.889 41.665-7.889 63.789 0 40.608 8.834 69.101 27.013 87.127 35.974 35.679 113.001 35.016 201.852 34.237a4955.73 4955.73 0 0 1 82.517 0c89.132 0.816 165.904 1.455 201.903-34.251 18.18-18.013 27.013-46.518 27.013-87.113 0-142.913-113.615-246.647-270.176-246.647-54.279 0-105.878 13.047-149.23 37.735-12.536 7.124-28.494 2.771-35.668-9.791-7.149-12.548-2.756-28.506 9.779-35.655 51.242-29.157 111.803-44.578 175.12-44.578 183.828 0 322.465 128.513 322.465 298.936 0 55.264-13.891 95.909-42.484 124.25-51.498 51.024-138.535 50.283-239.154 49.402-26.706-0.23-54.97-0.23-81.624 0-12.845 0.116-25.483 0.23-37.841 0.23z"
                fill="#aaabac"
                p-id="10141"
                data-spm-anchor-id="a313x.7781069.0.i27"
                class=""
              ></path>
              <path
                d="M250.628 621.338a26.03 26.03 0 0 1-12.943-3.447c-12.536-7.149-16.902-23.118-9.728-35.666 11.897-20.835 26.527-40.214 43.455-57.563 10.136-10.314 26.68-10.506 36.969-0.434 10.34 10.084 10.544 26.629 0.459 36.97-13.838 14.171-25.787 29.975-35.489 46.965-4.825 8.438-13.632 13.175-22.723 13.175zM512.199 742.701c-34.237 0-62.092-27.854-62.092-62.092v-62.093c0-34.238 27.855-62.093 62.092-62.093 34.238 0 62.094 27.854 62.094 62.093v62.093c0 34.238-27.855 62.092-62.094 62.092z m0-133.989c-5.412 0-9.803 4.405-9.803 9.805v62.093c0 5.399 4.392 9.804 9.803 9.804 5.413 0 9.805-4.404 9.805-9.804v-62.093c0-5.4-4.392-9.805-9.805-9.805z"
                fill="#aaabac"
                p-id="10142"
                data-spm-anchor-id="a313x.7781069.0.i29"
                class=""
              ></path>
              <path
                d="M513.067 901.532c-14.297 0-25.965-11.501-26.143-25.837l-1.737-148.376c-0.178-14.438 11.414-26.284 25.838-26.452h0.306c14.298 0 25.965 11.503 26.144 25.839l1.736 148.376c0.179 14.438-11.412 26.285-25.838 26.45h-0.306z"
                fill="#aaabac"
                p-id="10143"
                data-spm-anchor-id="a313x.7781069.0.i28"
                class=""
              ></path>
            </svg>
          </div>
          <span class="text">歌手分类</span>
          <div class="arrow_icon">
            <svg
              t="1611367020926"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11038"
              width="25"
              height="25"
            >
              <path
                d="M372.679931 191.690834c8.782014 0 17.565051 3.235694 24.26873 9.708106l297.484322 287.175535c13.408381 12.932544 13.408381 33.9226 0 46.855144l-297.485345 287.172465c-13.408381 12.9438-35.130102 12.9438-48.53746 0-13.408381-12.932544-13.408381-33.9226 0-46.855144l273.215592-263.744893L348.411201 248.25306c-13.408381-12.932544-13.408381-33.9226 0-46.855144C355.11488 194.926528 363.897917 191.68981 372.679931 191.690834z"
                p-id="11039"
                fill="#cacccd"
              ></path>
            </svg>
          </div>
        </div>
        <div class="Search_tip">
          <div class="Search_hot">
            <p class="text">热门搜索</p>
            <ul class="HotItem">
              <li
                v-for="(item, index) in SearchHot"
                :key="index"
                @click="SearchTip(item.first)"
              >
                {{ item.first }}
              </li>
            </ul>
          </div>
          <div class="Search_record">
            <transition-group tag="ul">
              <li
                v-for="(item, index) in SearchRecord"
                :key="index"
                @click="SearchTip(item)"
              >
                <i class="clock_icon">
                  <svg
                    t="1611370332117"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="12852"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M922.7 338.5c-22.5-53.1-54.6-100.8-95.5-141.7s-88.6-73.1-141.7-95.5c-55-23.3-113.4-35-173.5-35-60.2 0-118.5 11.8-173.5 35-53.1 22.5-100.8 54.6-141.7 95.5s-73.1 88.6-95.5 141.7c-23.3 55-35 113.4-35 173.5 0 60.2 11.8 118.5 35 173.5 22.5 53.1 54.6 100.8 95.5 141.7s88.6 73.1 141.7 95.5c55 23.3 113.4 35 173.5 35 60.2 0 118.5-11.8 173.5-35 53.1-22.5 100.8-54.6 141.7-95.5s73.1-88.6 95.5-141.7c23.3-55 35-113.4 35-173.5 0.1-60.2-11.7-118.5-35-173.5zM782 782c-72.1 72.1-168 111.8-270 111.8S314.2 854.1 242 782c-72.1-72.1-111.8-168-111.8-270S169.9 314.2 242 242c72.1-72.1 168-111.8 270-111.8S709.8 169.9 782 242c72.1 72.1 111.8 168 111.8 270S854.1 709.8 782 782z"
                      p-id="12853"
                      fill="#cdcfcf"
                    ></path>
                    <path
                      d="M560.7 490.8V326.1c0-17.7-14.3-32-32-32s-32 14.3-32 32V498c0 1.7 0.1 3.3 0.4 4.9 0.2 6.4 2.3 12.9 6.5 18.4L665 734.2c6.3 8.3 15.9 12.7 25.5 12.7 6.7 0 13.5-2.1 19.3-6.5 14.1-10.7 16.9-30.7 6.2-44.8L560.7 490.8z"
                      p-id="12854"
                      fill="#cdcfcf"
                    ></path>
                  </svg>
                </i>
                {{ item }}
                <i class="clear_icon" @click.stop="clearItem(index)">
                  <svg
                    t="1611368860513"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11902"
                    width="25"
                    height="25"
                  >
                    <path
                      d="M794.8 794.8c-14 14-36.9 14-50.9 0L229.2 280.1c-14-14-14-36.9 0-50.9s36.9-14 50.9 0L794.9 744c13.9 13.9 13.9 36.8-0.1 50.8z"
                      p-id="11903"
                      fill="#aaabac"
                    ></path>
                    <path
                      d="M794.8 229.2c14 14 14 36.9 0 50.9L280.1 794.8c-14 14-36.9 14-50.9 0s-14-36.9 0-50.9L744 229.1c13.9-13.9 36.8-13.9 50.8 0.1z"
                      p-id="11904"
                      fill="#aaabac"
                    ></path>
                  </svg>
                </i>
              </li>
            </transition-group>
          </div>
        </div>
      </template>
      <template v-else-if="SearchResult">
        <ul v-if="C_SearchResult">
          <Song
            v-for="(item, index) in C_SearchResult"
            :key="item.id"
            @click.native="$store.state.play.currentList = C_SearchResult"
            :SearchContent="SearchContent"
            :index="index"
            :item="item"
          ></Song>
        </ul>
      </template>
      <template v-else-if="SearchSuggest">
        <div class="Search_suggest">
          <p class="title_text">搜索“{{ SearchContent }}”</p>
          <ul class="suggest_list">
            <li
              v-for="(item, index) in SearchSuggest"
              :key="index"
              @click="SearchTip(item.keyword)"
            >
              <svg
                t="1611389366329"
                class="search_icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2602"
                width="20"
                height="20"
              >
                <path
                  d="M448 800c-194.133333 0-352-157.866667-352-352S253.866667 96 448 96 800 253.866667 800 448 642.133333 800 448 800z m0-640C290.133333 160 160 290.133333 160 448S290.133333 736 448 736 736 605.866667 736 448 605.866667 160 448 160z"
                  p-id="2603"
                  fill="#bcbec0"
                ></path>
                <path
                  d="M686.933333 663.466667l196.266667 196.266666c12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0l-196.266667-196.266666c-12.8-12.8-12.8-32 0-44.8 10.666667-12.8 32-12.8 44.8 0z"
                  p-id="2604"
                  fill="#bcbec0"
                ></path>
              </svg>
              {{ item.keyword }}
            </li>
          </ul>
        </div>
      </template>
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
import Song from "../components/Song";
export default {
  components: {
    Song,
  },
  data() {
    return {
      SearchDefault: {
        realkeyword: null,
        showKeyword: null,
      },
      SearchHot: null,
      SearchContent: null,
      SearchRecord: [],
      timer: null,
      SearchResult: null,
      SearchSuggest: [],
    };
  },
  created() {
    if (this.$route.params != "") {
      this.SearchContent = this.$route.params.name;
      this.axios
        .get("/artist/top/song?id=" + this.$route.params.id)
        .then((response) => {
          this.SearchResult = response.data.songs;
        });
    }
    this.axios.get("/search/default").then((response) => {
      this.SearchDefault.realkeyword = response.data.data.realkeyword;
      this.SearchDefault.showKeyword = response.data.data.showKeyword;
    });
    this.axios.get("/search/hot").then((response) => {
      this.SearchHot = response.data.result.hots;
    });
    this.SearchRecord = localStorage.getItem("SearchRecord")
      ? localStorage.getItem("SearchRecord").split(",")
      : [];
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    ToSingerClassify() {
      this.$router.push({
        path: "/Search/SingerClassify",
      });
    },
    Searching(e) {
      var E = e || window.event;
      if (E.type != "input") {
        if (!this.SearchContent) {
          this.SearchContent = this.SearchDefault.realkeyword;
        }
        this.SearchRecord.unshift(this.SearchContent);
        this.SearchRecord = [...new Set(this.SearchRecord)];
        localStorage.setItem("SearchRecord", this.SearchRecord);
        this.SearchResult = null;
        this.axios
          .get("/search?keywords=" + this.SearchContent)
          .then((response) => {
            this.SearchResult = response.data.result.songs;
          });
      } else {
        this.SearchResult = "";
        if (!this.SearchContent) return;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.SearchSuggest = "";
          this.axios
            .get("/search/suggest?type=mobile&keywords=" + this.SearchContent)
            .then((response) => {
              this.SearchSuggest = response.data.result.allMatch;
            });
        }, 400);
      }
    },
    clearItem(index) {
      this.SearchRecord.splice(index, 1);
      localStorage.setItem("SearchRecord", this.SearchRecord);
    },
    SearchTip(Content) {
      this.SearchContent = Content;
      this.Searching();
    },
  },
  computed: {
    C_SearchResult() {
      if (!this.SearchResult) return;
      var result = this.SearchResult.map((item) => {
        if (!item.al) {
          return { ...item, ar: item.artists, al: item.album };
        } else {
          return item;
        }
      });
      return result;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
};
</script>

<style lang="less">
.Search {
  width: 100%;
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
  .Search_box {
    width: 100%;
    height: 50px;
    padding: 0 10px 0 15px;
    background-color: #d33a31;
    display: flex;
    align-items: center;
    .left_arrow {
      width: 30px;
      height: 30px;
      margin-right: 15px;
    }
    .Search_input {
      flex: 1;
      position: relative;
      input {
        width: 100%;
        height: 30px;
        border: none;
        border-bottom: 2px solid #e99e9b;
        background-color: transparent;
        outline: none;
        color: #e99e9b;
        padding-bottom: 3px;
        &::-webkit-input-placeholder {
          color: #e99e9b;
        }
      }
      .clearIcon {
        position: absolute;
        width: 25px;
        height: 25px;
        right: 10px;
      }
    }
  }
  .SingerClassify {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #dee0e1;
    display: flex;
    justify-content: center;
    align-items: center;
    .Singer_icon {
      width: 30px;
      height: 30px;
    }
    .text {
      color: #636464;
      margin: 0 5px;
    }
    .arrow_icon {
      width: 25px;
      height: 25px;
    }
  }
  .Search_tip {
    width: 100%;
    height: 500px;
    padding: 30px 10px;
    .Search_hot {
      width: 100%;
      .text {
        font-size: 14px;
        color: #818283;
      }
      .HotItem {
        width: 100%;
        margin-top: 15px;
        overflow: hidden;
        li {
          float: left;
          color: #333434;
          margin-right: 10px;
          margin-bottom: 10px;
          border: 1px solid #ced0d0;
          border-radius: 20px;
          padding: 7px 10px;
        }
      }
    }
    .Search_record {
      width: 100%;
      margin-top: 30px;
      // .v-enter,
      // .v-leave-to {
      //   opacity: 0;
      //   transform: translateY(40px);
      // }
      // .v-enter-active,
      // .v-leave-active {
      //   transition: all 0.6s ease;
      // }
      // .v-move {
      //   transition: all 0.6s ease;
      // }
      // .v-leave-active {
      //   position: absolute;
      // }
      ul {
        li {
          height: 50px;
          color: #393a3a;
          line-height: 50px;
          border-bottom: 1px solid #dbddde;
          margin-left: 30px;
          position: relative;
          .clock_icon {
            position: absolute;
            width: 20px;
            height: 20px;
            left: -30px;
            top: 5px;
          }
          .clear_icon {
            position: absolute;
            width: 25px;
            height: 25px;
            right: 10px;
            top: 10px;
          }
        }
      }
    }
  }
  .Search_suggest {
    width: 100%;
    .title_text {
      color: #507daf;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    .suggest_list {
      width: 100%;
      padding-left: 10px;
      li {
        width: 100%;
        color: #333333;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ececec;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 30px;
        box-sizing: border-box;
        .search_icon {
          position: absolute;
          left: 0;
          top: 15px;
        }
      }
    }
  }
}
</style>