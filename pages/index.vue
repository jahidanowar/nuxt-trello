<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import BoardSchema from "~/schemas/Board.schema";

definePageMeta({
  middleware: "auth",
});

const showCreateBoard = ref(false);

const { data, error, refresh } = useFetch("/api/boards");

if (error.value) {
  throw createError(error.value);
}

const formState = reactive({
  name: undefined,
  description: undefined,
  coverImage: undefined,
});

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof BoardSchema>>
) {
  try {
    await useFetch("/api/boards", {
      method: "POST",
      body: event.data,
    });

    refresh();

    showCreateBoard.value = false;
  } catch (e) {}
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

      <UForm
        :state="formState"
        :schema="BoardSchema"
        class="p-4"
        @submit="handleSubmit"
      >
        <UFormGroup class="mb-4" name="name" label="Board Name">
          <UInput
            v-model="formState.name"
            type="text"
            placeholder="Board name"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" name="description" label="Description">
          <UTextarea
            v-model="formState.description"
            placeholder="Board description"
          />
        </UFormGroup>

        <UFormGroup class="mb-4" name="coverImage"> </UFormGroup>

        <UButton type="submit" color="primary" block> Create board </UButton>
      </UForm>
    </USlideover>
    <!-- ./ Sidesheet  -->

    <!-- List of boards -->
    <section>{{ data }}</section>
    <!-- ./ List of boards -->
  </WrapperDefault>
</template>

<style></style>
