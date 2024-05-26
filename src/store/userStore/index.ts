import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInfo } from './types';
import { getProfileInfo } from '@/api';

export const useUserStore = defineStore('userStore', () => {
    const loggedIn = ref(false);
    const access_token = ref<string | null>(null);
    const userId = ref<number | null>();
    const userInfo = ref<UserInfo | null>(null);
    const APP_ID = 51922062;
    const VERSION = "5.199";

    const loadUserInfo = async () => {
      if (access_token.value){
      await getProfileInfo(access_token.value, VERSION).then((resp: any) => {
        const response = resp.data.response;
         userInfo.value = { 
          firstName: response.first_name,
          lastName: response.last_name,
          img_path: response.photo_200,
          city: response?.city?.title ?? "-",
          sex: response.sex == 2 ? "Мужской" : "Женский",
          country: response.country?.title ?? "-",
          phone: response.phone,
          birthDate: response.bdate
       };
      })}
    }

    const logOut = () => {
      access_token.value = null;
      userId.value = null;
      userInfo.value = null;
      loggedIn.value = false;

      localStorage.setItem("access_token", '');
      localStorage.setItem("expiration_date", '');
      localStorage.setItem("user_id",'');
    }

    return { loggedIn, access_token, userId, userInfo, VERSION, APP_ID, loadUserInfo, logOut };
  });

