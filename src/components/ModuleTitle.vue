<template>
  <div class="ModuleTitle">
      <div class="Title_main">
        <slot name="main"></slot>
      </div>
      <div class="Title_sub">
        <slot name="sub" ></slot>
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.ModuleTitle{
  width: 100%;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  .Title_main{
    span{
      &:nth-child(1){
        font-weight: bold;
        font-size: 22px;
        color: #333333;
      }
    }
  }
  .Title_sub{
    border: 1px solid #e6e6e6;
    border-radius: 14px;
    padding: 5px 10px;
    color: #353535;
    font-size: 14px;
  }
}
</style>