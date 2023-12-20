<script setup lang="ts">


import Card from "@/components/Card.vue";
</script>

<template>


  <main>
    <div class="home-app-container">

  <Card title="Junior Graphic Designer" post-date="Active 3 days ago" :state=true :applications="15"/>
  <Card title="Frontend Developer - React" post-date="Active 8 days ago" :state=true :applications="8"/>
  <Card title="Nodejs Developer" post-date="Completed 2 days ago" :state=false :applications="6"/>
    </div>
  </main>
</template>

<style scoped lang="scss">

@import "src/assets/styles/globals";
.home-app-container {
  width: 95%;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}


</style>