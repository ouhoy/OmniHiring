<script setup lang="ts">

import {reactive, ref} from "vue";
import GoBack from "@/components/GoBack.vue";
import IconCircleExclamation from "@/components/icons/IconCircleExclamation.vue";

const error = ref("")
const errors = reactive({firstname: "", lastname: "", email: "", password:""})
const showIndividualForm = ref(true)
const showBusinessForm = ref(false)
function handleToggleClick(isIndividual: boolean) {
  if (isIndividual) {
    showIndividualForm.value = true;
    showBusinessForm.value = false;
  } else {
    showIndividualForm.value = false;
    showBusinessForm.value = true;
  }
}


function handleSubmit() {
  errors.email = "Please make sure to enter your email!"
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

            <div class="input-container">
              <label>First Name</label>
              <input type="text" name="firstname" id="firstname" placeholder="First name">
              <div v-if="error" class="form-input-error">
                <p></p>
              </div>
            </div>

            <div class="input-container">
              <label>Last Name</label>
              <input type="text" name="lastname" id="lastname" placeholder="Last name">
              <div v-if="error" class="form-input-error">
                <p></p>
              </div>
            </div>
          </div>
          <div v-if="showBusinessForm" class="input-container">
            <label>Company Name</label>
            <input type="text" name="company" id="company" placeholder="Company name">
            <div v-if="error" class="form-input-error">
              <p></p>
            </div>
          </div>
          <div class="input-container">
            <label>Email</label>
            <input type="email" name="email" id="email" placeholder="Email@example.com">
            <div v-if="errors.email" class="form-input-error">

              <p>{{errors.email}}</p>
            </div>
          </div>

          <div class="input-container">
            <label>Password</label>
            <input type="password" name="password" id="password" placeholder="Password">
              <div v-if="error" class="form-input-error">
                <p></p>
              </div>
          </div>

     <div class="checkbox-label">
       <label class="checkbox-container"><p>I agree with <a>Privacy Policy</a> and <a>Terms of Use</a>.</p>
         <input type="checkbox" >
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