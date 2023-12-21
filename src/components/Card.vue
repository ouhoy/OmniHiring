<script setup lang="ts">
import getDateString from "@/composables/getDate";

const {applications, title, postDate, endDate, state, id} = defineProps<{
  applications: number,
  title: string,
  postDate: string,
  endDate: string,
  state: boolean,
  id:string
}>()


</script>

<template>
  <router-link :to="{name: 'job', params: {id: id}}">
  <div class="card">
    <p :class="{'active-post': state}" class="applications">{{ applications }} {{ applications <= 1? 'Application' : 'Applications' }}</p>
    <p class="title">{{ title }}</p>
    <p class="post-date">{{ state ? "Active" : "Completed" }} {{ getDateString(state ? postDate : endDate) }}</p>
  </div>
  </router-link>
</template>

<style lang="scss">

@import "src/assets/styles/globals";


</style>