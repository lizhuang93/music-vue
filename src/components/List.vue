<template>
  <div class="list">
     <section v-if="isShowList">
      <div class="item" :class="{red: idx === activeIndex}" v-for="(item, idx) in list" :key="idx" @click="onClick(item, idx)">
        <p>{{idx + 1}}. {{item}}</p>
      </div>
      
    </section>
    <div v-else class="loading">正在读取音乐,请稍等...</div>
  </div>
</template>

<script>
// const fileContext = require.context("../../music/", false, /\.mp3/);
// const list = fileContext.keys().map(i => i.replace('./', '').replace('.mp3', ''))
import axios from 'axios'
import { player } from "../player"; // player 播放器
import bus from '../bus'
export default {
  components: {},
  props: {},
  data() {
    return {
      isShowList: false,
      list: [],
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

    this.loadList()
    
  },
  methods: {
    loadList() {
      axios.get('api/allMusic').then(res => {
        this.list = res.data.data.map(i => i.replace('.mp3', ''))
        this.loadMusicBlob()
      })
    },
    async loadMusicBlob() {
      
      Promise.all(this.list.map(n => {
        return axios.get('api/' + n + '.mp3', {responseType:'blob'})
      })).then(async resArr => {
        resArr.forEach((res, idx) => {
          player.append(res.data, idx)
        })
        
      }).then(() => {
        console.log('done');
        this.isShowList = true
      })
    },
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
.loading {
  text-align: center;
  padding-top: 10px;
}
</style>