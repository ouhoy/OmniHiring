<script setup lang="ts">
import getUser from "@/composables/getUser";
import {auth} from "@/firebase/config";
import {signOut} from "firebase/auth"
import {useRouter} from "vue-router";

const router = useRouter()
const {user} = getUser();

async function handleLogout() {
  await signOut(auth)
  if (!user.value) {
    await router.push('/')
  }

}

console.log(user.value)

</script>

<template>


  <main>
    <div class="container">
      <h2>Hello {{ user?.displayName }}</h2>
      <button @click="handleLogout">Logout</button>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  width: 95%;
  margin: 0 auto;
}
</style>