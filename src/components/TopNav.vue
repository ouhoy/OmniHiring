<script setup lang="ts">

import IconTopNavLogo from "@/components/icons/IconTopNavLogo.vue";
import IconNavMenu from "@/components/icons/IconNavMenu.vue";
</script>

<template>
<nav>
<router-link :to="{name: 'app'}">
  <IconTopNavLogo/>
</router-link>
  <IconNavMenu/>
</nav>
</template>

<style scoped lang="scss">
nav {
  width: 95%;
  margin: 24px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>