<script setup lang="ts">
import {  RouterView } from 'vue-router'
import TopNav from "@/components/TopNav.vue";
import getUser from "@/composables/getUser";

const {user} = getUser();

</script>

<template>

<div v-if="user">
  <TopNav/>
</div>
  <RouterView />
</template>

<style lang="scss">


</style>
