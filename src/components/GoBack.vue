<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconRightArrow from "@/components/icons/IconRightArrow.vue";

const router = useRouter();

function goBack() {
  router.go(-1); // Navigates back one step in history
}
</script>

<template>
  <p class="go-back" @click="goBack"><IconRightArrow/> Go Back</p>

</template>

<style  lang="scss">
.go-back {
  cursor: pointer;
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>