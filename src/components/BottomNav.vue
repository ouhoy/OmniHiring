<script setup lang="ts">

import IconAddSquare from "@/components/icons/IconAddSquare.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconUser from "@/components/icons/IconUser.vue";
import { useRoute } from 'vue-router';
import {ref, onMounted} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";
import getUser from "@/composables/getUser";
const route = useRoute();
const {user} = getUser();

const userType = ref()
function isActive(routePath:string) {
  return route.path === routePath;
}


const userRef = collection(db, "users");

onMounted(async ()=>{

  // TODO: Make this reusable
  // Check Logged-in user Type
  await getDocs(userRef)
      .then(querySnapshot=>{
        querySnapshot.forEach(doc => {
          const userData = doc.data();

          if(userData.uid === user.value?.uid) {
            userType.value = userData.userType;
            console.log(userData.userType);
          }

        });
      })
})

</script>

<template>
<nav class="hide-for-desktop" v-if="userType === 'business'">
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