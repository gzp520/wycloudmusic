<template>
  <li class="broadCastITem" @click="ToDetail(item.id)" ref="li">
      <div class="cover">
        <img alt="" ref="image" v-lazy="item.picUrl + `?imageView=1&type=webp&thumbnail=${picSize}x${picSize}`">
        <span class="name">{{item.name}}</span>
      </div>
      <div class="text" :title="item.rcmdtext">
          {{item.rcmdtext || item.rcmdText || item.name}}
      </div>
  </li>
</template>

<script>
export default {
    props:['item'],
    methods:{
        ToDetail(id){
            this.$router.push({
                path:'/BroadCastDetail',
                name:'BroadCastDetail',
                query:{
                    id
                }
            })
        }
    },
    data(){
        return {
            picSize:null,
        }
    },
    mounted() {
        this.$refs.image.style.width = (window.innerWidth - 30) / 3 + "px";
        this.$refs.image.style.height = (window.innerWidth - 30) / 3 + "px";
        // if(!this.item) return;
        // var img = new Image();
        // img.src = this.item.picUrl;
        // this.$refs.image.src = img.src;
        this.$refs.li.style.width = (window.innerWidth - 30) / 3 + "px";
        this.$refs.li.style.flex = "none"
    },
    created(){
        this.picSize = (window.innerWidth - 30) / 3;
    }
}
</script>

<style lang="less">
.broadCastITem{
    flex: calc((100% - 10px) / 3);
    margin-bottom: 10px;
    &:nth-child(3n-1){
        margin-left: 5px;
        margin-right: 5px;
    }
    .cover{
        width: 100%;
        position: relative;
        overflow: hidden;
        &::after{
            content: "";
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.2);
            display: block;
            position: absolute;
            left: 0;
            top: 0;
        }
        img{
            width: 100%;
            vertical-align: middle;
        }
        .name{
            width: 100%;
            box-sizing: border-box;
            font-size:12px;
            color: white;
            position: absolute;
            padding: 0 6px;
            left: 0;
            bottom: 5px;
            z-index: 1;
            text-shadow: 1px 0 1px black;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .text{
        width: 100%;
        padding: 5px 5px 0;
        font-size: 14px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>