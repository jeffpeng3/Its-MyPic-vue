<template>
  <v-card color="surface-variant" rounded="lg" variant="tonal" @click="showDialog = true">
    <v-img :src="imgUrl" cover width="280px" />
    <v-card-text class="card-text text-center justify-center">
      {{ text }}
    </v-card-text>
  </v-card>

  <v-dialog v-model="showDialog" max-width="600px" :style="{ maxHeight: '90vh' }">
    <v-card>
      <v-img :src="imgUrl" :style="{ maxHeight: '70vh', objectFit: 'contain' }" />
      <v-card-actions>
        <v-btn>
          回報
          <ReportDialog :fileName="imgUrl" :text="text" />
        </v-btn>
        <v-btn @click="downloadImage">
          下載
        </v-btn>
        <v-btn @click="copyImage">複製</v-btn>
        <v-card-text>{{ text }}</v-card-text>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="copySucess" :timeout=2000 class="text-center" rounded="pill">
    <div class="text-h6 mx-auto font-weight-bold text-center text-truncate">
      複製成功
    </div>
  </v-snackbar>
  <v-snackbar v-model="copyFailed" :timeout=2000 class="text-center" rounded="pill">
    <div class="text-h6 mx-auto font-weight-bold text-center text-truncate">
      複製失敗
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import settings from '../assets/setting.json';

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

const baseUrl = 'https://mygodata.0m0.uk/images/';
const imgUrl = computed(() => `${baseUrl}${props.episode}_${props.frame_start}.jpg`);
const showDialog = ref(false);
const copySucess = ref(false);
const copyFailed = ref(false);

async function downloadImage() {
  const response = await fetch(imgUrl.value);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${props.text}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const copyImage = async () => {
  try {
    const item = new ClipboardItem({
      'image/png': (async () => {

        let img = new Image();
        img.src = imgUrl.value;
        img.crossOrigin = 'Anonymous';
        img.style.display = 'none';
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d') ?? new CanvasRenderingContext2D();
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const blobUrl = canvas.toDataURL("image/png");

        const data = await fetch(blobUrl);
        return await data.blob();
      }
      )(),
    })
    await navigator.clipboard.write([item])
    copySucess.value = true;

  } catch (e: any) {
    const payload = {
      content: `Copy failed:\n ${e.message}\n\n${e.stack}`
    };

    fetch(settings.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    copyFailed.value = true;
    console.log('Error: ', e.message)
  }
}

</script>

<style scoped>
.card-text {
  display: flex;
  flex-direction: column;
  height: 80px;
  max-width: 300px;
  flex: 1;
}
</style>
