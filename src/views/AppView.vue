<script setup lang="ts">


import {db} from "@/firebase/config";
import {getDocs} from "firebase/firestore";
import {collection} from "firebase/firestore";

import getUser from "@/composables/getUser";
import {onMounted, ref} from "vue";
import PersonHomeView from "@/views/PersonHomeView.vue";
import BusinessHomeView from "@/views/BusinessHomeView.vue";

const {user} = getUser()

const userType = ref("");
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



  <component :is="userType === 'person'? 'PersonHomeView': 'BusinessHomeView'"/>
  <PersonHomeView v-if="userType === 'person'"/>
  <BusinessHomeView v-else-if="userType === 'business'"/>
</template>

