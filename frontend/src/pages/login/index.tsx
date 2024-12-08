import React, {useEffect} from 'react';
import Container from "../../components/Container";
import {ILoginRequest} from "../../types";
import authService from "../../services/auth.service";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";
import Logo from "../../components/Logo";
import {useForm} from "react-hook-form";
import {z, ZodType} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/ui/form";
import {Button} from "../../components/ui/button";
import {Loader2} from "lucide-react";
import useAuthStore from "../../stores/store";

const LoginSchema: ZodType<ILoginRequest> = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

function LoginPage() {
  const {login, token} = useAuthStore();
  const form = useForm<ILoginRequest>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!!token) {
      navigate("/", {replace: true});
    }
  }, [token, navigate]);

  const onSubmit = async (values: ILoginRequest) => {
    try {
      const res = await authService.login(values);
      login(res.token);
    } catch (err: any) {
      if (err?.response?.data?.error) {
        form.setError("username", {message: err.response.data.error});
      } else {
        toast.error(err.message ?? "An error occurred")
      }
    }
  }

  return (
    <Container>
      <div
        className="bg-background w-full max-w-xl p-8 mx-auto rounded-lg shadow-xl border border-border"
      >
        <Logo/>

        <h3 className="leading-none mt-6" data-testid="login-title">Login</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 mt-8">
            <FormField
              control={form.control}
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" autoComplete="username" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password"
                           autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="animate-spin"/>
                )}
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Container>
  );
}

export default LoginPage;
