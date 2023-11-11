<script lang="ts" setup>
const formState = ref({
  email: "",
  password: "",
});
const isLoading = ref(false);

const router = useRouter();
const { signIn } = useAuth();

async function handleSubmit() {
  try {
    isLoading.value = true;
    await signIn("credentials", {
      callbackUrl: "/",
      email: formState.value.email,
      password: formState.value.password,
    });
    router.push("/");
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <WrapperAuth title="Sign In to your account">
    <template #header>
      <span class="text-sm mr-px">Don't have an account?</span>
      <NuxtLink to="/auth/signup" class="text-primary-500"> Sign Up </NuxtLink>
    </template>

    <UForm :state="formState" @submit="handleSubmit">
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
          Sign In
        </UButton>
      </UFormGroup>
    </UForm>
  </WrapperAuth>
</template>

<style></style>
