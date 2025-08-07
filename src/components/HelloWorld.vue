<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">счетчик: {{ count }}</button>
    <p>
      Отредактируйте
      <code>components/HelloWorld.vue</code> чтобы протестировать HMR
    </p>
  </div>

  <p>
    Ознакомьтесь с
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, официальным стартером Vue + Vite
  </p>
  <p>
    Узнайте больше о поддержке IDE для Vue в
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Руководстве по масштабированию Vue</a
    >.
  </p>
  <p class="read-the-docs">Нажмите на логотипы Vite и Vue, чтобы узнать больше</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
