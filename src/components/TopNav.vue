<script setup lang="ts">

import IconTopNavLogo from "@/components/icons/IconTopNavLogo.vue";
import IconNavMenu from "@/components/icons/IconNavMenu.vue";
import {ref} from "vue";

import getUser from "@/composables/getUser";
import {auth, db} from "@/firebase/config";
import {signOut} from "firebase/auth"
import {useRouter} from "vue-router";
import {collection, getDocs} from "firebase/firestore";
import {onMounted} from "vue";

const router = useRouter()
const {user} = getUser();

async function handleLogout() {
  await signOut(auth)
  if (!user.value) {
    await router.push('/')
  }

}

const showMenu = ref(false)

function handleMenuClick() {
  showMenu.value = !showMenu.value;
}


const userType = ref("");
const userRef = collection(db, "users");

onMounted(async ()=>{

  await getDocs(userRef)
      .then(querySnapshot=>{
        querySnapshot.forEach(doc => {
          const userData = doc.data();

          if(userData.uid === user.value?.uid) {
            userType.value = userData.userType;
            console.log(userData.userType);
          }

        });
      })
})

</script>

<template>
<nav>
<router-link :to="{name: 'app'}">
  <IconTopNavLogo/>
</router-link>
  <div class="flex items-center justify-center gap-6">
    <router-link :to="{name: 'post'}">
    <p v-if="userType === 'business'" class="hidden md:block text-blue-600 cursor-pointer">Post new job</p>
    </router-link>
    <div class="menu-container">
      <IconNavMenu @click="handleMenuClick"/>
      <div v-if="showMenu" class="menu">
        <div class="user">
          <div class="icon-user">
            <img class="user-img" src="../assets/images/user.png" alt="user image" srcset="">
          </div>
          <router-link :to="{name: 'profile'}" class="user-details">

            <p class="name">{{ user?.displayName?.replace("-", " ") }}</p>
            <p class="email">{{user?.email}}</p>
          </router-link>

        </div>

        <div class="links">
          <p @click="handleLogout">Logout</p>
        </div>
      </div>

    </div>

  </div>
</nav>
</template>

<style scoped lang="scss">
@import "src/assets/styles/globals";

nav {
  width: 95%;
  margin: 24px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    transition: $main-transition;

    &:active {
      transform: scale(0.99);
    }

  }
}

.menu-container {
  position: relative;
  svg {
    transition: $main-transition;

    &:active {
      transform: scale(0.95);
    }
  }
}


.menu {
  padding:16px;
  border-radius: 8px;
  position: absolute;
  z-index: 10;
  top: 24px;
  right: 25%;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  .user {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }
  .icon-user {
    img {
      width: 48px !important;
      height: 48px !important;

    }
  }

  .user-img {
    width: 48px !important;
    height: 48px !important;
  }
  .user-details {
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 8px;
    .name {
      color: #2D353C;
      font-size: 16px;
      font-weight: 500;
      line-height: 16px; /* 100% */
    }
    .email {
      color: #4D4D4D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
    }
  }
  .links {
    border-top: 1px solid #ddd;
    padding-top: 16px;
    margin-top: 16px;
    p {
      color: #2D353C;
      font-size: 16px;
      font-weight: 400;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      transition: $main-transition;

      &:hover, &:active {
        background-color: #f3f3f3;


      }


      &:active {
        transform: scale(0.99);
      }
    }
  }
}
</style>