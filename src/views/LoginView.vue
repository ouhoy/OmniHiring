<script setup lang="ts">
import {ref} from "vue";
import GoBack from "@/components/GoBack.vue";

const error = ref("")
</script>

<template>
  <main>
    <div class="login-register-container">
      <GoBack/>
      <div class="titles">
        <h2>Welcome back to<br>Omni Hiring</h2>
        <p>Already have an account? <router-link :to="{name: 'register'}">Register here.</router-link></p>
      </div>
      <div class="form-container">

        <form class="form-container">

          <div class="input-container">
            <label>Email</label>
            <input type="email" name="email" id="email" placeholder="Email@example.com">
            <div v-if="error" class="form-input-error">
              <p></p>
            </div>
          </div>

          <div class="input-container">
            <div class="password-label">
              <label >Password</label>
              <p>Forgot Your Password?</p>
            </div>

            <input type="password" name="password" id="password" placeholder="Password">
            <div v-if="error" class="form-input-error">
              <p></p>
            </div>
          </div>

          <div class="checkbox-label">
            <label class="checkbox-container"><p>Remember me</p>
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

<style scoped lang="scss">

</style>