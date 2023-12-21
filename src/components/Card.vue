<script setup lang="ts">
import getDateString from "@/composables/getDate";

const {applications, title, postDate, endDate, state} = defineProps<{
  applications: number,
  title: string,
  postDate: string,
  endDate: string,
  state: boolean
}>()


</script>

<template>
  <div class="card">
    <p :class="{'active-post': state}" class="applications">{{ applications }} applications</p>
    <p class="title">{{ title }}</p>
    <p class="post-date">{{ state ? "Active" : "Completed" }} {{ getDateString(state ? postDate : endDate) }}</p>
  </div>
</template>

<style lang="scss">

@import "src/assets/styles/globals";


</style>