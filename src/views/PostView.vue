<script setup lang="ts">

import FormInput from "@/components/FormInput.vue";
import FormTextarea from "@/components/FormTextarea.vue";
import {reactive, ref} from "vue";
import GoBack from "@/components/GoBack.vue";

const errors = reactive({title: "", overview: "", requirements: "", responsibilities: "", salary: ""})
const title = ref("");
const overview = ref("");
const requirements = ref("");
const responsibilities = ref("");
const salary = ref<number>();

function handleSubmit() {

  (title.value.length === 0)? (errors.title = "Job title is required."): errors.title = "";

  (overview.value.length === 0)? (errors.overview = "Overview is required."): errors.overview = "";
  (overview.value.length <112)? (errors.overview = "Overview is too short."): errors.overview = "";

  (requirements.value.length === 0)? (errors.requirements = "Requirements are required."): errors.requirements = "";
  (requirements.value.length <88)? (errors.requirements = "Requirements are too short."): errors.requirements = "";


  (responsibilities.value.length === 0)? (errors.responsibilities = "Responsibilities are required."): errors.responsibilities = "";
  (responsibilities.value.length <88)? (errors.responsibilities = "Responsibilities are too short."): errors.responsibilities = "";




}

</script>

<template>


  <main>
    <div class="post-form-container">
      <GoBack/>
      <h3>Job publication form</h3>
      <form class="form-container" @submit.prevent="handleSubmit">
        <FormInput :model-value="title" label="Job Title" placeholder="Job title" type="text" :error="errors.title"/>
        <FormTextarea :model-value="overview" label="Overview" placeholder="Overview" :error="errors.overview"
                      rows="8"/>
        <FormTextarea :model-value="requirements" label="Requirements" placeholder="Requirements"
                      :error="errors.requirements" rows="8"/>
        <FormTextarea :model-value="responsibilities" label="Responsibilities" placeholder="Responsibilities"
                      :error="errors.responsibilities" rows="8"/>
        <FormInput :model-value="salary" label="Salary" placeholder="Salary/year" type="number" :error="errors.title"/>
        <button class="primary-btn">Publish</button>
      </form>
    </div>

  </main>


</template>

<style lang="scss">
@import "src/assets/styles/form";

.post-form-container {
  width: 95%;
  margin: 24px auto 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}

</style>