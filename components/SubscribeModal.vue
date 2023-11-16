<script lang="ts" setup>
const {
  subscriptionModalState,
  modalTitle,
  modalDescription,
  isLoading,
  subscribe,
} = useSubscription();
</script>
<template>
  <div>
    <UModal v-model="subscriptionModalState">
      <div class="p-8 text-center">
        <h1 class="text-2xl font-medium">
          {{ modalTitle }}
        </h1>
        <p class="mt-4 text-gray-500 dark:text-gray-300">
          {{ modalDescription }}
        </p>
        <NuxtImg src="/img/boards.png" class="w-10/12 mx-auto block" />
        <UButton class="mt-4" block :loading="isLoading" @click="subscribe"
          >Subscribe for $3.9/m</UButton
        >
      </div>
    </UModal>
  </div>
</template>

<style></style>
