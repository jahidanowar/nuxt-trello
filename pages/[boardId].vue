<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

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
      click: () => {},
    },
  ],
]);
</script>
<template>
  <WrapperDefault>
    <h1 class="tex-3xl font-semibold">Main Board</h1>

    <div class="flex h-[80vh] mt-4 overflow-x-auto gap-4 pb-2">
      <div
        v-for="i in 3"
        class="w-72 flex-none border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 list flex flex-col"
      >
        <div
          class="list-header p-2 border-b dark:border-gray-700 flex items-center justify-between cursor-move"
        >
          <h3 class="font-medium">List {{ i }}</h3>

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

        <div class="list-body px-1 py-2 space-y-2 flex-1 overflow-y-auto">
          <div
            v-for="i in 10"
            class="card p-2 rounded-lg shadow-sm text-sm dark:bg-gray-900 dark:border-gray-700 border"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </div>
        </div>

        <div
          class="list-footer p-1 border-t dark:border-gray-700 flex items-center justify-between"
        >
          <UButton block icon="i-heroicons-plus" trailing variant="ghost"
            >Add card</UButton
          >
        </div>
      </div>

      <div class="flex-none">
        <UButton block variant="link" icon="i-heroicons-plus"
          >Create new List</UButton
        >
      </div>
    </div>
  </WrapperDefault>
</template>

<style></style>
