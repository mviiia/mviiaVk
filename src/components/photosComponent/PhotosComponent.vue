<template>
    <h2>Фотографии профиля</h2>
    <el-carousel height="auto" :interval="5000" arrow="always">
      <el-carousel-item style="height: 600px" v-for="item in image_urls" :key="item.url">
        <img
            :src=item.url
            style="height: 100%; width: 100%; object-fit: contain"
        />
      </el-carousel-item>
    </el-carousel>
  </template>
 
 <script lang="ts" setup>
import { getPhotos } from '@/api';
import { useUserStore } from '@/store';
import { ref } from 'vue';

const userStore = useUserStore();

type image = {
    url: string;
    width: number;
    height: number;
} 

const image_urls = ref<image[]>([])

const loadPhotos = async () => {
    const photosResponse = await getPhotos(userStore.access_token!, userStore.VERSION, 0, 0)

    const preData = photosResponse.data.response.items;

    const images = preData.map((item: any) => item.sizes.find((s: { type: any; }) => s.type == "r"));

    image_urls.value = images.map((img: any) => {
        return {
        url: img.url,
        width:img.width,
        height: img.height
    }});
}

loadPhotos()
</script>
  <style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>
  