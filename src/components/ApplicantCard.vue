<script setup lang="ts">

import getDateString from "@/composables/getDate";

defineProps<{
  firstname: string,
  lastname: string,
  status: "pending" | "approved" | "rejected",
  applicationDate: string
}>()

function capitalizeFirstLetter(string:string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}




</script>

<template>
  <div class="card">
    <p class="title">{{ capitalizeFirstLetter(firstname) }} {{lastname.toUpperCase()}}</p>
    <p :class="['applications', { 'pending': status === 'pending', 'rejected': status === 'rejected', 'active-post': status === 'approved' }]">
      {{ capitalizeFirstLetter(status) }}
    </p>
    <p class="post-date">Applied {{getDateString(applicationDate)}}</p>
  </div>
</template>

<style lang="scss">
@import "src/assets/styles/globals";



</style>