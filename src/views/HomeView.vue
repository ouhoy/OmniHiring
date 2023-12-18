<script setup lang="ts">
</script>

<template>
  <main>
    <div class="onboarding-container">
      <div class="onboarding-content">
        <img src="../assets/images/omnihiring-logo.svg" alt="" srcset="">
        <div class="onboarding-titles">
          <h2>Simplifying Work life<br>and Progress Tracking</h2>
          <p>Step into a comprehensive space, tracking progress and enhancing work experiences effortlessly.</p>
        </div>

      </div>
      <div class="onboarding-buttons">
        <button class="primary-btn">Create Account</button>
        <button class="secondary-btn">Login</button>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "src/assets/styles/globals";

.onboarding-container {
  width: 95%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .onboarding-content {
    margin-top: 64px;
    display: flex;
    gap: 40px;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .onboarding-titles {
      display: flex;
      gap: 8px;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h2 {
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 40px;
        letter-spacing: -0.408px;
      }

      p {
        color: #4D4D4D;

        text-align: center;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.408px;
      }
    }


  }

  .onboarding-buttons {

    width: 100%;
    margin-bottom: 32px;

    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
  }
}
</style>