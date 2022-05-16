<template>
  <div class="home">
    <!-- <div class="mytips">
      <img
        class="project_img"
        src="https://img0.baidu.com/it/u=85442056,2037838112&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt="演示图"
      />
      <p>操作方式：点击下方的黑色磁盘，选择 mp3 格式的乐曲，读取完毕后点击播放按钮</p>
    </div> -->

    <player />
  </div>
</template>

<script>
import Player from "../components/Player";
export default {
  components: {
    Player
  }
};
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #ffedff;

  z-index: 0;

  position: relative;
  justify-content: center;
  align-items: start;
  padding-top: 100px;
}
.mytips {
  position: absolute;
  top: 0;
  left: 0;
}
.project_img {
  width: 20%;
  height: 20%;
  float: left;
}
.mytips p {
  width: 60%;
  float: right;
}
</style>