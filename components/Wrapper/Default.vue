<script lang="ts" setup>
const { data, signOut } = useAuth();

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
      click: () => {},
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
            <ColorSwitcher />
            <UDropdown :items="dropdownItems">
              <UAvatar
                size="xs"
                src="https://avatars.githubusercontent.com/u/29729380?v=4"
              />

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
