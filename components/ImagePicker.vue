<script lang="ts" setup>
const {
  public: { pixabayApiKey },
} = useRuntimeConfig();

defineProps<{
  modelValue?: string;
}>();

const { data } = await useFetch<any>(
  `https://pixabay.com/api/?key=${pixabayApiKey}&q=background&image_type=photo&per_page=20`
);

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
<template>
  <ol
    v-if="data.hits"
    class="grid grid-cols-4 gap-2 overflow-y-auto overflow-x-auto h-64 p-2"
  >
    <li
      v-for="image in data.hits"
      class="h-12 relative rounded overflow-hidden cursor-pointer outline outline-transparent focus:outline-blue-500 hover:outline-blue-500"
      :class="{
        'ring-2 ring-blue-500 shadow': modelValue === image.largeImageURL,
      }"
      :key="image.id"
      @click="$emit('update:modelValue', image.largeImageURL)"
    >
      <NuxtImg
        :src="image.previewURL"
        class="w-full h-full absolute object-cover"
      ></NuxtImg>
    </li>
  </ol>
</template>

<style></style>
