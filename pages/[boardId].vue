<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";
import type { ListDocument } from "~/server/models/List";

definePageMeta({
  middleware: "auth",
});

const { boardId } = useRoute().params;

const { data, refresh } = await useFetch<BoardDocument>(
  `/api/boards/${boardId}`
);

if (!data) {
  throw createError({
    statusCode: 404,
    message: "Board not found",
  });
}

const coverImage = computed(() => data.value?.coverImage || "");
const lists = computed(() => data.value?.lists as ListDocument[]);

async function handleFormSubmit() {
  await useFetch("/api/lists", {
    method: "POST",
    body: {
      name: "Best list",
      board: data.value?._id,
    },
  });

  refresh();
}
</script>
<template>
  <WrapperDefault
    v-if="data"
    class="lg:h-screen"
    :style="{
      backgroundImage: `url(${coverImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <template #actions>
      <UButton @click="handleFormSubmit">Create a list</UButton>
    </template>

    <h1 class="tex-3xl font-semibold mb-4">{{ data!.name }}</h1>

    <ListContainer :lists="lists" :board-id="(boardId as string)" />
  </WrapperDefault>
</template>

<style></style>
