<template>
  <el-descriptions
    class="margin-top"
    title="Информация о профиле"
    direction="vertical"
    :column="0"
    size="large"
    :border="true"
    style="width: 100%;"
  >
  <el-descriptions-item>
      <template #label>
        <div class="cell-item">
            Фото
        </div>
      </template>
      <el-avatar shape="square" :size="200" fit="fill" :src="userInfo?.img_path" />
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          ФИО
        </div>
      </template>
      {{ userInfo?.firstName }} {{ userInfo?.lastName }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          Телефон
        </div>
      </template>
      {{ userInfo?.phone }}
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
      <el-tag size="small">{{ userInfo?.sex }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <location />
          </el-icon>
          Страна
        </div>
      </template>
      {{ userInfo?.country }}
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
      {{ userInfo?.city }}
    </el-descriptions-item>
  </el-descriptions>
  <el-button type="primary" plain style="width: 100%" @click="logout">Выйти</el-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from "@/store";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const userStore = useUserStore();
const userInfo = userStore.userInfo;

const iconStyle = computed(() => {
  return {
    marginRight: '8px',
  }
})

const logout = () => {
  userStore.logOut();
}
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>