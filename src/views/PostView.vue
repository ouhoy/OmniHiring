<script setup lang="ts">

import FormInput from "@/components/FormInput.vue";
import GoBack from "@/components/GoBack.vue";
import FormTextarea from "@/components/FormTextarea.vue";


import {doc, updateDoc} from "firebase/firestore";

import {reactive, ref} from "vue";
import getUser from "@/composables/getUser";
import {collection, addDoc} from "firebase/firestore";
import {db} from "@/firebase/config";

import { getFirestore, getDocs,arrayUnion  } from 'firebase/firestore';


const errors = reactive({title: "", overview: "", requirements: "", responsibilities: "", salary: ""})
const title = ref("");
const overview = ref("");
const requirements = ref("");
const responsibilities = ref("");
const salary = ref("");

const isPending = ref(false);
const {user} = getUser()

async function handleSubmit() {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');

  const postDate = `${day}/${month}/${year}`;


  (title.value.length === 0) ? (errors.title = "Job title is required.") : errors.title = "";

  (overview.value.length < 112) ? (errors.overview = "Overview is too short.") : errors.overview = "";
  (requirements.value.length < 88) ? (errors.requirements = "Requirements are too short.") : errors.requirements = "";
  (responsibilities.value.length < 88) ? (errors.responsibilities = "Responsibilities are too short.") : errors.responsibilities = "";

  console.log(overview.value.replace(/\n/g, '-').split("-"))

  const jobListingRef = collection(db, "jobListings");


  const newDocRef =   await addDoc(jobListingRef, {
    active: true,
    applications: [],
    publisherId: user.value.uid,
    publisherName: user.value.displayName,
    date: {postDate, endDate: ""},
    jobDescription: {
      title: title.value,
      overview: overview.value,
      requirements: requirements.value,
      responsibilities: responsibilities.value,
      salary: Math.abs(Number(salary.value)),

    }
  });

  const userRef = collection(db, "users");


 const docId = await getDocs(userRef)
      .then(querySnapshot => {
        isPending.value = true;
        querySnapshot.forEach(docu => {
          // Access each document's data
          const userData = docu.data();

          // To find a doc ID that matches your query
          // if(userData.userType === "business") {
          //   console.log("Here is the biz doc ID: ", doc.id)
          // }

          if(userData.userType === "business" && userData.uid === user.value.uid) {
            console.log("Here is the biz name: ", userData.displayName)

            const docRef = doc(db, "users", docu.id);
            updateDoc(docRef, {listings: arrayUnion(newDocRef)})



          }

          // Clear Inputs
          title.value = "";
          salary.value = "";
          overview.value = "";
          requirements.value = "";
          responsibilities.value = "";
          isPending.value = false;

        });
      })
      .catch(error => {
        console.error('Error getting documents: ', error);
        isPending.value = false;

      });

// TODO: Redirect After Publish




}

</script>

<template>


  <main>
    <div class="post-form-container">
      <GoBack/>
      <h3>Job publication form</h3>
      <form class="form-container" @submit.prevent="handleSubmit">
        <FormInput v-model="title" label="Job Title" placeholder="Job title" type="text" :error="errors.title"/>
        <FormTextarea v-model="overview" label="Overview" placeholder="Overview" :error="errors.overview"
                      :rows='8'/>
        <FormTextarea v-model="requirements" label="Requirements" placeholder="Requirements"
                      :error="errors.requirements" :rows='8'/>
        <FormTextarea v-model="responsibilities" label="Responsibilities" placeholder="Responsibilities"
                      :error="errors.responsibilities" :rows='8'/>
        <FormInput v-model="salary" label="Salary" placeholder="Salary/year" type="number" :error="errors.title"/>
        <button class="primary-btn">{{isPending? "Publishing...": "Publish"}}</button>
      </form>
    </div>

  </main>


</template>

<style lang="scss">
@import "src/assets/styles/form";

.post-form-container {
  width: 95%;
  margin: 24px auto 88px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}

</style>