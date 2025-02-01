<template>
  <v-app-bar density="prominent">
    <v-container>
      <div class="text-h5 mx-auto font-weight-bold text-center text-truncate">
        MyGO Ave Mujica
        截圖搜尋器
      </div>
      <v-col class="text-center">
        <v-text-field v-model="searchQuery" single-line hide-details clearable label="搜尋" variant="outlined"
          class="short-search" @keyup.enter="filterCards" @click:clear="clearMessage" @input="debounceFilterCards" />
      </v-col>
    </v-container>
  </v-app-bar>

  <v-container class="fill-height" fluid>
    <v-responsive class="align-start fill-height mx-auto">
      <v-row class="text-center justify-center">
        <v-col v-for="(card, index) in showedCards" :key="card.segment_id" cols="auto">
          <CardComponent :frame_start="card.frame_start" :episode="card.episode" :text="card.text" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>

  <v-footer app height="50px">
    <v-container fluid>
      <v-row>
        <v-col cols="auto">
          <v-btn variant="outlined" class="text-center">
            回報問題
            <ReportDialog />
          </v-btn>
        </v-col>
        <v-col>
          <v-btn variant="outlined" class="text-center">
            <v-icon>mdi-github</v-icon>
            看看其他地方
            <v-menu activator="parent" location="center">
              <v-list>
                <v-list-item :key="1" target="_blank" :value="1" append-icon="mdi-open-in-new"
                  href="https://github.com/jeffpeng3/PowerToys-Run-Its-MyPic">
                  <v-list-item-title>PowerToys-Run Plugin</v-list-item-title>
                </v-list-item>

                <v-list-item :key="2" target="_blank" :value="2" append-icon="mdi-open-in-new"
                  href="https://github.com/jeffpeng3/krunner-Its-MyPic">
                  <v-list-item-title>Krunner Plugin</v-list-item-title>
                </v-list-item>

                <v-list-item :key="3" target="_blank" :value="3" append-icon="mdi-open-in-new"
                  href="https://github.com/jeffpeng3/Its-MyPic-vue">
                  <v-list-item-title>這個網頁的原始碼</v-list-item-title>
                </v-list-item>

                <v-list-item :key="4" target="_blank" :value="4" append-icon="mdi-open-in-new"
                  href="https://github.com/jeffpeng3/MyPicDB">
                  <v-list-item-title>mygo系列的截圖資料</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-icon icon="mdi-theme-light-dark" @click="toggleTheme" />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  // localStorage.setItem("theme", theme.global.name.value);
}


import { ref, onMounted, onUnmounted } from "vue";
import cardsData from "../assets/data/data.json";
const searchQuery = ref("");
const showedCards = ref<typeof cardsData>([]);
const filteredCards = ref<typeof cardsData>(cardsData);
const chunkSize = 20;
let currentChunk = 0;

const loadNextChunk = () => {
  const start = currentChunk * chunkSize;
  const end = start + chunkSize;
  showedCards.value.push(...filteredCards.value.slice(start, end));
  currentChunk++;
};

onMounted(() => {
  loadNextChunk();
  window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadNextChunk();
  }
};

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

let debounceTimeout: number;
const debounceFilterCards = () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(filterCards, 500);
};

const clearMessage = () => {
  searchQuery.value = "";
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  filterCards();
};

const filterCards = () => {
  if (searchQuery.value === "") {
    filteredCards.value = cardsData;
  } else {
    const temp = searchQuery.value.toLowerCase().replace("你", "妳");
    filteredCards.value = cardsData.filter((card) =>
      card.text.toLowerCase().replace("你", "妳").includes(temp)
    );
  }
  currentChunk = 0;
  showedCards.value = [];
  loadNextChunk();
};
</script>
