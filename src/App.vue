<script setup lang="ts">
import {  RouterView } from 'vue-router'
import TopNav from "@/components/TopNav.vue";
import getUser from "@/composables/getUser";
import BottomNav from "@/components/BottomNav.vue";
import {onMounted, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/config";

const {user} = getUser();
const userType = ref("");

const userRef = collection(db, "users");


onMounted(async ()=>{
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

<div v-if="user">
  <TopNav/>

  <BottomNav v-if="userType === 'business'"/>
</div>
  <RouterView />
</template>

<style lang="scss">


</style>
