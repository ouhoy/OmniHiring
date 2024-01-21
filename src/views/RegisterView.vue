<script setup lang="ts">
import {reactive, ref} from "vue";
import GoBack from "@/components/GoBack.vue";
import FormInput from "@/components/FormInput.vue";
import useSignup from "@/composables/useSignup";

import {useRouter} from "vue-router";


const errors = reactive({firstname: "", lastname: "", companyName: "", email: "", password: ""})
const showIndividualForm = ref(true)
const showBusinessForm = ref(false)


const {errorMessage, isPending, signup} = useSignup()
const router = useRouter()


const userType = ref("person")
const firstName = ref("");
const lastName = ref("");
const companyName = ref("");
const email = ref("");
const password = ref("");


function handleToggleClick(isIndividual: boolean) {
  if (isIndividual) {
    showIndividualForm.value = true;
    showBusinessForm.value = false;
  } else {
    showIndividualForm.value = false;
    showBusinessForm.value = true;
  }
  userType.value = showIndividualForm.value ? "person" : "business";

}

function isAlphabetic(name: string) {
  return name.toString().replace(/\s/g, "").match(/^[a-zA-Z]+$/) !== null;
}


function validateName(name: string, inputName: string) {

  // @ts-ignore
  if (!name.replaceAll(" ", "") || name.replaceAll(" ", "").length === 0) {
    return `${inputName} is required.`;

  }

  if (!isAlphabetic(name)) {
    return `${inputName} should only container alphabetical characters.`
  }

  return false
}

async function handleSubmit() {


  !email.value ? (errors.email = "Email is required.") : (errors.email = "")

  if (userType.value === "person") {
    // Validate Name
    validateName(firstName.value, "First name") ?
        (errors.firstname = validateName(firstName.value, "First name").toString()) : errors.firstname = ""


    validateName(lastName.value, "Last name") ?
        (errors.lastname = validateName(lastName.value, "Last name").toString()) : errors.lastname = ""
  }

  if (userType.value === "business") {
    // @ts-ignore
    (companyName.value.replaceAll(" ", "") < 1) ?
        errors.companyName = "Company name is required." : errors.companyName = ""
  }

  // Validate Password
  (password.value.length < 6) ? (errors.password = "Password should be more than 6 characters.") : (errors.password = "")

  if (!errors.password && !errors.email && !errors.firstname && !errors.lastname && !errors.companyName) {

    if (userType.value === "person") {
     await signup("person", `${firstName.value}-${lastName.value}`, email.value, password.value)

    }

    if (userType.value === "business") {
      await signup("business", companyName.value, email.value, password.value)

    }

    if (!errorMessage.value) {

      await router.push('/app')
    }

    if(errorMessage.value.includes("email-already-in-use")) errors.email = "Email already in use.";
  }


}


</script>

<template>
  <main class="login-register-main-container">

    <div class="login-register-container max-w-2xl">
      <GoBack/>

      <div class="titles">
        <h2>Get started with<br>Omni Hiring</h2>
        <p>Already have an account?
          <router-link :to="{name: 'login'}">Login here.</router-link>
        </p>
      </div>

      <div class="form-container">
        <div class="toggle-container">
          <button class="toggle-btn" :class="{ 'selected': showIndividualForm }" @click="handleToggleClick(true)">
            Individual
          </button>
          <button class="toggle-btn" :class="{ 'selected': showBusinessForm }" @click="handleToggleClick(false)">
            Business
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="form-container">

          <div v-if="showIndividualForm" class="full-name-container">

            <FormInput label="First Name" v-model="firstName" placeholder="First name" type="text"
                       :error="errors.firstname"/>
            <FormInput label="Last Name" v-model="lastName" placeholder="Last name" type="text"
                       :error="errors.lastname"/>

          </div>

          <FormInput v-model="companyName" v-if="showBusinessForm" label="Company Name" placeholder="Company name"
                     type="text" :error="errors.companyName"/>
          <FormInput v-model="email" label="Email" placeholder="Email@example.com" type="email" :error="errors.email"/>

          <FormInput v-model="password" label="Password" placeholder="Password" type="password"
                     :error="errors.password"/>


          <div class="checkbox-label">
            <label class="checkbox-container"><span>I agree with <a>Privacy Policy</a> and <a>Terms of Use</a>.</span>
              <input type="checkbox" checked>
              <span class="checkmark"></span>
            </label>
          </div>
          <button class="primary-btn">{{ isPending ? 'Creating Account...' : 'Create Account' }}</button>
          <p class="form-input-error" v-if="!errorMessage.includes('email-already-in-use')">{{ errorMessage }}</p>
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



}
</style>