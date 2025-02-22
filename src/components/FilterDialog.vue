<template>
  <v-dialog v-model="enable" max-width="600px" style="min-height: 600px;" transition="dialog-top-transition">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" :icon="mdiTune">
      </v-icon>
    </template>
    <v-card class="d-flex flex-column align-center justify-center font-weight-bold">
      <br />
      <br />
      <span class="align-center">集數篩選</span>
      <MultiSelect :items="Array.from({ length: 13 }, (_, n) => n + 1)" v-model="mygoFilter" label="MyGO"
        style="min-width:250px" />
      <MultiSelect :items="Array.from({ length: 8 }, (_, n) => n + 1)" v-model="aveMujicaFilter" label="Ave Mujica"
        style="min-width:250px" />

      <!-- <span class="align-center">角色篩選</span>
      <MultiSelect :items="characters" v-model="characterFilter" label="角色篩選" style="min-width:250px" />

      <v-checkbox class="text-center" label="角色嚴格篩選" /> -->
      <v-card-actions>
        <v-btn class="text-center" text="清除篩選" @click="cleanFilter" />
        <v-btn class="text-center" text="確定" @click="applyFilter" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MultiSelect from "./MultiSelect.vue";
import { useQuery } from "@/stores/states";
import { mdiTune } from "@mdi/js";

const query = useQuery();

const characters = ['高松燈', '千早愛音', '要樂奈', '長崎爽世', '椎名立希', '三角初華', '豐川祥子', '八幡海鈴', '祐天寺若麥', '若葉睦'];
const enable = ref(false);

const characterFilter = ref<string[]>([]);
const mygoFilter = ref<number[]>([]);
const aveMujicaFilter = ref<number[]>([]);


const cleanFilter = () => {
  mygoFilter.value = [];
  aveMujicaFilter.value = [];
  characterFilter.value = [];

  // console.log('cleanFilter');
};

const applyFilter = () => {
  query.mygoFilter = mygoFilter.value;
  query.avemujicaFilter = aveMujicaFilter.value;
  query.characterFilter = 0;
  enable.value = false;
  // console.log(mygoFilter.value);
  // console.log(aveMujicaFilter.value);
  // console.log(characterFilter.value);
  // console.log('applyFilter');
};

</script>