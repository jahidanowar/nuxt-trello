<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { z } from "h3-zod";
import SignupSchema from "~/schemas/Signup.schema";

useHead({
  title: "Signup",
});

const formState = ref({
  name: undefined,
  email: undefined,
  password: undefined,
  passwordConfirm: undefined,
});

const isLoading = ref(false);

async function handleSubmit(
  event: FormSubmitEvent<z.output<typeof SignupSchema>>
) {
  try {
    isLoading.value = true;
    await useFetch("/api/auth/signup", {
      method: "POST",
      body: event.data,
    });
    useToast().add({
      title: "Account created",
      description:
        "Your account has been created successfully, Redirecting you to the sign in page",
    });
    await useRouter().push({
      name: "auth-signin",
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

    <UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
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
      <UFormGroup class="mb-4" name="passwordConfirm" label="Confirm Password">
        <UInput
          v-model="formState.passwordConfirm"
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
