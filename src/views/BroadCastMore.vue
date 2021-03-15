<template>
  <div :class="{BroadCastMore:true,padding_no_hash:!($route.hash),padding_hash:$route.hash}">
      <Back>{{$route.query.title}}</Back>
      <ul v-if="$route.params.data">
          <broadCastITem v-for="item in $route.params.data" :key="item.id" :item="item"></broadCastITem>
      </ul>
      <template v-if="$route.hash && classify">
          <div v-for="(item,index) in classify" :key="item.id" :id="'k_' + index">
            <RankingTitle>{{item.categoryName}}</RankingTitle>
            <ul :class="{emotion:true}">
                <broadCastITem v-for="i in item.radios" :key="i.id" :item="i"></broadCastITem>
            </ul>
          </div>
      </template>
  </div>
</template>

<script>
import Back from '@/components/Back'
import broadCastITem from '@/components/broadCastITem'
import RankingTitle from '@/components/RankingTitle'
export default {
    components:{
        Back,
        broadCastITem,
        RankingTitle
    },
    data(){
        return {
            classify:null,
            className:['emotion','music','lover','theater','show','talk']
        }
    },
    created(){
        if(this.$route.hash != ""){
            this.axios.get("/dj/category/recommend").then((response)=>{
                this.classify = response.data.data.slice(0,6);
            })
        }
    }
}
</script>

<style lang="less">
.BroadCastMore{
    width: 100%;
    ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .emotion{
        width: 100%;
        padding: 0 10px;
    }
}
.padding_no_hash{
    padding: 60px 10px 20px;
}
.padding_hash{
    padding-top: 50px;
}
</style>