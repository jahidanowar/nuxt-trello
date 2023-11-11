<script lang="ts" setup>
const formState = ref({
  name: "",
  email: "",
  password: "",
});
</script>
<template>
  <WrapperAuth title="Create an account for free">
    <template #header>
      <span class="text-sm mr-px">Already have an account?</span>
      <NuxtLink to="/auth/signin" class="text-primary-500"> Sign In </NuxtLink>
    </template>

    <UForm :state="formState">
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
        <UButton type="submit" color="primary" block> Sign Up </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
