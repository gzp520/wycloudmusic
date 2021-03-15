<template>
  <div class="RankingTitle">
      <span><slot></slot></span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.RankingTitle{
    width: 100%;
    height: 30px;
    margin: 15px 0 10px 0;
    span{
        padding-left: 10px;
        border-left: 3px solid #d33a31;
        line-height: 30px;
        font-weight: bold;
        font-size: 18px;
    }
}
</style>