<script setup lang="ts">

import {onMounted, ref} from "vue";
import ApplicantCard from "@/components/ApplicantCard.vue";

import {arrayUnion, collection, doc, getDocs, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {db} from "@/firebase/config";

import {useRoute} from "vue-router";
import getDateString from "@/composables/getDate";
import GoBack from "@/components/GoBack.vue";
import getUser from "@/composables/getUser";
import ApplicationReview from "@/components/ApplicationReview.vue";

const route = useRoute();

const jobId = route.params.id.toString();
const jobListingDoc = doc(db, "jobListings", jobId);
const job = ref();

const {user} = getUser();
const userType = ref("");
const userRef = collection(db, "users");

const applied = ref(false);
const completed = ref(false);

const selectedApplicant = ref();

onMounted(async () => {

  // Check Logged-in user Type
  await getDocs(userRef)
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const userData = doc.data();

          if (userData.uid === user.value?.uid) {
            userType.value = userData.userType;
          }

        });
      })

  // List Jobs
  onSnapshot(jobListingDoc, (snapshot) => {
    if (snapshot.exists()) {
      job.value = snapshot.data();

      completed.value = job.value.active;
      if(userType.value === 'person') {
        const applications = job.value.applications as [];
        applications.forEach(application =>{

          // @ts-ignore
          if(application?.uid === user?.value?.uid) {
            applied.value = true;
          }
        //   TODO: Make status have a date bv
        })
      }


    } else {
      // Document doesn't exist or has been deleted
      job.value = null;
    }
  });


})

function splitName(name: string): string[] {
  return name.split("-")
}


async function handleApply() {

  if (applied.value) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const applicationDate = `${day}/${month}/${year}`;

  await updateDoc(jobListingDoc, {applications: arrayUnion({uid: user?.value?.uid, date: applicationDate, status: "pending", email: user.value?.email ,firstname:splitName(`${user.value?.displayName}`)[0], lastname:splitName(`${user.value?.displayName}`)[1]})}).catch(e=>{
    alert('Error applying to job, please try again');
    console.log("Error applying to job, please try again:", e);
  })
}

async function handleCompleted() {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const applicationEndDate = `${day}/${month}/${year}`;

  await updateDoc(jobListingDoc, {active: false, "date.endDate": applicationEndDate }).catch(e=>{
    alert('Error updating job starts, please try again');
    console.log("Error updating job starts, please try again: ", e);
  })
}

function createBulletPoints(string: string): string[] {
  return string.replace(/\n/g, '-').split("-")

}

const selectedButton = ref('description');

const selectButton = (button: string) => {
  selectedButton.value = button;
}

function handleApplicationCardClick(person:{}) {
  console.log(person)
  selectedApplicant.value = person;
}
function handleCardClose() {
  selectedApplicant.value = null;

}

async function updateApplicationStatus(action: string) {
  const updateApplication = (application: any) => ({
    ...application,
    status: action === "approve" ? "approved" : "rejected",
  });

  try {
    const doc = await getDoc(jobListingDoc);
    // @ts-ignore
    const applications = doc.data().applications;
    // @ts-ignore
    const updatedApplications = applications.map((application) =>
        application.uid === selectedApplicant.value.uid
            ? updateApplication(application)
            : application
    );

    await updateDoc(jobListingDoc, { applications: updatedApplications });
    console.log("Application status updated successfully!");
  } catch (error) {
    console.error("Error updating application status:", error);
  }
}

async function handleAction(action:"download" | "reject" | "approve") {
  if(action === "download") return;
  await updateApplicationStatus(action);

}

</script>

<template>
  <main>

    <div v-if="job" class="job-page-container">
      <GoBack/>
      <div class="job-card">
        <h3>{{ job?.jobDescription.title }}</h3>
        <p class="publisher" v-if="userType === 'person'">{{job?.publisherName}}</p>
        <p :class="{'active-post': job.active}" class="applications">{{ job?.applications.length }}
          {{ job?.applications.length <= 1 ? 'Application' : 'Applications' }} </p>
        <p class="post-date">{{ job.active ? "Posted" : "Ended" }}
          {{ getDateString(job.active ? job?.date.postDate : job?.date.endDate) }}</p>
      </div>

      <div v-if="userType === 'business'" class="filter-buttons">
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
          <p class="content">{{ job?.jobDescription.overview }}</p>
        </div>
        <div class="description-content">
          <p class="title">Requirements:</p>
          <ul>
            <li class="content" v-for="requirement in createBulletPoints(job?.jobDescription.requirements)">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <div class="description-content">
          <p class="title">Responsibilities:</p>
          <ul>
            <li class="content" v-for="responsibility in createBulletPoints(job?.jobDescription.responsibilities)">
              {{ responsibility }}
            </li>
          </ul>
        </div>

        <div class="description-content">
          <p class="title">Salary:</p>
          <p class="content">${{ Number(job?.jobDescription.salary).toLocaleString('en-US') }}/year</p>
        </div>

        <div v-if="userType === 'business'" class="edit-buttons">
          <button @click="handleCompleted" :class="{'disabled-button': !completed}" class="primary-btn">{{!completed? 'Completed': 'Mark as Completed' }}</button>
          <router-link class="secondary-btn" :to="{name: 'post', params: {id: jobId}}">
            Edit
          </router-link>
        </div>

        <div v-if="userType === 'person'" class="edit-buttons">
          <button @click="handleApply" :class="{'disabled-button': applied}" class="primary-btn">{{applied? 'Application submitted': 'Apply'}}</button>
        </div>
      </div>

      <div v-if="selectedButton === 'applications'" class="applicants-container">
        <div v-if="job.applications.length" v-for="application in job.applications">
          <ApplicantCard @click="handleApplicationCardClick(application)" :key="application.firstname+application.lastname" :firstname="application.firstname" :lastname="application.lastname" :status="application.status" :application-date="application.date"/>

        </div>


        <div v-else><p>There are no applications yet.</p></div>
        <transition name="slide">

          <ApplicationReview v-if="selectedApplicant" @action="handleAction" @close="handleCardClose" :firstname="selectedApplicant.firstname" :lastname="selectedApplicant.lastname" :email="selectedApplicant.email" :status="selectedApplicant.status" :application-date="selectedApplicant.date"/>
        </transition>
      </div>

    </div>
    <div v-else class="job-page-container"><p>Loading...</p></div>

  </main>
</template>

<style lang="scss">

@import "src/assets/styles/globals";
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-in-out ;
}

.publisher {
  font-weight: 500;
}

.slide-leave-to {
  bottom: -400px;

}


.slide-enter-to {
  bottom: 0 !important;


}


.job-page-container {
  width: 95%;
  margin: 24px auto 88px;
  display: flex;
  align-items: flex-start;
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
      margin-left: 16px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media only screen and (min-width: 960px) {



  .edit-buttons {
    display: flex;
    width: 512px;
    flex-direction: row;
    gap: 8px;

  }
  p,li {
    max-width: 704px;
  }

  .job-page-container {
    align-items: center;
    max-width: 704px;

    .job-card {
      align-items: flex-start;
      justify-content: flex-start;
      width: 100%;
    }

    .filter-buttons {
      width: 100%;
    }
  }

}

</style>