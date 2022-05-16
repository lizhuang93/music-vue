<template>
  <div class="list">
     <section>
      <div class="item" :class="{red: idx === activeIndex}" v-for="(item, idx) in list" :key="idx" @click="onClick(item, idx)">
        <p>{{idx + 1}}. {{item}}</p>
      </div>
      
    </section>
  </div>
</template>

<script>
const fileContext = require.context("../../music/", false, /\.mp3/);
const list = fileContext.keys().map(i => i.replace('./', '').replace('.mp3', ''))
import axios from 'axios'
import { player } from "../player"; // player 播放器
import bus from '../bus'
export default {
  components: {},
  props: {},
  data() {
    return {
      list,
      player,
    };
  },
  computed: {
    activeIndex() {
      return this.player.playIndex
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      bus.$emit('list', this.list)
    })
    this.list.forEach(n => {
      axios.get('api/' + n + '.mp3', {responseType:'blob'}).then(res => {
        // console.log('res.data->', res.data);
        player.append(res.data); //将音乐添加到 播放器中
      })
    });
  },
  methods: {
    onClick(item, idx) {
      player.stop();
      player.play(idx)
      
    },
    
  },
};
</script>
<style scoped>
.list {
  padding-top: 12px;
}
.list .item{
  padding: 6px 0;
  cursor: pointer;
}
.red, .item:hover {
  color: red;
}

</style>