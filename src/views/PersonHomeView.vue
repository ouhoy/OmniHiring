<script setup lang="ts">


import {db} from "@/firebase/config";
import {arrayUnion, doc, getDocs, updateDoc} from "firebase/firestore";
import {collection, addDoc} from "firebase/firestore";


import Card from "@/components/Card.vue";
import {onMounted, ref} from "vue";


const jobs = ref([] as any[])
const filteredJobs = ref([] as any[])

const jobListingRef = collection(db, "jobListings");


onMounted(async ()=>{

  // Get Job Listings
  await getDocs(jobListingRef)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const jobData = doc.data();
          if(jobData.active) jobs.value.push({...jobData, docId: doc.id})

          console.log("Here are the jobs: ",jobs.value)
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
    <div class="home-app-person-container">

      <div class="w-full" v-if="jobs.length != 0" v-for="job in filteredJobs">
        <Card :id="job.docId" :title="job.jobDescription.title" :post-date="job.date.postDate" :end-date="job.date.endDate" :state=job.active :applications="job.applications.length"/>
      </div>
      <div v-else>Loading...</div>

    </div>
  </main>
</template>

<style lang="scss">

@import "src/assets/styles/globals";
.home-app-person-container {
  width: 95%;
  margin: 24px auto 88px;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;


}

@media only screen and (min-width: 960px) {
  .home-app-person-container {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr); /* Three equal columns */
    gap: 16px;
  }
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


</style>