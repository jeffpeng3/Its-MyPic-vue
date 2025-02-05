<template>
  <v-card color="surface-variant" rounded="lg" variant="tonal" @click="showDialog = true">
    <div style="position: relative; width: 280px; height: 157px;">
      <img :src="imgUrl" cover width="280px" height="157px" :alt="text" />
      <div
        style="position: absolute; top: 0; right: 0; background: rgba(0, 0, 0, 0.5); color: white; padding: 5px 5px;">
        {{ episodeText }} {{ timestamp }}
      </div>
    </div>
    <v-card-text class="card-text text-center justify-center">
      {{ text }}
    </v-card-text>
  </v-card>

  <v-dialog v-model="showDialog" max-width="600px" :style="{ maxHeight: '90vh' }">
    <v-card>
      <div style="position: relative;">
        <v-img :src="imgUrl" :style="{ maxHeight: '70vh', objectFit: 'contain' }" />
        <div
          style="position: absolute; top: 0; right: 0; background: rgba(0, 0, 0, 0.5); color: white; padding: 5px 5px;">
          {{ episodeText }} {{ timestamp }}
        </div>
      </div>

      <v-card-actions>
        <v-btn>
          回報
          <ReportDialog :fileName="imgUrl" :text="text" />
        </v-btn>
        <v-btn @click="downloadImage">下載</v-btn>
        <v-btn v-long-press="() => copy(true)" @click="() => copy(false)">複製</v-btn>
        <v-card-text>{{ text }}</v-card-text>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="copyResult" :timeout=2000 class="text-center" rounded="pill">
    <div class="text-h6 mx-auto font-weight-bold text-center text-truncate">
      {{ snack_text }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
  preferCopyURL: {
    type: Boolean,
    required: true,
  },
});
const totalSec = props.frame_start / 24
const isAveMujica = props.episode.startsWith('ave');
const episodeText = `${isAveMujica ? "Ave Mujica" : "MyGO"} 第${props.episode.replace("ave-", "")}集`;
const timestamp = `${Math.floor(totalSec / 60)}:${('0' + Math.round(totalSec % 60)).slice(-2)}`;


const baseUrl = 'https://mygodata.0m0.uk/images/';
const imgUrl = ref(`${baseUrl}${props.episode}_${props.frame_start}.jpg`);
const showDialog = ref(false);
const copyResult = ref(false);
const snack_text = ref('連結複製成功');

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

let isLongPress = false;
const copy = async (longPress: boolean) => {
  if (isLongPress && !longPress) {
    isLongPress = false;
    return;
  }
  if (longPress) {
    isLongPress = true;
  }

  copyResult.value = false;
  const preferCopyURL = longPress || props.preferCopyURL;
  // console.log(preferCopyURL);
  try {
    if (preferCopyURL) {
      await copyUrl();
    } else {
      await copyImage();
    }
  } catch (e: any) {
    reportErrorToDiscord(e);
    try {
      await copyUrl();
    } catch (e: any) {
      console.error('Error during copy:', e.message);
      snack_text.value = '失敗 請按左下角回報手機型號/瀏覽器';
      reportErrorToDiscord(e);
    }
  } finally {
    copyResult.value = true;
  }
}

const copyUrl = async () => {
  await navigator.clipboard.writeText(imgUrl.value);
  snack_text.value = '連結複製成功';
}

const copyImage = async () => {
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
  snack_text.value = "圖片複製成功";
}

async function reportErrorToDiscord(e: Error) {
  const payload = {
    content: `Copy failed: ${e.name}\n\n${e.message}\n\n${e.stack}`
  };

  try {
    await fetch(`https://discord.com/api/webhooks/${atob(settings.webhook)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (fetchError) {
    console.error('Failed to send error report to Discord:', fetchError);
  }
}


</script>

<style scoped>
.card-text {
  display: flex;
  flex-direction: column;
  height: 80px;
  max-width: 280px;
  flex: 1;
}
</style>
