<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { ListDocument } from "~/server/models/List";
import { z } from "zod";
import ListSchema from "~/schemas/List.schema";

interface Props {
  type: "create" | "update";
  boardId: string;
  initialData?: ListDocument;
  onCreate?: (data?: any) => void;
  onUpdate?: (data?: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create",
  initialData: undefined,
});

const isLoading = ref(false);
const formState = reactive<Partial<ListDocument>>({
  name: undefined,
  board: props.boardId,
});

watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
    formState.board = props.initialData.board;
  }
});

async function handleSubmit(e: FormSubmitEvent<z.output<typeof ListSchema>>) {
  try {
    isLoading.value = true;

    if (props.type === "create" && props.initialData) {
      formState.board = props.initialData.board;

      await useFetch(`/api/lists/${props.initialData._id}`, {
        method: "PUT",
        body: JSON.stringify(e.data),
      });
      useToast().add({
        color: "green",
        title: "Success",
        description: "List updated successfully",
      });
      props.onCreate?.();
      return;
    }

    await useFetch("/api/lists", {
      method: "POST",
      body: JSON.stringify(e.data),
    });

    useToast().add({
      color: "green",
      title: "Success",
      description: "List created successfully",
    });
    props.onCreate?.();
  } catch (e: any) {
    useToast().add({
      color: "red",
      title: "Error",
      description: e.message || "Something went wrong",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <UForm :state="formState" :schema="ListSchema" @submit="handleSubmit">
    <UFormGroup name="name" label="List Name" class="mb-4">
      <UInput type="text" name="name" v-model="formState.name" />
    </UFormGroup>
    <UButton type="submit" :loading="isLoading" color="primary" block
      >Create List</UButton
    >
  </UForm>
</template>

<style></style>
