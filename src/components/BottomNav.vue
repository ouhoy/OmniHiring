<script setup lang="ts">

import IconAddSquare from "@/components/icons/IconAddSquare.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconUser from "@/components/icons/IconUser.vue";
import { useRoute } from 'vue-router';
const route = useRoute();


function isActive(routePath:string) {
  return route.path === routePath;
}
</script>

<template>
<nav>
<div class="nav-container">
<router-link :to="{name: 'app'}" class="link main-transform-animation " :class="{ active: isActive('/app')}" >
  <IconHome :color="isActive('/app')? '#195bff': ''"/>
  <p>Home</p>
</router-link>


  <router-link :to="{name: 'post'}"  :class="{ active: isActive('/post')}" class="link main-transform-animation ">
    <IconAddSquare :color="isActive('/post')? '#195bff': ''"/>
    <p>New Post</p>
  </router-link>

  <router-link class="link main-transform-animation " :to="{name: 'profile'}"  :class="{ active: isActive('/profile')}">
    <IconUser :color="isActive('/profile')? '#195bff': ''"/>
    <p>Profile</p>
  </router-link>
</div>
</nav>
</template>

<style scoped lang="scss">

@import "src/assets/styles/globals";


nav {
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #D6D6D6;
  background: #FFF;

  .nav-container {
    width: 80%;
    max-width: 400px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .main-transform-animation {
      &:active {
        transform: scale(0.95);
      }

    }
     .link {
       display: flex;
       gap: 4px;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       cursor: pointer;

       p {
         color: #4F4F4F;
         text-align: center;
         font-size: 12px;
         font-style: normal;
         font-weight: 400;
         line-height: 12px; /* 100% */
       }
     }
    .active {
      p {
        color: $primary
      }
    }
  }
}
</style>