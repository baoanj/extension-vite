<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mark } from './interface'
import MarkList from '@/components/MarkList.vue'

const list = ref<Mark[]>([])
const sections = [
  { title: '导航', type: 'nav' },
  { title: '常看', type: 'top' },
  { title: '要看', type: 'ned' },
  { title: '用得着', type: 'use' },
  { title: '吃灰', type: 'nor' }
]
const isInExt = !!chrome.storage

async function getList() {
  if (chrome.storage) {
    chrome.storage.local.get('vite', function (res: any) {
      list.value = res.vite || []
    })
  } else {
    const res = await fetch('https://vite.baj.workers.dev/get')
    const text = await res.text()
    list.value = JSON.parse(text || '[]')
  }
}

async function sync() {
  const res = await fetch('https://vite.baj.workers.dev/get')
  const text = await res.text()
  chrome.storage.local.set({ vite: JSON.parse(text || '[]') }, function () {
    getList()
  })
}

getList()
</script>

<template>
  <button v-if="isInExt" class="sync" @click="sync">同步</button>
  <div v-for="sec in sections" :key="sec.type">
    <h2>{{ sec.title }}</h2>
    <MarkList
      :list="list.filter(item => item.type === sec.type)"
      @refresh="getList"
    />
  </div>
</template>

<style>
#app {
  width: 700px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style lang="scss" scoped>
.sync {
  float: right;
}
</style>
