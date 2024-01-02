<script setup lang="ts">
import {  RouterView } from 'vue-router'
import TopNav from "@/components/TopNav.vue";
import getUser from "@/composables/getUser";
import BottomNav from "@/components/BottomNav.vue";
import {onBeforeMount, watch, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";

const {user} = getUser();







</script>

<template>

<div v-if="user">
  <TopNav/>
    <BottomNav />
</div>
  <RouterView />
</template>

<style lang="scss">


</style>
