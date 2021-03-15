<template>
  <li class="ProgramItem" @click="play(item.mainSong.id)">
    <div class="order">
      <span>{{ index }}</span>
    </div>
    <div class="program_info">
      <p class="program_name">{{ item.name }}</p>
      <p class="program_data">
        <span>{{item.createTime | FormatTime}}</span>
        <span><i class="icon"></i>{{item.listenerCount | FormatCount}}</span>
        <span><i class="icon"></i>{{item.duration | FormatDuration}}</span>
      </p>
      <template>
        <div class="play_icon_current" v-if="$store.state.play.currentMusic?$store.state.play.currentMusic.id == item.mainSong.id:false">
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
  props: ["item", "index"],
  filters:{
    FormatTime(InitValue){
      var TimeStr = new Date(InitValue);
      var Y = TimeStr.getFullYear();
      var m = (TimeStr.getMonth()+1).toString().padStart(2,0);
      var d = TimeStr.getDate().toString().padStart(2,0);
      return Y + '-' + m + '-' + d
    },
    FormatCount(InitValue){
      if(InitValue < 10**4){
        return InitValue
      }else{
        return (InitValue / 10**4).toString().split(".")[0] + '万'
      }
    },
    FormatDuration(InitValue){
      var m = (InitValue / 1000 / 60).toString().split(".")[0];
      var s = (InitValue / 1000 % 60).toString().split(".")[0];
      if( m >= 1){
        return m.padStart(2,0) + ":" + s.padStart(2,0);
      }else{
        return '00:' + s.padStart(2,0);
      }
    }
  },
  data(){
    return {
      lyricStr:null,
    }
  },
  methods:{
    play(id){
      this.$store.state.play.currentMusic = {
        id,
        al:{
          name:this.item.name,
          picUrl:this.item.dj.avatarUrl,
        },
        dj:this.item.dj,
        name:this.item.name,
        mainSong:this.item.mainSong
      }
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
    }
  }
};
</script>

<style lang="less">
.ProgramItem {
  width: 100%;
  height: 50px;
  display: flex;
  .order {
    width: 60px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #999;
    font-size: 18px;
  }
  .program_info {
    width: calc(100% - 60px);
    height: 50px;
    border-bottom: 1px solid #f6f6f6;
    padding-top: 10px;
    position: relative;
    .program_name {
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }
    .program_data{
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      span{
        margin-right: 10px;
        &:nth-child(2){
          i.icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: -4px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABRElEQVRYR+2WrU7EQBSFz7RVQKjGEDwKAZbFsoJHwJC56Qa1a1Bka2mKa4Y7BkuCQPIQvMPKCh4ANwyZZJusgWG3pYPo2MnkfDnn/oxA4CMC62MAGBz4/w4URbGdpumLtfYMABtj7ieTyaKr7vE6oLU+NsaMsyybM/MMwB2Am7quyzzPP9uCeAGUUiMAIwfgxJRSB3EcT621JwBKInpuA7E2QCOmtT611jpHPoQQpZTybROQjQEaMWa+FEI8umhcfWRZ9r4OSGsAJ1ZV1U6SJM6NWwDXRKR+C9EJwEosh8tY9pexvPpAOgVYiWUMYCaEWEgpr36C+BOARlApNY+iaI+I6DuIPgB2iWjaKwAzh4lAax2mCIO2YbBBFGwUh1hGRwAugq1jZt4C8ATgHMBD7x8S3yxve++dhG0FfO8HgMGB4A58Ac4CyiHWhNoKAAAAAElFTkSuQmCC);
            background-repeat: no-repeat;
            background-size: 16px;
          }
        }
        &:nth-child(3){
          i.icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            vertical-align: -5px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEM0lEQVRYR7VXS4gcVRQ9tyowGUFbExUTjDj+MIuIgossFBJEXcQPIkYQJSLTdaszpjG6EgQjqDsTZ6KputXzgehCjTgguhFhgh8UhMCYRfwRYxSDCUZHCUON3XXlNa+Gmp6aqnLGPKhFd93zzqn7zrvvPkLFMTExsTqO48eJ6CYAV6UPEa1S1TMAzPNFkiSTjUbjcMVpQWWBYRjeQUSPADDP6rJ4+/47AAfjON7fbDb/KsIUCoii6GVVfbYiaV7YMQD7mTlYao4lBYhIC8BgBngawMcAjiZJ8qXrur+6rntqZmam3d/fv0ZV1xLRGsdxngDwWA/hIWbeniciV4CIHAcwkAJUddh13eF6vf5jlWy0Wq2Bdru9w3Gc5zPxvzDzhl78IgEi8jOAKzOBdzPzR1WIe2NE5CkA+zL/H2VmY+L5sUCAiLwD4KH0reM4V9Tr9d+WQ55iRORGAMYL3aGqe33ffyb9PS9ARJ40hsmQbWTmb4rIwzDsmsv3/UZR3Ojo6HWdTuf7TMzO1JhdAePj4xvm5uY+J6J0jXYz86tFk4qIMagxqhl1Zh4tio+iaJeqjtiYY3EcbzZbtCtARMyXmwwgSZIXGo3GnrK0B0GwJzVZVUwYhp8Q0e127ueY+SUaGxu7sN1u/wTgElVtE9GmstSbCZYjIIqiB1X1XeuF477vX0tBEDzgOM57VtWbzNy7h3OTsRwBNtvTALo7QVW3kYi8BeBhy3IPM39Ylv7lZsAKeA3AkOUQI+AIgFvs+g80Go0T51NAEARbHMeZshxfURiGJ637/2bmi6qQryQDURTdoKrfWp4TJgPnAFwAYJqZbz7fAqzpuyckEZ0zAv4EUDOqfN83VavSCMNwioi2WDNFvu9zFWCegK8BbLLgi5l5pmyi7A6wX3Kv53kflOHM+7wlMMBt1oRby7qZXvKqRSgVt8iEInIAQFrLC0vwSsmX2obzNZ2IDnqetyMvlWEYekQk6bv/+uUpTkQWFqKRkZG+vr6+PwD0AzjtOM7mvMZDRPYC2G2XqtJ50fshuaXYGuMVVX3aOnrY933TSCwYIrIuSRJ2XXfa87zJKobrjck9jOy63Abg0wxgOzMfWg7JUpjC49iAwjB8nYh2phO4rnv94ODgD/+HiNKGJCWJomhKVbvFxY71zHxqJSJ6yZdsyTIuNe33ZelvIqpcZHJ8Y/pL02emo7gpzYgw7ffV6W+z5ZIkeXtoaGi+uSzKiojcBeDRnvvBGWa+vBdXdDFZ0CFb4PtJkuxT1bNE9Pvs7OzZWq22qtPprOt0Ousdx7kTgCG/NUtERIc9z9uaJ7rwaiYiLwLYBaDyMd1LoqoHfN9PG5BFGkovp61Wa2OSJEaEuZzWKhpylogCVZ1k5s+KMKUCMr6oEdF9qno/gGtU9VIiWgvgHwAnM8+ROI7faDabcRWx/wIjvDorrpR/SAAAAABJRU5ErkJggg==);
            background-repeat: no-repeat;
            background-size: 12px;
          }
        }
      }
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