<script lang="ts" setup>
import type { CardDocument } from "~/server/models/Card";

interface Props {
  card: CardDocument;
}

const props = defineProps<Props>();
</script>
<template>
  <div
    class="p-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:border-gray-700 cursor-grab"
  >
    {{ card.title }}
  </div>
</template>

<style></style>
