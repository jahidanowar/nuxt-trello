<script lang="ts" setup>
import type { UserDocument } from "~/server/models/User";
const { data, signOut } = useAuth();

const { showSubscriptionModal, accessPortal } = useSubscription();

const dropdownItems = ref([
  [
    {
      label: "Profile",
      slot: "profile",
      disabled: true,
    },
  ],
  [
    {
      label: "Billing",
      icon: "i-heroicons-credit-card",
      click: accessPortal,
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: handleSignout,
    },
  ],
]);

async function handleSignout() {
  await signOut();
}
</script>
<template>
  <div>
    <header class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="flex justify-between">
          <NuxtLink to="/"><Icon class="w-8 h-8" /></NuxtLink>

          <div class="inline-flex justify-end gap-4 items-center">
            <slot name="actions"></slot>

            <UButton
              v-if="!(data?.user as UserDocument)?.hasActiveSubscription"
              variant="outline"
              color="amber"
              @click="showSubscriptionModal"
            >
              <UIcon name="i-heroicons-star" />
            </UButton>

            <ColorSwitcher />
            <UDropdown :items="dropdownItems">
              <UIcon name="i-heroicons-user-circle" class="w-6 h-6" />

              <template #profile>
                <div class="text-left">
                  <p>Signed in as</p>
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ data?.user?.email }}
                  </p>
                </div>
              </template>
            </UDropdown>
          </div>
        </div>
      </UContainer>
    </header>

    <main class="my-4">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<style></style>
