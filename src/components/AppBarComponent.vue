<template>
  <v-app-bar density="prominent">
    <v-container>
      <div class="text-h5 mx-auto font-weight-bold text-center text-truncate">
        MyGO Mujica 截圖搜尋器
      </div>
      <v-col class="text-center">
        <v-text-field v-model="searchQuery" single-line hide-details clearable label="搜尋" variant="outlined"
          class="short-search" @keyup.enter="emitSearchQuery" @click:clear="clearMessage"
          @input="debounceEmitSearchQuery" autofocus>
          <template v-slot:append>
            <v-icon @click="ascendingBind = !ascendingBind"
              :icon="ascendingBind ? mdiSortVariant : mdiSortReverseVariant" />
          </template>
        </v-text-field>
      </v-col>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { mdiSortReverseVariant, mdiSortVariant } from "@mdi/js";
const ascendingBind = computed({ get() { return ascending.value }, set(newValue) { ascending.value = newValue; } });
const ascending = defineModel('ascending', { type: Boolean, required: true });

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

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');
  if (q) {
    searchQuery.value = q;
    emit('update:searchQuery', searchQuery.value);
  }
});
</script>
