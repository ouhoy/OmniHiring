<script setup lang="ts">
import getUser from "@/composables/getUser";
import {auth} from "@/firebase/config";
import {signOut} from "firebase/auth"
import {useRouter} from "vue-router";
import ProfilePhotoIcon from "@/assets/images/icons/ProfilePhotoIcon.vue";

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
      <main class="mb-24 l   flex gap-20">
        <div class="w-full  relative">
          <!--   COVER   -->
          <div class="w-full h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6"></div>

          <!--   USER PROFILE   -->
          <div class="profile-icon flex justify-center items-center left-0 right-0 mx-auto rounded-full bg-gray-50 w-32 h-32 absolute">

            <ProfilePhotoIcon/>

          </div>
          <div>
            <p class="text-center text-lg font-medium text-gray-950 mt-24">{{user?.displayName}}</p>

          </div>
        </div>


      </main>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  width: 95%;
  margin: 0 auto;
}
.profile-icon {
  top: 192px;
}
</style>