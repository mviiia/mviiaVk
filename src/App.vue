<template>
  <router-view>
    <div v-if="userStore.loggedIn == false">
      <el-card class="login_card" style="max-width: 480px; max-height: 600px; margin-top: 5%">
      <template #header>
        <el-button style = "width: 100%;" type="primary" @click="loginBtnHandler">
          Войти
        </el-button >
      </template>
      <img
        src="https://img.freepik.com/premium-photo/3d-vk-logo-application_353336-76.jpg"
        style="width: 100%"
      />
      </el-card>
  </div>
  <div v-else>
    <el-tabs
    v-model="activeName"
    type="card"
    
    @tab-click="handleClick"
  >
    <el-tab-pane label="User" name="first">
      <template #label>
        <img
        style="width: 60px; height: 50px;"
        src="https://w7.pngwing.com/pngs/755/366/png-transparent-vk-user-interface-logo-socialmedia-social-media-flat-icon-thumbnail.png"
        alt="Element logo"
        />
      </template>
      <profile-component v-if="userStore.userInfo"/>
    </el-tab-pane>
    <el-tab-pane label="Друзья" name="second"><FriendsComponent /></el-tab-pane>
    <el-tab-pane label="Видео" name="third"><VideosComponent /></el-tab-pane>
    <el-tab-pane label="Группы" name="fourth"><GroupComponent /></el-tab-pane>
    <el-tab-pane label="Фото" name="fivth"><PhotosComponent /></el-tab-pane>
    </el-tabs>
  </div>
  </router-view>
</template>


<script setup>
import { useUserStore } from "@/store";
import { ref } from 'vue'
import  ProfileComponent  from '@/components/profileComponent/ProfileComponent.vue';
import  FriendsComponent from './components/friendsComponent/FriendsComponent.vue';
import  VideosComponent from './components/videosComponent/VideosComponent.vue';
import GroupComponent from "./components/groupsComponent/GroupComponent.vue";
import PhotosComponent from "./components/photosComponent/PhotosComponent.vue";

const userStore = useUserStore();
const randomState = uuidv4();

const loginBtnHandler = async () => {
  const url = `https://oauth.vk.com/authorize?client_id=${userStore.APP_ID}&display=page&redirect_uri=http://localhost:5173/&scope=notifications,notify,friends,photos,video,stories,pages,groups,wall&response_type=token&v=${userStore.VERSION}&state=${randomState}`;

  window.location.href = url;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const init = async () => {
  const currentUrl = window.location.href;

  const token = localStorage.getItem("access_token");
  const expirationDate = localStorage.getItem("expiration_date");
  const expDateSec = new Date().getTime() / 1000;
  if (token && expDateSec < expirationDate) {
    const userId = localStorage.getItem("user_id");
    userStore.access_token = token;
    userStore.userId = Number(userId);
    userStore.loggedIn = true;

    await userStore.loadUserInfo();
  }

  if (currentUrl.includes("access_token") && userStore.loggedIn == false) {
    const hashIndex = currentUrl.indexOf("#");
    const queryString = currentUrl.substring(hashIndex + 1);
    console.log(queryString);

    const query = parseQuery(queryString);

    userStore.access_token = query.access_token;
    userStore.userId = Number(query.user_id);
    userStore.loggedIn = true;

    const expDateSec = new Date().getTime() / 1000;
    const expDateInSeconds = expDateSec + Number(query.expires_in);

    localStorage.setItem("access_token", userStore.access_token);
    localStorage.setItem("expiration_date", expDateInSeconds);
    localStorage.setItem("user_id",query.user_id);

    await userStore.loadUserInfo();
  }
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}

init();

</script>

<style scoped>

.login_card {
    /* position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0; */

    position:absolute; left:0; top:0; right:0; bottom:0; margin:auto;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */
}
</style>
