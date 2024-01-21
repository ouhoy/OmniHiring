<script setup lang="ts">

import IconCloseCircle from "@/components/icons/IconCloseCircle.vue";
import getDateString from "@/composables/getDate";

defineProps<{ firstname: string, lastname: string, email: string, status: string, applicationDate: string, uid: string }>()

const emit = defineEmits();


function capitalizeFirstLetter(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

function handleResume() {

  emit("action", "download")

}

function handleApprove() {
  emit("action", "approve")

}

function handleReject() {
  emit("action", "reject")

}

function handleClose() {
  emit("close")

}
</script>

<template>

  <div class="applicant-card-container">
    <div class="application-review">
      <p>Application Review</p>
      <IconCloseCircle @click="handleClose"/>
    </div>
    <div class="application-card-content">
      <p :class="['applications', { 'pending': status === 'pending', 'rejected': status === 'rejected', 'active-post': status === 'approved' }]">
        {{ capitalizeFirstLetter(status) }}
      </p>
      <p class="title">{{ capitalizeFirstLetter(firstname) }} {{ lastname.toUpperCase() }}</p>
      <div class="email">{{ email }}</div>
      <p class="post-date">Applied {{ getDateString(applicationDate) }}</p>

    </div>
    <div class="application-buttons">
      <a target="_blank"
         :href="'https://firebasestorage.googleapis.com/v0/b/omni-hiring.appspot.com/o/'+ uid+ '?alt=media&token=2dd157fa-7373-47bf-abb0-bdc775cdb015'"
         @click="handleResume" class="primary-btn">Download Resume</a>
      <button @click="handleApprove" class=" secondary-btn success-secondary-btn">Approve Application</button>
      <button @click="handleReject" class=" secondary-btn danger-secondary-btn">Reject Application</button>
    </div>
  </div>
</template>

<style lang="scss">


.applicant-card-container {
  position: fixed;
  margin: 0 auto;
  padding: 8px 0 24px;
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 97%;
  background-color: white;
  border: 1px solid #dadada;
  box-shadow: 0 0 16px 0 rgba(112, 111, 111, 0.2);
  display: flex;
  gap: 24px;
  flex-direction: column;

  .application-review {
    width: 100%;
    padding: 8px 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.3px solid #c9c9c9;

    svg {
      cursor: pointer;
    }

    p {
      font-weight: 500;
      padding: 8px 0;
    }
  }

  .application-card-content {
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    gap: 8px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
  }

  .application-buttons {
    padding: 0 16px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      width: 100%;
    }
  }

  .email {
    font-weight: 500;
    color: #4D4D4D;
    font-size: 14px;
    line-height: 14px;
  }

  .title {
    color: #2D353C;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px; /* 100% */
  }

}

@media only screen and (min-width: 960px) {
  .applicant-card-container {
    max-width: 728px;
  }
}


</style>