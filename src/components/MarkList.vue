<script setup lang="ts">
import { Mark } from '@/interface'

defineProps<{ list: Mark[] }>()
const emits = defineEmits(['refresh'])

async function del({ title, url }: Mark) {
  console.log('delete', title, url)
  if (chrome.storage) {
    chrome.storage.local.get('vite', function (res: any) {
      chrome.storage.local.set(
        { vite: res.vite.filter((f: Mark) => f.title + f.url !== title + url) },
        function () {
          emits('refresh')
        }
      )
    })
  }

  let text
  try {
    const res = await fetch('https://vite.baj.workers.dev/del', {
      method: 'POST',
      body: title + url
    })
    text = await res.text()
  } catch (error) {
    console.error(error)
  }

  if (chrome.notifications) {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: '../../logo.png',
      title: 'Markable',
      message: text === '1' ? '成功' : '失败'
    })
  } else if (text === '1') emits('refresh')
}
</script>

<template>
  <div class="list">
    <div class="item" v-for="item in list" :key="item.url">
      <img :src="item.ico" @click="del(item)" />
      <a :href="item.url" target="_blank">{{ item.title }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  .item {
    float: left;
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    img {
      height: 18px;
      margin-right: 5px;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
