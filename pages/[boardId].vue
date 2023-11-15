<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";
import type { ListDocument } from "~/server/models/List";

definePageMeta({
  middleware: "auth",
});

const { boardId } = useRoute().params;
const showCreateList = ref(false);

const { data, refresh } = await useFetch<BoardDocument>(
  `/api/boards/${boardId}`
);

provide("refresh-board", refresh);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "Board not found",
  });
}

useHead({
  title: data.value.name,
});

const coverImage = computed(() => data.value?.coverImage || "");
const lists = computed(() => data.value?.lists as ListDocument[]);
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
      <UButton @click="showCreateList = true" size="xs">Create a list</UButton>
    </template>

    <h1 class="tex-3xl font-semibold mb-4">{{ data!.name }}</h1>

    <ListContainer :lists="lists" :board-id="(boardId as string)" />

    <USlideover v-model="showCreateList">
      <SlideoverHeader
        title="Create list"
        :on-click="() => (showCreateList = false)"
      ></SlideoverHeader>

      <FormList
        type="create"
        :board-id="(boardId as string)"
        :on-create="
          () => {
            refresh();
            showCreateList = false;
          }
        "
        :on-update="
          () => {
            refresh();
            showCreateList = false;
          }
        "
        class="p-4"
      />
    </USlideover>
  </WrapperDefault>
</template>

<style></style>
