<script lang="ts" setup>
import draggable from "vuedraggable";
import type { CardDocument } from "~/server/models/Card";
import type { ListDocument } from "~/server/models/List";

const props = defineProps<{
  list: ListDocument;
  boardId: string;
}>();

const { destroy, update } = useList();
const showCreateCard = ref(false);
const selectedCard = ref<CardDocument | undefined>();

const refreshBoard = inject("refresh-board") as () => void;

const listActions = ref([
  [
    {
      label: "Add card",
      icon: "i-heroicons-plus-circle",
      click: () => {
        showCreateCard.value = true;
      },
    },
    {
      label: "Delete list",
      icon: "i-heroicons-trash",
      click: () => {
        destroy(props.list._id, refreshBoard);
      },
    },
  ],
]);

const { data, refresh } = await useFetch<CardDocument[]>(
  `/api/lists/${props.list._id}/cards`
);

const { update: updateCard } = useCard();

async function handleCardChange(e: any) {
  try {
    if (e.added) {
      const { element: card } = e.added;
      await updateCard(props.list._id, card._id, {
        list: props.list._id,
      });
    }

    await update(props.list._id, {
      cards: data.value?.flatMap((item) => item._id),
    });
  } catch (e: any) {
    useToast().add({
      title: "Error",
      description: e.message || "Something went wrong",
    });
  }
}
</script>
<template>
  <div
    class="w-72 flex-none shadow dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 list flex flex-col"
  >
    <!-- List Header  -->
    <div
      class="list-header p-2 border-b dark:border-gray-700 flex items-center justify-between cursor-grab"
    >
      <h3 class="font-medium">{{ list.name }}</h3>

      <div class="ml-auto">
        <UDropdown :items="listActions">
          <UButton
            size="sm"
            color="white"
            variant="link"
            icon="i-heroicons-cog-6-tooth"
          >
          </UButton>
        </UDropdown>
      </div>
    </div>
    <!-- ./ List Header  -->

    <!-- List Body  -->

    <draggable
      v-if="data"
      :list="data"
      item-key="_id"
      group="list"
      :scroll-sensitivity="500"
      :force-fallback="true"
      ghost-class="ghost-card"
      drag-class="dragging-card"
      class="list-body p-2 space-y-2 flex-1 overflow-y-auto"
      @change="handleCardChange"
    >
      <template #item="{ element }">
        <div
          class="p-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:border-gray-700 cursor-grab"
        >
          <div>
            {{ element.title }}
          </div>
        </div>
      </template>
    </draggable>

    <!-- ./ List Body  -->

    <!-- List Footer -->
    <div
      class="list-footer p-1 border-t dark:border-gray-700 flex items-center justify-between"
    >
      <UButton
        block
        icon="i-heroicons-plus"
        trailing
        variant="ghost"
        @click="showCreateCard = true"
        >Add card</UButton
      >
    </div>
    <!-- ./ List Footer  -->

    <Teleport to="body">
      <UModal v-model="showCreateCard">
        <SlideoverHeader
          title="Create a card"
          :on-click="() => (showCreateCard = false)"
        ></SlideoverHeader>
        <div class="p-4">
          <FormCard
            :list-id="list._id"
            :type="selectedCard ? 'update' : 'create'"
            :initial-data="selectedCard"
            :on-create="
              () => {
                showCreateCard = false;
                refresh();
              }
            "
          ></FormCard>
        </div>
      </UModal>
    </Teleport>
  </div>
</template>

<style scoped>
.ghost-card {
  @apply !bg-gray-100 dark:!bg-gray-700;
}
.ghost-card > div {
  @apply invisible;
}

.dragging-card {
  @apply transform rotate-2 shadow-xl !cursor-grabbing;
}
.sortable-chosen {
  opacity: 1 !important;
  cursor: grabbing;
}
</style>
