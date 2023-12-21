<script setup lang="ts">

import {onMounted, ref} from "vue";
import ApplicantCard from "@/components/ApplicantCard.vue";

import {doc} from "firebase/firestore";
import {db} from "@/firebase/config";
import {getDoc  } from 'firebase/firestore';


import {useRoute} from "vue-router";
import getDateString from "@/composables/getDate";
const route = useRoute();

const jobId = route.params.id.toString();
const jobListingDoc = doc(db, "jobListings", jobId);
const job = ref();

onMounted(async ()=>{
   await getDoc(jobListingDoc).then((querySnapshot)=>{
     job.value= querySnapshot.data();
   })

})



function createBulletPoints(string: string): string[] {
  return string.replace(/\n/g, '-').split("-")

}

const selectedButton = ref('description');

const selectButton = (button: string) => {
  selectedButton.value = button;
}

</script>

<template>
  <main>

    <div v-if="job" class="job-page-container">

      <div class="job-card">
        <h3>{{job?.jobDescription.title}}</h3>
        <p :class="{'active-post': job.active}"  class="applications">{{job?.applications.length}} {{job?.applications.length <= 1? 'Application': 'Applications'}} </p>
        <p class="post-date">{{ job.active ? "Active" : "Completed" }} {{ getDateString(job.active ? job?.date.postDate : job?.date.endDate) }}</p>
      </div>

      <div class="filter-buttons">
        <button @click="selectButton('description')" class="filter-btn"
                :class="{ selected: selectedButton === 'description' }">Description
        </button>
        <button @click="selectButton('applications')" class="filter-btn"
                :class="{ selected: selectedButton === 'applications' }">Applications
        </button>
      </div>

      <div v-if="selectedButton === 'description'" class="description-container">
        <div class="description-content">
          <p class="title">Overview:</p>
          <p class="content">{{job?.jobDescription.overview}}</p>
        </div>
        <div class="description-content">
          <p class="title">Requirements:</p>
          <ul>
            <li class="content" v-for="requirement in createBulletPoints(job?.jobDescription.requirements)">{{ requirement }}</li>
          </ul>
        </div>

        <div class="description-content">
          <p class="title">Responsibilities:</p>
          <ul>
              <li class="content" v-for="responsibility in createBulletPoints(job?.jobDescription.responsibilities)">{{ responsibility }}</li>
          </ul>
        </div>

        <div class="description-content">
          <p class="title">Salary:</p>
          <p class="content">${{Number(job?.jobDescription.salary).toLocaleString('en-US')}}/year</p>
        </div>

        <div class="edit-buttons">
          <button class="primary-btn">Mark as Completed</button>
          <button class="secondary-btn">Edit</button>
        </div>
      </div>

      <div v-if="selectedButton === 'applications'" class="applicants-container">

        <ApplicantCard firstname="abdallah" lastname="dahmou" status="pending" application-date="18/12/2023"/>
        <ApplicantCard firstname="rania" lastname="samih" status="approved" application-date="20/12/2023"/>
        <ApplicantCard firstname="salwa" lastname="taha" status="rejected" application-date="15/12/2023"/>
      </div>

    </div>
  <div v-else class="job-page-container"><p>Loading...</p></div>

  </main>
</template>

<style lang="scss">

@import "src/assets/styles/globals";


.job-page-container {
  width: 95%;
  margin: 24px auto 80px;
  display: flex;
  gap: 32px;
  flex-direction: column;

  .job-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;


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

.description-container {
  display: flex;
  gap: 24px;
  flex-direction: column;

  .description-content {
    .title {
      color: #0B1221;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
    }
    .content {
      color: #4D4D4D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }


    li {
      margin-left:16px ;
    }


  }
}
.edit-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.primary-btn, .secondary-btn {
  width: 100%;
  height: 56px;
  border-radius: 32px;
  font-size: 16px;


}
.secondary-btn {
  color: $dark;
  border-color: $dark;
  font-size: 16px !important;
  font-weight: 500;

}

.applicants-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


</style>