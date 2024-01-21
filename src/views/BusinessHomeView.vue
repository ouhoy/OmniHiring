<script setup lang="ts">


import {db} from "@/firebase/config";
import {arrayUnion, doc, getDocs, updateDoc} from "firebase/firestore";
import {collection, addDoc} from "firebase/firestore";



import Card from "@/components/Card.vue";
import getUser from "@/composables/getUser";
import {onMounted, ref} from "vue";

const {user} = getUser();


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
const userRef = collection(db, "users");




onMounted(async ()=>{

  // Get Job Listings
  await getDocs(jobListingRef)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const jobData = doc.data();

          if(jobData.publisherId === user.value?.uid) {
            jobs.value.push({...jobData, docId: doc.id})
          }

        });
        filteredJobs.value = jobs.value
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
      <div class="job-posting-container">
        <div v-if="jobs.length != 0" v-for="job in filteredJobs">
          <Card :id="job.docId" :title="job.jobDescription.title" :post-date="job.date.postDate" :end-date="job.date.endDate" :state=job.active :applications="job.applications.length"/>
        </div>
        <div v-else>Loading...</div>
      </div>

    </div>
  </main>
</template>

<style lang="scss">

@import "src/assets/styles/globals";
.home-app-container {
  width: 95%;
  margin: 24px auto 88px;
  display: flex;
  flex-direction: column;
  gap: 16px;


}
.job-posting-container {
  width: 100%;
  margin: 24px auto 88px;
  display: flex ;
  flex-direction: column;
  gap: 16px;
}

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

@media only screen and (min-width: 960px) {
  .job-posting-container {

    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three equal columns */
    gap: 16px;
  }
}

</style>