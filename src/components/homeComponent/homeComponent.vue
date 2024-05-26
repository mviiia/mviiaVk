<template>
    <main>
    <el-menu :default-active="activeIndex"
    
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect">
        <el-menu-item index="0">
            Профиль
    </el-menu-item>
    <el-menu-item index="1">Новости</el-menu-item>

    </el-menu>
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMenu, ElMenuItem } from 'element-plus';
const activeIndex = ref('1');

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>

</style>