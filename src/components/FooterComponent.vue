<template>
  <v-footer app>
    <v-container fluid>
      <v-row>

        <v-col>
          <v-btn variant="outlined" size="small" class="text-center">
            其他連結
            <v-menu activator="parent" location="center">
              <v-list>
                <v-icon :icon="`mdiSvg:${mdiOpenInNew}`"></v-icon>
                <v-list-item :key="1" target="_blank" :value="1" :append-icon="mdiOpenInNew"
                  href="https://github.com/jeffpeng3/PowerToys-Run-Its-MyPic">
                  <v-list-item-title>PowerToys-Run Plugin</v-list-item-title>
                </v-list-item>

                <v-list-item :key="2" target="_blank" :value="2" :append-icon="mdiOpenInNew"
                  href="https://github.com/jeffpeng3/krunner-Its-MyPic">
                  <v-list-item-title>Krunner Plugin</v-list-item-title>
                </v-list-item>

                <v-list-item :key="3" target="_blank" :value="3" :append-icon="mdiOpenInNew"
                  href="https://github.com/jeffpeng3/Its-MyPic-vue">
                  <v-list-item-title>這個網頁的原始碼</v-list-item-title>
                </v-list-item>

                <v-list-item :key="4" target="_blank" :value="4" :append-icon="mdiOpenInNew"
                  href="https://github.com/jeffpeng3/MyPicDB">
                  <v-list-item-title>mygo系列的截圖資料</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
          <v-btn variant="outlined" size="small" class="text-center">
            回報問題
            <ReportDialog />
          </v-btn>
          <v-btn variant="outlined" size="small" class="text-center" :href="`https://forms.gle/WzW9PZwUU6gqHZko7`"
            target="_blank">
            投稿
          </v-btn>
        </v-col>
        <v-col cols="1">
          <v-icon size="small" :icon="mdiThemeLightDark" @click="toggleTheme" />
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { mdiOpenInNew, mdiThemeLightDark } from '@mdi/js';
const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
