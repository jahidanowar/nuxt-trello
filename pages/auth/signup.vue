<script lang="ts" setup>
const formState = ref({
  name: "",
  email: "",
  password: "",
});

const isLoading = ref(false);

async function handleSubmit() {
  try {
    isLoading.value = true;
    await useFetch("/api/auth/signup", {
      method: "POST",
      body: formState.value,
    });
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <WrapperAuth title="Create an account for free">
    <template #header>
      <span class="text-sm mr-px">Already have an account?</span>
      <NuxtLink to="/auth/signin" class="text-primary-500"> Sign In </NuxtLink>
    </template>

    <UForm :state="formState" @submit="handleSubmit">
      <UFormGroup class="mb-4" name="name" label="Name">
        <UInput v-model="formState.name" type="text" placeholder="John Doe" />
      </UFormGroup>

      <UFormGroup class="mb-4" name="email" label="Email">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="john@email.com"
        />
      </UFormGroup>
      <UFormGroup class="mb-4" name="password" label="Password">
        <UInput
          v-model="formState.password"
          type="password"
          placeholder="********"
        />
      </UFormGroup>
      <UFormGroup>
        <UButton :loading="isLoading" type="submit" color="primary" block>
          Sign Up
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
