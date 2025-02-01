<template>
  <AppBarComponent @update:searchQuery="updateSearchQuery" />

  <v-container class="fill-height" fluid>
    <v-responsive class="align-start fill-height mx-auto">
      <v-row class="text-center justify-center">
        <v-col v-for="(card, index) in showedCards" :key="card.segment_id" cols="auto">
          <CardComponent :frame_start="card.frame_start" :episode="card.episode" :text="card.text" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

  <FooterComponent />
</template>

<script setup lang="ts">
const cardsDataLoader = () => import('../assets/data/data.json')
type CardData = {
  segment_id: number;
  frame_start: number;
  frame_end: number;
  episode: string;
  text: string;
};

const updateSearchQuery = (query: string) => {
  filterCards(query);
};

import { ref, onMounted, onUnmounted } from "vue";
// import cardsData from "../assets/data/data.json";

let cardsData: CardData[] = [];
const searchQuery = ref("");
const showedCards = ref<CardData[]>([]);
const filteredCards = ref(cardsData);
const chunkSize = 20;
let currentChunk = 0;

const loadNextChunk = () => {
  const start = currentChunk * chunkSize;
  const end = start + chunkSize;
  showedCards.value.push(...filteredCards.value.slice(start, end));
  currentChunk++;
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadNextChunk();
  }
};

onMounted(() => {
  cardsDataLoader().then((module) => {
    cardsData = module.default;
    filteredCards.value = cardsData;
    loadNextChunk();
  });
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});



const filterCards = (query: string) => {
  if (query === "") {
    filteredCards.value = cardsData;
  } else {
    const temp = query.toLowerCase().replace("你", "妳");
    filteredCards.value = cardsData.filter((card) =>
      card.text.toLowerCase().replace("你", "妳").includes(temp)
    );
  }
  currentChunk = 0;
  showedCards.value = [];
  loadNextChunk();
};
</script>
