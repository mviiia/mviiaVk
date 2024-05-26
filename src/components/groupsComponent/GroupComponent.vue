<template>
    <el-table key="id" :data="pageData" style="width: 100%; height: max-content">
        <el-table-column fixed prop="date" label="Фото группы" width="350">
            <template #default="scope">
                <img
                style="width: 200px; height: 200px;"
                :src="scope.row.img_path"
                alt="Фото профиля"
                />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="Наименование группы" width="300" />
    </el-table>
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        layout="total, prev, pager, next"
        :total="totalCount"
        @current-change="handleCurrentChange">
        <template #total>
            Всего 1000
        </template>
    </el-pagination>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/store';
import type { GroupItem } from './types';
import { getGroups, getGroupsTotalCount } from '@/api';

const userStore = useUserStore();

const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const pageData = ref<GroupItem[]>([]);

const loadData = async () => {
    const totalCountResponse = await getGroupsTotalCount(userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value)
    const response = await getGroups(userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value);
    const data = response.data.response.groups;

    totalCount.value = totalCountResponse.data;
    pageData.value = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        img_path: item.photo_200,
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