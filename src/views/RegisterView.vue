<script setup lang="ts">

import {reactive, ref} from "vue";
import GoBack from "@/components/GoBack.vue";
import FormInput from "@/components/FormInput.vue";

const error = ref("")
const errors = reactive({firstname: "", lastname: "", companyName: "", email: "", password:""})
const showIndividualForm = ref(true)
const showBusinessForm = ref(false)


const userType = ref("person")
const firstName = ref("");
const lastName = ref("");
const companyName = ref("");
const email = ref("");
const password =ref("");



function handleToggleClick(isIndividual: boolean) {
  if (isIndividual) {
    showIndividualForm.value = true;
    showBusinessForm.value = false;
  } else {
    showIndividualForm.value = false;
    showBusinessForm.value = true;
  }
   userType.value = showIndividualForm.value? "person": "business";

}


function handleSubmit() {
  errors.email = "Please make sure to enter your email!";
  console.log(firstName.value)
}



</script>

<template>
  <main>
    <div class="login-register-container">
      <GoBack/>

      <div class="titles">
        <h2>Get started with<br>Omni Hiring</h2>
        <p>Already have an account? <router-link :to="{name: 'login'}">Login here.</router-link></p>
      </div>

      <div class="form-container">
        <div class="toggle-container">
          <button class="toggle-btn" :class="{ 'selected': showIndividualForm }" @click="handleToggleClick(true)">Individual</button>
          <button class="toggle-btn" :class="{ 'selected': showBusinessForm }" @click="handleToggleClick(false)">Business</button>
        </div>

        <form @submit.prevent="handleSubmit" class="form-container">

          <div v-if="showIndividualForm" class="full-name-container">

            <FormInput label="First Name" v-model="firstName" placeholder="First name" type="text" :error="errors.firstname"/>
            <FormInput label="Last Name" v-model="lastName" placeholder="Last name" type="text" :error="errors.lastname"/>

          </div>

          <FormInput v-model="companyName" v-if="showBusinessForm" label="Company Name" placeholder="Company name" type="text" :error="errors.companyName"/>
          <FormInput v-model="email" label="Email" placeholder="Email@example.com" type="email" :error="errors.email"/>

          <FormInput v-model="password" label="Password" placeholder="Password" type="password" :error="errors.password"/>



     <div class="checkbox-label">
       <label class="checkbox-container"><span>I agree with <a>Privacy Policy</a> and <a>Terms of Use</a>.</span>
         <input type="checkbox" checked>
         <span class="checkmark"></span>
       </label>
     </div>

      <button class="primary-btn">Create Account</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "src/assets/styles/form";
.login-register-container {

  p {
    font-weight: 500;
  }

  width: 95%;
  margin: 16px auto 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: flex-start;
  justify-content: center;
  .titles {
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    p {
      color: #4D4D4D;
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: -0.408px;
    }
  }

  .form-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
  }

}
</style>