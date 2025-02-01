<template>
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
}
</script>
