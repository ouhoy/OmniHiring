<script setup lang="ts">
import {reactive, ref} from "vue";
import GoBack from "@/components/GoBack.vue";
import FormInput from "@/components/FormInput.vue";
import useLogin from "@/composables/useLogin";
import {useRouter} from "vue-router";


const router = useRouter()

const {errorMessage, isPending, login} = useLogin();

const errors = reactive({password: "", email: ""})
const email = ref("");
const password = ref("");

async function handleLogin() {


  !email.value ? errors.email = "Email is required" : errors.email = "";
  !password.value ? errors.password = "Password is required" : errors.password = "";

  if (errors.email || errors.password) return;

  await login(email.value, password.value)

  if (!errorMessage.value) await router.push("/app");
  else console.log(errorMessage)

  if(errorMessage.value.includes("invalid-credential")) {
    errors.password = "Incorrect email or password.";
    errors.email = "Incorrect email or password."
  }
}
</script>


<template>
  <main class="login-register-main-container">

    <div class="login-register-container max-w-lg">
      <GoBack/>
      <div class="titles">
        <h2>Welcome back to<br>Omni Hiring</h2>
        <p>Don't have an account?
          <router-link :to="{name: 'register'}">Register here.</router-link>
        </p>
      </div>
      <div class="form-container">

        <form @submit.prevent="handleLogin" class="form-container">

          <FormInput v-model="email" label="Email" placeholder="Email@example.com" type="email" :error="errors.email"/>
          <FormInput v-model="password" label="Password" placeholder="Password" type="password"
                     :error="errors.password"/>


          <a class="forgot-password">Forgot your password?</a>

          <button  class="primary-btn">{{isPending? 'Login...': 'Login' }} </button>



          <p class="form-input-error" v-if="!errorMessage.includes('invalid-credential')">{{ errorMessage}}</p>
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "src/assets/styles/form";
@import "src/assets/styles/form";

.login-register-container {
  .forgot-password {
    font-size: 14px;
    font-weight: 500;
  }

  width: 95%;
  margin: 16px auto 0;
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: flex-start;
  justify-content: center;

  p {
    font-weight: 500;
  }

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

@media only screen and (min-width: 960px) {

  .login-register-container {
    max-width: 512px;



  }
  .login-register-main-container {


    .img-container {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

  }

  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 95%;
      max-height:832px;
      width: 95%;
      border-radius: 16px;
    }
  }

}
</style>