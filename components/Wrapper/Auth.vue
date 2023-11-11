<script lang="ts" setup>
defineProps({
  title: {
    type: String,
  },
});
</script>
<template>
  <div class="grid lg:grid-cols-2 h-screen bg-gray-100 dark:bg-gray-950">
    <div class="left place-self-center w-full px-16 lg:px-32 xl:px-52">
      <div class="header text-center mb-6">
        <div class="flex justify-center my-4"><Logo /></div>
        <h1 class="text-xl font-bold mb-px">{{ title }}</h1>
        <slot name="header"></slot>
      </div>
      <UCard>
        <slot />
      </UCard>
    </div>
    <div class="right hidden lg:block"></div>
  </div>
</template>

<style>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
