<template>
  <v-dialog v-model="dialog" activator="parent" max-width="600px" :style="{ maxHeight: '90vh' }"
    transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>回報問題</v-card-title>
      <v-card-text>
        <v-text-field label="你遭遇到的問題" v-model="issue" outlined></v-text-field>
        <v-text-field label="你的聯絡方式" v-model="contact" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submitIssue">送出</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="show" :timeout=2000 class="text-center" rounded="pill">
    <div class="text-h6 mx-auto font-weight-bold text-center text-truncate">
      已回報問題
    </div>
  </v-snackbar>

</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  fileName: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: false,
    default: ''
  }
});

const issue = ref('');
const contact = ref('');
const show = ref(false);
const dialog = ref(false);

import settings from '../assets/setting.json';

async function submitIssue() {
  let content = '';
  if (issue.value) {
    content += `問題: ${issue.value}\n`;
  }
  if (contact.value) {
    content += `聯絡方式: ${contact.value}\n`;
  }
  if (props.fileName) {
    content += `檔案名稱: ${props.fileName}\n`;
  }
  if (props.text) {
    content += `文字: ${props.text}\n`;
  }

  if (content) {
    const payload = { content };
    await fetch(settings.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    show.value = true;
  }
  dialog.value = false;
}
</script>
