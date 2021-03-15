<template>
  <div class="Classify">
      <Back>歌手分类</Back>
      <ul v-for="(ClassifyList,index) in SingerClassifyList" :key="index" class="ClassifyList">
          <li v-for="item in ClassifyList" :key="item.id" @click="ToSingerClassifyList(item.id,item.name)">{{item.name}}</li>
      </ul>
  </div>
</template>

<script>
import Back from '../components/Back'
export default {
    components:{
        Back
    },
    data(){
        return {
            SingerClassifyList:[
                [
                {name:'华语男歌手',id:1001},
                {name:'华语女歌手',id:1002},
                {name:'华语乐队/组合',id:1003},
                ],
                [
                {name:'欧美男歌手',id:2001},
                {name:'欧美女歌手',id:2002},
                {name:'欧美乐队/组合',id:2003},
                ],
                [
                {name:'日本男歌手',id:6001},
                {name:'日本女歌手',id:6002},
                {name:'日本乐队/组合',id:6003},
                ],
                [
                {name:'韩国男歌手',id:7001},
                {name:'韩国女歌手',id:7002},
                {name:'韩国乐队/组合',id:7003},
                ],
                [
                {name:'其他男歌手',id:4001},
                {name:'其他女歌手',id:4002},
                {name:'其他乐队/组合',id:4003},
                ],
                ]
        }
    },
    methods:{
        ToSingerClassifyList(id,name){
            this.$router.push({
                path:'/Search/SingerClassify/SingerClassifyList',
                query:{
                    id,
                    name,
                }
            })
        }
    }
}
</script>

<style lang="less">
.Classify{
    width: 100%;
    padding-top: 50px;
    background-color: #f2f4f5;
    .ClassifyList{
        width: 100%;
        padding-left: 10px;
        margin-top: 15px;
        background-color: #fff;
        li{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #e9e9e9;
            color: #353535;
        }
    }
}
</style>