import Vue from 'vue'
import VueRouter from 'vue-router'
import Discover from '../views/Discover'
import Video from '../views/Video'
import BroadCastStation from '../views/BroadCastStation'
import Search from '../views/Search'
import SingerClassify from '../views/SingerClassify'
import SingerClassifyList from '../views/SingerClassifyList'
import SongListList from '../views/SongListList'
import SongListPlaza from '../views/SongListPlaza'
import NewSongs from '../views/NewSongs'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: {
      path:'/Discover'
    }
  },
  {
    path:'/Discover',
    name:'Discover',
    component:Discover,
    meta:{
      isShow:true,
    }
  },
  {
    path:'/Video',
    name:'Video',
    component:Video,
    meta:{
      isShow:true,
    }
  },
  {
    path:'/BroadCastStation',
    name:'BroadCastStation',
    component:BroadCastStation,
    meta:{
      isShow:true,
    }
  },
  {
    path:'/Search',
    name:'Search',
    component:Search
  },
  {
    path:'/Search/SingerClassify',
    name:'SingerClassify',
    component:SingerClassify
  },
  {
    path:'/Search/SingerClassify/SingerClassifyList',
    name:'SingerClassifyList',
    component:SingerClassifyList
  },
  {
    path:'/SongListList',
    name:'SongListList',
    component:SongListList,
  },
  {
    path:'/SongListPlaza',
    name:'SongListPlaza',
    component:SongListPlaza
  },
  {
    path:'/NewSongs',
    name:'NewSongs',
    component:NewSongs
  },
  {
    path:'/RankingList',
    name:'RankingList',
    component:()=>import('../views/RankingList')
  },
  {
    path:'/CloudRank',
    name:'CloudRank',
    component:()=>import('@/views/CloudRank')
  },
  {
    path:'/BroadCastMore',
    name:'BroadCastMore',
    component:()=>import('@/views/BroadCastMore')
  },
  {
    path:'/BroadCastDetail',
    name:'BroadCastDetail',
    component:()=>import('@/views/BroadCastDetail')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.hash){
      return {
        selector:to.hash
      }
    }else{
      return {x:0,y:0}
    }
  }
})
export default router
