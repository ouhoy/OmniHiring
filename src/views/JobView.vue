<script setup lang="ts">

import {ref} from "vue";

const selectedButton = ref('description');

const selectButton = (button: string) => {
  selectedButton.value = button;
}

</script>

<template>
  <main>
    <div class="job-page-container">

      <div class="job-card">
        <h3>Junior Graphic Designer</h3>
        <p class="applications active-post">15 Applications</p>
        <p class="post-date">Active 3 days ago</p>
      </div>

      <div class="filter-buttons">
        <button @click="selectButton('description')" class="filter-btn"
                :class="{ selected: selectedButton === 'description' }">Description
        </button>
        <button @click="selectButton('applications')" class="filter-btn"
                :class="{ selected: selectedButton === 'applications' }">Applications
        </button>
      </div>

      <div class="description-container">
        <div class="description-content">
          <p class="title">Overview:</p>
          <p class="content">Established in 2013, LixCap focuses on economic development in emerging markets, serving government agencies, private sector companies and several donor agencies such as USAID, the World Bank Group, and the European Bank for Reconstruction and Development.</p>
        </div>
        <div class="description-content">
          <p class="title">Requirements:</p>
          <p class="content">Established in 2013, LixCap focuses on economic development in emerging markets, serving government agencies, private sector companies and several donor agencies such as USAID, the World Bank Group, and the European Bank for Reconstruction and Development.</p>
        </div>

        <div class="description-content">
          <p class="title">Responsibilities:</p>
          <ul>
            <li class="content">Create captivating designs such as brochures, presentations, reports, and social media graphics for various client standards.</li>
            <li class="content">Work closely with different departments to fulfill various design needs.</li>
            <li class="content">Stay updated with the latest design trends and tools for innovative designs.</li>

          </ul>
        </div>

        <div class="description-content">
          <p class="title">Salary:</p>
          <p class="content">$80,000/year</p>
        </div>
      </div>

      <div class="edit-buttons">
        <button class="primary-btn">Mark as Completed</button>
        <button class="secondary-btn">Edit</button>
      </div>
    </div>


  </main>
</template>

<style lang="scss">

@import "src/assets/styles/globals";


.job-page-container {
  width: 95%;
  margin: 24px auto 80px;
  display: flex;
  gap: 32px;
  flex-direction: column;

  .job-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    justify-content: flex-start;

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

    .post-date {
      color: #4D4D4D;
      font-size: 14px;
      font-weight: 400;

    }

  }


}

.filter-buttons {
  display: flex;
  gap: 8px;

  .filter-btn {
    border-radius: 32px;
    border: 1px solid #2D353C;
    background-color: white;
    padding: 8px 16px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;

  }

  .selected {
    color: white;
    background-color: #2D353C;
  }
}

.description-container {
  display: flex;
  gap: 24px;
  flex-direction: column;

  .description-content {
    .title {
      color: #0B1221;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px;
    }
    .content {
      color: #4D4D4D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }


    li {
      margin-left:16px ;
    }


  }
}
.edit-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
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


</style>