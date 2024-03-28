"use client";

import { userSchema } from "@/lib/validation";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import useEditModal from "@/hooks/useEditModal";
import { toast } from "../ui/use-toast";
import Button from "../ui/Button";
import { Textarea } from "../ui/textarea";

interface PropsType {
  user: IUser;
}

export default function EditForm({ user }: PropsType) {
  const router = useRouter();
  const editModal = useEditModal();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      await axios.put(`/api/users/${user._id}`, values);
      router.refresh();
      editModal.onClose();
    } catch (error: any) {
      if (error.response.data.error) {
        return toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-4 relative -top-8 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            const username = field.value.replace(/\s+/g, "_").toLocaleLowerCase();
            field.value = username;
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} value={username} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          label={"Save"}
          secondary
          large
          fullWidth
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
