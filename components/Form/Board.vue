<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import BoardSchema from "~/schemas/Board.schema";
import type { BoardDocument } from "~/server/models/Board";

interface Props {
  type: "create" | "update";
  initialData?: Partial<BoardDocument>;
  onUpdate?: (data?: any) => void;
  onCreate?: (data?: any) => void;
}

const porps = withDefaults(defineProps<Props>(), {
  type: "create",
});

const isLoading = ref(false);
const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined,
});

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof BoardSchema>>
) {
  try {
    isLoading.value = true;
    if (porps.type === "update" && porps.initialData?._id) {
      const updatedBoard = await useFetch(
        `/api/boards/${porps.initialData._id}`,
        {
          method: "PUT",
          body: event.data,
          watch: false,
        }
      );
      porps.onUpdate?.(updatedBoard);
      return;
    }

    const { data, error } = await useFetch("/api/boards", {
      method: "POST",
      body: event.data,
      watch: false,
    });

    if (error.value) {
      if (error.value.statusCode === 403) {
        useSubscription().showSubscriptionModal({
          title: "Multiple boards is a Premium Feature",
          description:
            "You can create only one board in free plan. Please upgrade to premium to create more boards.",
        });
      }
    }

    porps.onCreate?.(data);
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
}

watchEffect(() => {
  if (porps.type === "update" && porps.initialData) {
    formState.name = porps.initialData.name;
    formState.coverImage = porps.initialData.coverImage;
  }
});
</script>
<template>
  <UForm
    :state="formState"
    :schema="BoardSchema"
    class="p-4"
    @submit="handleSubmit"
  >
    <UFormGroup class="mb-4" name="name" label="Board Name">
      <UInput v-model="formState.name" type="text" placeholder="Board name" />
    </UFormGroup>

    <UFormGroup class="mb-4" name="coverImage" label="Select cover image">
      <ImagePicker v-model="formState.coverImage" />
    </UFormGroup>

    <UButton type="submit" color="primary" block :loading="isLoading">
      Create board
    </UButton>
  </UForm>
</template>

<style></style>
