<template>
    <div><el-input @keyup.enter="loadData" @blur="loadData" v-model="input" style="width: 240px" placeholder="Поиск видео ВК"></el-input></div>
    <div :key="currentPage" style="width: 100%; height: max-content">
        <div :key = "item.title" v-for="item in pageData">
            <el-card style="max-width: auto; height: auto;" >
                <template #header>{{  item.title }}</template>
                <iframe style="width: 800px; height: 600px;" :src="item.video_src"></iframe>
            </el-card>
        </div>
    </div>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        layout="total, prev, pager, next"
        :total="totalCount"
        @current-change="handleCurrentChange">
    </el-pagination>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/store';
import type { VideoItem } from './types';
import { getMyVideos, getVideos } from '@/api';

const userStore = useUserStore();

const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const pageData = ref<VideoItem[]>([]);
const input = ref('')

const loadData = async () => {
    const response = input.value != '' 
    ? await getVideos(input.value, userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value)
    : await getMyVideos(userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value);
    const data = response.data.response;

    totalCount.value = data.count;
    pageData.value = data.items.map((item: any) => ({
        title: item.title,
        video_src: item.player,
    }));
};

const handleCurrentChange = async (val: number) => {
  await loadData();
}

onBeforeMount(() => {
    loadData();
})
</script>

<style>

</style>