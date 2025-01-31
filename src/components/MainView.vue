<template>
  <v-container class="fill-height" fluid>
    <v-responsive class="align-start fill-height mx-auto">

      <div class="text-center align-center justify-center top-0">
        <div class="py-4" />
        <h1 class="text-h4 font-weight-bold">MyGO Ave Mujica 截圖搜尋器</h1>
        <div class="py-4" />
        <v-text-field clearable label="搜尋" variant="outlined" class="short-search" style="margin: 0 30%;"
          v-model="searchQuery" @keyup.enter="filterCards" @input="debounceFilterCards" />
      </div>

      <v-row class="text-center justify-center">
        <v-col cols="auto" v-for="(card, index) in filteredCards" :key="index">
          <CardComponent :frame_start="card.frame_start" :episode="card.episode" :text="card.text" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import cardsData from '../assets/data/data.json';
const searchQuery = ref('');
const filteredCards = ref<typeof cardsData>([]);
const chunkSize = 20;
let currentChunk = 0;

const loadNextChunk = () => {
  const start = currentChunk * chunkSize;
  const end = start + chunkSize;
  filteredCards.value.push(...cardsData.slice(start, end));
  currentChunk++;
};

onMounted(() => {
  loadNextChunk();
  window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadNextChunk();
  }
};

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

let debounceTimeout: number;
const debounceFilterCards = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(filterCards, 500);
};

const filterCards = () => {
  filteredCards.value = cardsData.filter(card => card.text.includes(searchQuery.value));
};
</script>
