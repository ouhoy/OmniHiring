<script setup lang="ts">

import IconTopNavLogo from "@/components/icons/IconTopNavLogo.vue";
import IconNavMenu from "@/components/icons/IconNavMenu.vue";
</script>

<template>
<nav>
<IconTopNavLogo/>
  <IconNavMenu/>
</nav>
</template>

<style lang="scss">
nav {
  width: 95%;
  margin: 24px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>