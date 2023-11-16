<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { z } from "h3-zod";
import CardSchema from "~/schemas/Card.schema";
import type { CardDocument } from "~/server/models/Card";

interface Props {
  type: "create" | "update";
  listId: string;
  initialData?: Partial<CardDocument>;
  onCreate?: () => void;
  onUpdate?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create",
});

const PartialCardSchema = CardSchema.partial();

const isLoading = ref(false);
const formState = reactive<z.infer<typeof PartialCardSchema>>({
  title: undefined,
  description: undefined,
  list: props.listId,
});

async function handleSubmit(e: FormSubmitEvent<z.output<typeof CardSchema>>) {
  try {
    isLoading.value = true;

    if ((props.type === "update", props.initialData)) {
      await useFetch(
        `/api/lists/${props.listId}/cards/${props.initialData._id}`,
        {
          method: "PUT",
          body: JSON.stringify(e.data),
          watch: false,
        }
      );
      props.onUpdate?.();
      return;
    }

    await useFetch(`/api/lists/${props.listId}/cards`, {
      method: "POST",
      body: JSON.stringify(e.data),
      watch: false,
    });
    props.onCreate?.();
  } catch (e: any) {
    useToast().add({
      title: "Error",
      description: e.message || "Something went wrong",
    });
  } finally {
    isLoading.value = false;
  }
}

watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.title = props.initialData.title;
    formState.description = props.initialData.description;
  }
});
</script>
<template>
  <UForm :state="formState" :schema="CardSchema" @submit="handleSubmit">
    <UFormGroup class="mb-4" name="title" label="Title">
      <UInput type="text" v-model="formState.title" />
    </UFormGroup>

    <UFormGroup class="mb-4" name="description" label="Description">
      <UTextarea type="text" v-model="formState.description"></UTextarea>
    </UFormGroup>

    <UButton type="submit" block :loading="isLoading"> Create Card</UButton>
  </UForm>
</template>

<style></style>
