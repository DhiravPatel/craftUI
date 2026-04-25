"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@craftui/ui";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "At least 8 characters"),
    bio: z.string().max(160, "Bio must be 160 characters or fewer").optional(),
    country: z.string().min(1, "Pick a country"),
    dob: z.date({ required_error: "Date of birth is required" }).optional(),
    plan: z.enum(["hobby", "pro", "team"], {
      required_error: "Choose a plan",
    }),
    marketing: z.boolean(),
    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms",
    }),
  });

type FormValues = z.infer<typeof schema>;

export function FullFormDemo() {
  const [submitted, setSubmitted] = React.useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      country: "",
      plan: "pro",
      marketing: true,
      terms: false,
    },
    mode: "onTouched",
  });

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-6"
      >
        <Section title="Account">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Pedro Duarte" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  Use 8 or more characters with a mix of letters and numbers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title="Profile">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little about yourself…"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief description that appears on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Plan">
          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a plan</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-3 sm:grid-cols-3"
                  >
                    {[
                      { value: "hobby", title: "Hobby", price: "$0/mo" },
                      { value: "pro", title: "Pro", price: "$20/mo" },
                      { value: "team", title: "Team", price: "$80/mo" },
                    ].map((p) => (
                      <FormLabel
                        key={p.value}
                        className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 has-[:checked]:border-foreground"
                      >
                        <RadioGroupItem value={p.value} className="mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold">
                            {p.title}
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {p.price}
                          </div>
                        </div>
                      </FormLabel>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title="Preferences">
          <div className="space-y-3 rounded-lg border p-4">
            <FormField
              control={form.control}
              name="marketing"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between gap-4 space-y-0">
                  <div>
                    <FormLabel className="text-sm">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive monthly product updates.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm">
                      Accept terms and conditions
                    </FormLabel>
                    <FormDescription>
                      You agree to our Terms of Service and Privacy Policy.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </Section>

        <div className="flex items-center justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset();
              setSubmitted(null);
            }}
          >
            Reset
          </Button>
          <Button type="submit" loading={form.formState.isSubmitting}>
            Create account
          </Button>
        </div>

        {submitted ? (
          <pre className="mt-4 max-h-56 overflow-auto rounded-lg border bg-muted/30 p-3 font-mono text-xs">
            {JSON.stringify(
              submitted,
              (_k, v) => (v instanceof Date ? v.toISOString() : v),
              2
            )}
          </pre>
        ) : null}
      </form>
    </Form>
  );
}

export function LoginFormDemo() {
  const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "At least 8 characters"),
  });
  type LoginValues = z.infer<typeof loginSchema>;

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {
          /* noop */
        })}
        className="w-full max-w-sm space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
}
