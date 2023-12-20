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
  <p>Hello {{ user?.displayName }}</p>
  <button @click="handleLogout">Logout</button>
</template>

<style scoped lang="scss">

</style>