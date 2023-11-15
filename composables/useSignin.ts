import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { z } from "h3-zod";
import SigninSchema from "~/schemas/Signin.schema";

export const useSignin = () => {
  const formState = reactive({
    email: undefined,
    password: undefined,
  });

  const validationSchema = SigninSchema;
  const isLoading = ref(false);

  const router = useRouter();
  const { signIn } = useAuth();

  async function handleSubmit(
    event: FormSubmitEvent<z.output<typeof validationSchema>>
  ) {
    try {
      isLoading.value = true;

      // @ts-expect-error
      const { error } = await signIn("credentials", {
        redirect: false,
        email: event.data.email,
        password: event.data.password,
      });

      if (error) {
        throw new Error(error);
      }

      router.push("/");
    } catch (e) {
      useToast().add({
        id: "error",
        title: "Invalid credentials",
        color: "red",
        icon: "i-heroicons-information-circle",
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  }

  return {
    formState,
    isLoading,
    validationSchema,
    handleSubmit,
  };
};
