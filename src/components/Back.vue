<template>
  <div class="Back">
      <div class="top_title">
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
        <div class="text">
            <slot></slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        Back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less">
.Back{
    width: 100%;
    max-width: 1080px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    .top_title{
        width: 100%;
        height: 50px;
        background-color: #d33a31;
        padding: 0 10px 0 15px;
        background-color: #d33a31;
        display: flex;
        align-items: center;
        .left_arrow {
            width: 30px;
            height: 30px;
            margin-right: 15px;
        }
        .text{
            color: white;
            font-size: 20px;
        }
    }
}
</style>