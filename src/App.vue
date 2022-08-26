<script setup lang="ts">
import { ref } from 'vue'

const mine = ref('')

function getPwd() {
  if (chrome.storage) {
    chrome.storage.local.get('mine', function (res: any) {
      mine.value = res.mine
    })
  }
}

function setPwd() {
  if (chrome.storage) {
    chrome.storage.local.set({ mine: mine.value })
  }
}

getPwd()
</script>

<template>
  <textarea v-model="mine" rows="20" @input="setPwd"></textarea>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  width: 300px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style lang="scss" scoped>
textarea {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  resize: none;
}
</style>
