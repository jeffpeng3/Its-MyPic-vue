<template>
<v-card color="surface-variant" rounded="lg" variant="tonal" @click="showDialog = true">
    <v-img :src="imgUrl" cover width="300px" />
    <v-card-text class="card-text text-center justify-center">{{ text }}</v-card-text>
</v-card>

<v-dialog v-model="showDialog" max-width="600px" :style="{ maxHeight: '90vh' }">
    <v-card>
        <v-img :src="imgUrl" :style="{ maxHeight: '70vh', objectFit: 'contain' }" />
        <v-card-actions>
            <v-btn @click="downloadImage">下載</v-btn>
            <!-- <v-btn @click="copyImage">複製</v-btn> -->
            <v-card-text>{{ text }}</v-card-text>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Slot } from 'vue';

const props = defineProps({
  episode: {
    type: String,
    required: true,
  },
  frame_start: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const baseUrl = 'https://media.githubusercontent.com/media/jeffpeng3/MyPicDB/assets/images/';
const imgUrl = computed(() => `${baseUrl}${props.episode}_${props.frame_start}.jpg`);
const showDialog = ref(false);

const downloadImage = () => {
  const link = document.createElement('a');
  link.href = imgUrl.value;
  link.download = `${props.episode}_${props.frame_start}.jpg`;
  link.click();
};

const copyImage = async () => {
  try {
    const response = await fetch(imgUrl.value);
    const blob = await response.blob();
    const item = new ClipboardItem({ [`web ${blob.type}`]: blob });
    await navigator.clipboard.write([item]);
    alert('Image copied to clipboard');
  } catch (error) {
    console.error('Failed to copy image: ', error);
  }
};
</script>

<style scoped>
.card-text {
  display: flex;
  flex-direction: column;
  height: 90px;
  max-width: 300px;
  flex: 1;
}
</style>
