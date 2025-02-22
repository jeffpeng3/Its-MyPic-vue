import { defineStore } from "pinia";

export const useReverse = defineStore("Reverse", {
  state: () => ({ reverse: false }),
});
export const useCopyMode = defineStore("CopyMode", {
  state: () => ({ copyMode: false }),
});
export const useQuery = defineStore("Query", {
  state: () => ({
    query: "",
    mygoFilter: [] as number[],
    avemujicaFilter: [] as number[],
    characterFilter: 0,
  }),
});
