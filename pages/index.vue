<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";

definePageMeta({
  middleware: "auth",
});

const showCreateBoard = ref(false);

const { data, error, refresh } = await useFetch<BoardDocument[]>("/api/boards");

if (error.value) {
  throw createError(error.value);
}
</script>
<template>
  <WrapperDefault>
    <h1 class="tex-3xl font-semibold">Boards</h1>

    <template #actions>
      <UButton size="xs" @click="showCreateBoard = !showCreateBoard"
        >Create new board</UButton
      >
    </template>

    <!-- Sidesheet  -->
    <USlideover v-model="showCreateBoard">
      <div
        class="py-2 px-4 flex justify-between items-center border-b dark:border-gray-800"
      >
        <h3 class="font-semibold">Create board</h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="showCreateBoard = false"
        />
      </div>
      <FormBoard
        type="create"
        :on-create="
          () => {
            showCreateBoard = false;
            refresh();
          }
        "
        :on-update="
          () => {
            showCreateBoard = false;
            refresh();
          }
        "
      />
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section class="grid grid-cols-2 lg:grid-cols-5 my-4 gap-4">
      <div
        v-for="board in data"
        :key="board._id"
        class="bg-white shadow dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <div v-if="board.coverImage" class="h-36 w-full relative">
          <NuxtImg
            :src="board.coverImage"
            :alt="board.name"
            class="h-full w-full absolute object-cover"
          />
        </div>

        <NuxtLink
          :to="{
            name: 'boardId',
            params: { boardId: board._id },
          }"
          class="py-2 px-4 block text-sm"
          >{{ board.name }}</NuxtLink
        >
      </div>
    </section>
    <!-- ./ List of boards -->
  </WrapperDefault>
</template>

<style></style>
