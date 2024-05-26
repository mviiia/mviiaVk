<template>
    <div>
    <el-input @keyup.enter="loadData" @blur="loadData" v-model="input" style="width: 240px" placeholder="Поиск"></el-input></div>
    <el-table key="id" :data="pageData" style="width: 100%; height: max-content">
        <el-table-column fixed prop="date" label="Фото" width="150">
            <template #default="scope">
                <img
                style="width: 100px; height: 100px;"
                :src="scope.row.img_path"
                alt="Фото профиля"
                />
            </template>
        </el-table-column>
        <el-table-column prop="firstName" label="Имя" width="120" />
        <el-table-column prop="lastName" label="Фамилия" width="120" />
        <el-table-column prop="city" label="Город" width="120" />
        <el-table-column prop="birthDate" label="Дата рождения" width="120" />
        <el-table-column prop="status" label="Статус" width="300" />
        <el-table-column fixed="right" label="Профиль" width="120">
        <template #default="scope">
            <el-button
            link
            type="primary"
            size="small"
            @click.prevent="showProfileModal(scope.row)"
            >
            Открыть
            </el-button>
        </template>
        </el-table-column>
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
    <el-dialog v-if="showModal && modalFriend" v-model="showModal" title="Профиль" width="450">
        <el-avatar shape="square" :size="400" fit="fill" :src="modalFriend.img_path" />
        <el-descriptions
        class="margin-top"
        title="Информация о профиле"
        direction="vertical"
        :column="0"
        size="large"
        :border="true"
        
    >
        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <user />
            </el-icon>
            ФИО
            </div>
        </template>
        {{ modalFriend?.firstName }} {{ modalFriend?.lastName }}
        </el-descriptions-item>

        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <tickets />
            </el-icon>
            Пол
            </div>
        </template>
        <el-tag size="small">{{ modalFriend?.sex }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item v-if="modalFriend?.site">
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <tickets />
            </el-icon>
            Сайт
            </div>
        </template>
        {{ modalFriend?.site }}
        </el-descriptions-item>

        <el-descriptions-item v-if="modalFriend?.activities">
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <Postcard />
            </el-icon>
            Интересы
            </div>
        </template>
        {{ modalFriend?.activities }}
        </el-descriptions-item>

        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <school />
            </el-icon>
            Университет
            </div>
        </template>
        {{ modalFriend?.university_name }} <br>
        <span>{{ modalFriend?.faculty_name }}</span>
        </el-descriptions-item>

        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <office-building />
            </el-icon>
            Город
            </div>
        </template>
        {{ modalFriend?.city }}
        </el-descriptions-item>

        <el-descriptions-item>
        <template #label>
            <div class="cell-item">
            <el-icon :style="iconStyle">
                <DataAnalysis />
            </el-icon>
            Количество подписчиков
            </div>
        </template>
        <el-tag size="small">{{ modalFriend?.followers_count }}</el-tag>
        </el-descriptions-item>
    </el-descriptions>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/store';
import type { FriendItem, ModalFriend } from './types';
import { getFriendInfo, getFriendsList, getSearchFriendsList } from '@/api';
import {
  OfficeBuilding,
  Tickets,
  User,
  School,
  DataAnalysis,
  Postcard
} from '@element-plus/icons-vue';

const userStore = useUserStore();

const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const pageData = ref<FriendItem[]>([]);

const input = ref('')

const modalFriend = ref<ModalFriend | null>(null);
const showModal = ref<boolean>(false);
const iconStyle = computed(() => {
  return {
    marginRight: '8px',
  }
})

const showProfileModal = async (row: FriendItem) => {
    var response = await getFriendInfo(userStore.access_token!, userStore.VERSION, row.id);
    var data = response.data.response[0];
    modalFriend.value = {
        id: data.id,
        activities: data.activities,
        img_path: data.photo_400_orig,
        university_name: data.university_name,
        firstName: data.first_name,
        lastName: data.last_name,
        city: data?.city?.title ?? "-",
        followers_count: data.followers_count,
        sex: data.sex == 2 ? "Мужской" : "Женский",
        site: data.site,
        faculty_name: data.faculty_name
    };
    showModal.value = true;
}


const loadData = async () => {
    const response = input.value 
    ? await getSearchFriendsList(input.value, userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value)
    : await getFriendsList(userStore.access_token!, userStore.VERSION, (currentPage.value - 1)* pageSize.value, pageSize.value);
    const data = response.data.response;

    totalCount.value = data.count;
    pageData.value = data.items.map((item: any) => ({
        id: item.id,
        birthDate: item.bdate,
        img_path: item.photo_100,
        city: item.city?.title ?? "-",
        firstName: item.first_name,
        lastName: item.last_name,
        status: item.status,
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