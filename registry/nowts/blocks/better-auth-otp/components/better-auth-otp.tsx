"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
import { z } from "zod";
import { useCountdown } from "../hooks/use-countdown";

const LoginWithEmailOTPScheme = z.object({
  email: z.string().email(),
});

type LoginWithEmailOTPType = z.infer<typeof LoginWithEmailOTPScheme>;

export const SignInWithEmailOTP = (props: {
  callbackUrl?: string;
  email?: string;
}) => {
  const [otpEmail, setOtpEmail] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(LoginWithEmailOTPScheme),
    defaultValues: {
      email: props.email ?? "",
    },
  });
  const [ref, bounds] = useMeasure();
  const [direction, setDirection] = useState(1);

  const signInMutation = useMutation({
    mutationFn: async (values: LoginWithEmailOTPType) => {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email: values.email,
        type: "sign-in",
      });
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (_, values) => {
      setOtpEmail(values.email);
      setDirection(1);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (otp: string) => {
      if (!otpEmail) {
        throw new Error("Email is required");
      }

      const result = await authClient.signIn.emailOtp({
        email: otpEmail,
        otp: otp,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return result.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Signed in successfully");
      const cb = props.callbackUrl ?? "/home";
      window.location.href = cb;
    },
  });

  return (
    <motion.div animate={{ height: bounds.height }}>
      <div ref={ref}>
        <AnimatePresence mode="wait" custom={direction}>
          {otpEmail ? (
            <motion.div
              key="otp-verification-form"
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{ duration: 0.3 }}
              custom={direction}
            >
              <OtpVerificationForm
                email={otpEmail}
                onVerify={verifyOtpMutation.mutate}
                onResend={() => signInMutation.mutate({ email: otpEmail })}
                isResendPending={signInMutation.isPending}
                isVerifyPending={verifyOtpMutation.isPending}
                onBack={() => {
                  setDirection(-1);
                  setOtpEmail(null);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="otp-email-form"
              variants={variants}
              // initial="initial"
              animate="active"
              exit="exit"
              transition={{ duration: 0.3 }}
              custom={direction}
            >
              <OtpEmailForm
                onSubmit={(email) => signInMutation.mutate({ email })}
                defaultEmail={form.getValues("email")}
                isPending={signInMutation.isPending}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const variants = {
  initial: (direction: number) => {
    return { x: `${100 * direction}px`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-100 * direction}px`, opacity: 0 };
  },
};

export const OtpEmailForm = (props: {
  onSubmit: (email: string) => void;
  defaultEmail?: string;
  isPending: boolean;
}) => {
  const form = useForm({
    resolver: zodResolver(LoginWithEmailOTPScheme),
    defaultValues: {
      email: props.defaultEmail ?? "",
    },
  });

  function onSubmit(values: LoginWithEmailOTPType) {
    props.onSubmit(values.email);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full ring-offset-2 ring-offset-card"
        >
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export const OtpVerificationForm = (props: {
  onVerify: (otp: string) => void;
  onResend: () => void;
  isResendPending: boolean;
  isVerifyPending: boolean;
  email: string;
  onBack: () => void;
}) => {
  const [value, setValue] = useState("");

  const setOtpValue = (otp: string) => {
    setValue(otp);
    if (otp.length === 6) {
      props.onVerify(otp);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-muted-foreground text-sm">
        Enter the code sent to your email{" "}
        <span className="font-bold">{props.email}</span>
      </p>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setOtpValue}
        className={cn({
          "animate-pulse": props.isVerifyPending,
        })}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="flex items-center gap-2">
        <button
          onClick={props.onBack}
          className={cn("underline", "text-muted-foreground text-sm")}
        >
          Edit email
        </button>
        <ResendOtpButton
          isPending={props.isResendPending}
          onResend={props.onResend}
        />
      </div>
    </div>
  );
};

const ResendOtpButton = (props: {
  isPending: boolean;
  onResend: () => void;
}) => {
  const countdown = useCountdown(60);

  return (
    <button
      onClick={() => {
        countdown.reset();
        props.onResend();
      }}
      disabled={props.isPending || !countdown.isCountdownFinished}
      className={cn(
        "underline text-muted-foreground text-sm",
        {
          "animate-pulse": props.isPending,
        },
        "disabled:opacity-50"
      )}
    >
      Resend {countdown.count > 0 ? `(${countdown.count})` : ""}
    </button>
  );
};
