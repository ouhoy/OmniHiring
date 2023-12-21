<script setup lang="ts">

import IconAddSquare from "@/components/icons/IconAddSquare.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconUser from "@/components/icons/IconUser.vue";
</script>

<template>
<nav>
<div class="nav-container">
<div class="link">
  <IconHome color=""/>
  <p>Home</p>
</div>

  <div class="link">
    <IconAddSquare color=""/>
    <p>New Post</p>
  </div>

  <div class="link">
    <IconUser color=""/>
    <p>Profile</p>
  </div>
</div>
</nav>
</template>

<style scoped lang="scss">
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
  }
}
</style>