<script lang="ts" setup>
import type { ListDocument } from "~/server/models/List";

const props = defineProps<{
  element: ListDocument;
  boardId: string;
}>();

const { destroy } = useList();
const refreshBoard = inject("refresh-board") as () => void;

const listActions = ref([
  [
    {
      label: "Add card",
      icon: "i-heroicons-plus-circle",
      click: () => {},
    },
    {
      label: "Delete list",
      icon: "i-heroicons-trash",
      click: () => {
        destroy(props.element._id, refreshBoard);
      },
    },
  ],
]);

// Get cards
watchEffect(() => {});
</script>
<template>
  <div
    class="w-72 flex-none shadow dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 list flex flex-col"
  >
    <!-- List Header  -->
    <div
      class="list-header p-2 border-b dark:border-gray-700 flex items-center justify-between cursor-move"
    >
      <h3 class="font-medium">{{ element.name }}</h3>

      <div class="ml-auto">
        <UDropdown :items="listActions">
          <UButton
            size="sm"
            color="white"
            variant="ghost"
            icon="i-heroicons-cog-6-tooth"
          >
          </UButton>
        </UDropdown>
      </div>
    </div>
    <!-- ./ List Header  -->

    <!-- List Body  -->
    <div class="list-body p-2 space-y-2 flex-1 overflow-y-auto">
      <div
        v-for="i in 10"
        class="card p-2 rounded-lg shadow-sm text-sm dark:bg-gray-900 dark:border-gray-700 border"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </div>
    </div>
    <!-- ./ List Body  -->

    <!-- List Footer -->
    <div
      class="list-footer p-1 border-t dark:border-gray-700 flex items-center justify-between"
    >
      <UButton block icon="i-heroicons-plus" trailing variant="ghost"
        >Add card</UButton
      >
    </div>
    <!-- ./ List Footer  -->
  </div>
</template>

<style></style>
