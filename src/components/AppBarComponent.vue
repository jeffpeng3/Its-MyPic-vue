<template>
  <v-app-bar density="prominent">
    <v-container>
      <div class="text-h5 mx-auto font-weight-bold text-center text-truncate">
        MyGO Mujica 截圖搜尋器
      </div>
      <v-col class="text-center">
        <v-text-field v-model="searchQuery" single-line hide-details clearable label="搜尋" variant="outlined"
          class="short-search" @keyup.enter="emitSearchQuery" @click:clear="clearMessage" @input="debounceEmitSearchQuery" />
      </v-col>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(['update:searchQuery']);
const searchQuery = ref("");
const debounceTimeout = ref<number>();

const debounceEmitSearchQuery = () => {
  clearTimeout(debounceTimeout.value);
  debounceTimeout.value = setTimeout(() => emit('update:searchQuery', searchQuery.value), 500);
};

const emitSearchQuery = () => {
  clearTimeout(debounceTimeout.value);
  emit('update:searchQuery', searchQuery.value);
};

const clearMessage = () => {
  searchQuery.value = "";
  emit('update:searchQuery', searchQuery.value);
};
</script>
