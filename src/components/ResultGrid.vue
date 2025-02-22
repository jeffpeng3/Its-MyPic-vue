<template>
  <Grid :length="filteredCards.length ? filteredCards.length : 1" :pageSize="cardsPerRow" :pageProvider="pageProvider"
    :get-key="getKey" :page-provider-debounce-time="100" class="grid ma-5">
    <template v-slot:placeholder="{ index, style }">
      <div class="item" :style="style">{{ filteredCards.length ? "還在GO..." : "" }}</div>
    </template>
    <template v-slot:default="{ item, style, index }">
      <CardComponent :styles="style" :cardData="item" />
    </template>
  </Grid>
</template>

<script setup lang="ts">
import CardComponent from "./CardComponent.vue";
import Grid from "vue-virtual-scroll-grid";
import { useReverse, useQuery } from '@/stores/states'

const reverse = useReverse();
const query = useQuery();

watch(query, () => {
  updateSearchQuery();
});

const updateSearchQuery = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  filterCards();
  const url = new URL(window.location.href);
  if (query.query === "") {
    url.searchParams.delete('q');
  } else {
    url.searchParams.set('q', query.query);
  }
  window.history.pushState({}, '', url.toString());
};

import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import rawCardsData from "../assets/data/data.json";
var cardsData = rawCardsData;

const filteredCards = ref(cardsData);

let cardsPerRow = ref(4);
const calcRows = () => {
  cardsPerRow.value = (1 + Math.floor((window.innerWidth - 320) / 310)) * 8;
};


watch(reverse, () => {
  cardsData.reverse();
  filterCards();
});

const pageProvider = computed(() => {
  const filtered = filteredCards.value;
  const update = reverse.reverse;
  return (page: number, pageSize: number) => {
    const slice = filtered.slice(page * pageSize, (page + 1) * pageSize);
    return Promise.resolve(slice);
  };
});

const getKey = (item: any) => {
  return item.value?.segment_id;
};

onMounted(() => {
  calcRows();
  window.addEventListener("resize", calcRows);
});

onUnmounted(() => {
  window.removeEventListener("resize", calcRows);
});

// @ts-ignore
import { ConverterFactory } from 'opencc-js/core';
// @ts-ignore
import cn from 'opencc-js/from/cn';
// @ts-ignore
import tw from 'opencc-js/to/tw';

const converter = ConverterFactory(cn, tw);
var episodeCache = new Map<string, typeof cardsData>();

const filterCards = () => {
  var filted = cardsData;
  var episodeFilter = new Set<string>();
  query.mygoFilter.forEach(element => {
    if (element < 4) {
      episodeFilter.add("1-3");
    } else {
      episodeFilter.add(`${element}`);
    }
  });
  query.avemujicaFilter.forEach(element => {
    episodeFilter.add(`ave-${element}`);
  });
  if (episodeFilter.size !== 0) {
    const key = reverse.reverse + Array.from(episodeFilter).join("");
    if (episodeCache.has(key)) {
      filted = episodeCache.get(key) ?? [];
    } else {
      filted = cardsData.filter((card) => episodeFilter.has(card.episode));
      episodeCache.set(key, filted);
    }
  }

  if (query.query === "") {
    filteredCards.value = filted;
  } else {
    const temp: string = converter(query.query.toLowerCase().replace("你", "妳").replace("啊", "阿"));
    filteredCards.value = cardsData.filter((card) =>
      card.text.toLowerCase().replace("你", "妳").replace("啊", "阿").includes(temp)
    );
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-gap: 20px;
  grid-template-rows: 237px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  align-items: center;
  justify-content: center;
}
</style>
