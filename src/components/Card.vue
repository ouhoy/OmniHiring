<script setup lang="ts">
const {applications, title, postDate, state} = defineProps<{
  applications: number,
  title: string,
  postDate: string,
  state: boolean
}>()

function getDateString(postedDate) {
  // Convert the posted date string ("20/12/2023") to a Date object
  const dateParts = postedDate.split('/'); // Assuming the date format is "DD/MM/YYYY"
  const posted = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

  // Get the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - posted.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return 'since today';
  } else {
    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  }
}

</script>

<template>
  <div  class="card">
    <p :class="{'active-post': state}"  class="applications">{{ applications }} applications</p>
    <p class="title">{{ title }}</p>
    <p class="post-date">{{state?"Active": "Completed" }} {{ getDateString(postDate) }}</p>
  </div>
</template>

<style  lang="scss">

@import "src/assets/styles/globals";

.card {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 16px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid #D9D9D9;
  cursor: pointer;
  transition: $main-transition;

  &:active {
    transform: scale(0.99);
  }

  .active-post {
    color: $green-dark-active !important;
    background-color: $green-light !important;

  }
  .applications {
    color: #1E1E1E;
    background: #E7E7E7;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 100% */

    border-radius: 5px;
    padding: 8px;

  }

  .title {
    color: #2D353C;
    font-weight: 500;
    line-height: 16px;
  }

  .post-date {
    color: #4D4D4D;
    font-size: 14px;
    font-weight: 400;

  }
}
</style>