<script setup lang="ts">


import {db} from "@/firebase/config";
import {arrayUnion, doc, getDocs, updateDoc} from "firebase/firestore";
import {collection, addDoc} from "firebase/firestore";



import Card from "@/components/Card.vue";
import getUser from "@/composables/getUser";
import {onMounted, ref} from "vue";

const {user} = getUser()

const jobs = ref([] as any[])
const filteredJobs = ref([] as any[])
const selectedButton = ref('all');
const selectButton = (button:string) => {
  selectedButton.value = button;


  if(button === "active") filteredJobs.value = jobs.value.filter((job)=>job.active === true);
  if(button === "completed") filteredJobs.value = jobs.value.filter((job)=>job.active === false);
  if(button === "all") filteredJobs.value = jobs.value
};

const jobListingRef = collection(db, "jobListings");



onMounted(async ()=>{
  await getDocs(jobListingRef)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const jobData = doc.data();

          if(jobData.publisherId === user.value?.uid) {
            jobs.value.push(jobData)
          }

        });

      })
      .catch(error => {
        console.error('Error getting documents: ', error);
      });
})


</script>

<template>


  <main>
    <div class="home-app-container">
      <div class="filter-buttons">
        <button @click="selectButton('all')"  class="filter-btn" :class="{ selected: selectedButton === 'all' }">All</button>
        <button @click="selectButton('active')"  class="filter-btn" :class="{ selected: selectedButton === 'active' }">Active</button>
        <button @click="selectButton('completed')" class="filter-btn" :class="{ selected: selectedButton === 'completed' }">Completed</button>
      </div>
  <div v-for="job in filteredJobs">
    <Card :title="job.jobDescription.title" :post-date="job.date.postDate" :state=job.active :applications="job.applications.length"/>
  </div>
  <Card title="Junior Graphic Designer" post-date="17/12/2023" :state=true :applications="15"/>
  <Card title="Frontend Developer - React" post-date="12/12/2023" :state=true :applications="8"/>
  <Card title="Nodejs Developer" post-date="16/12/2023" :state=false :applications="6"/>
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

  .filter-buttons {
    display: flex;
    gap: 8px;

    .filter-btn {
      border-radius: 32px;
      border: 1px solid #2D353C;
      background-color: white;
      padding: 8px 16px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;

    }

    .selected {
      color: white;
      background-color: #2D353C;
    }
  }
}


</style>