import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { useCountdown } from "../hooks/use-countdown";

export type OtpFormProps = {
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  defaultEmail?: string;
  resendCooldown?: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

type Step = "email" | "otp";

export function OtpForm({
  sendOtp,
  verifyOtp,
  defaultEmail = "",
  resendCooldown = 60,
  onSuccess,
  onError,
}: OtpFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(defaultEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [otpResetKey, setOtpResetKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const handleSendOtp = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      await sendOtp(data.email);
      setEmail(data.email);
      setDirection(1);
      setStep("otp");
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      await verifyOtp(email, otp);
      onSuccess?.();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Invalid OTP");
      setOtpResetKey((prev) => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await sendOtp(email);
    } catch (error) {
      onError?.(
        error instanceof Error ? error.message : "Failed to resend OTP",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep("email");
  };

  return (
    <motion.div animate={{ height: bounds.height }}>
      <div ref={ref}>
        <AnimatePresence mode="wait" custom={direction}>
          {step === "email" ? (
            <motion.div
              key="email-step"
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{ duration: 0.15 }}
              custom={direction}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendOtp({ email });
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    type="email"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full ring-offset-2 ring-offset-card"
                >
                  {isLoading ? "Sending..." : "Sign in"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              transition={{ duration: 0.15 }}
              custom={direction}
            >
              <div className="flex w-full flex-col items-start gap-4">
                <p className="text-muted-foreground text-sm">
                  A one-time password has been sent to{" "}
                  <span className="font-bold">{email}</span>{" "}
                  <button
                    onClick={handleBack}
                    className="underline hover:text-foreground"
                    disabled={isLoading}
                    type="button"
                  >
                    Edit email
                  </button>
                </p>

                <div className="flex items-center gap-2">
                  <OtpInput
                    key={otpResetKey}
                    onVerify={handleVerifyOtp}
                    isLoading={isLoading}
                  />

                  <ResendButton
                    onResend={handleResendOtp}
                    isLoading={isLoading}
                    cooldown={resendCooldown}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const variants = {
  initial: (direction: number) => {
    return { x: `${20 * direction}px`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-20 * direction}px`, opacity: 0 };
  },
};

type OtpStepProps = {
  onVerify: (otp: string) => Promise<void>;
  isLoading: boolean;
};

function OtpInput({ onVerify, isLoading }: OtpStepProps) {
  const [otpValue, setOtpValue] = useState("");

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    if (value.length === 6) {
      void onVerify(value);
    }
  };

  return (
    <InputOTP
      maxLength={6}
      value={otpValue}
      onChange={handleOtpChange}
      disabled={isLoading}
      className={cn({
        "animate-pulse": isLoading,
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
  );
}

type ResendButtonProps = {
  onResend: () => void;
  isLoading: boolean;
  cooldown: number;
};

function ResendButton({ onResend, isLoading, cooldown }: ResendButtonProps) {
  const countdown = useCountdown(cooldown);

  const handleResend = () => {
    countdown.reset();
    onResend();
  };

  return (
    <button
      onClick={handleResend}
      disabled={isLoading || !countdown.isCountdownFinished}
      type="button"
      className={cn(
        "underline text-muted-foreground text-sm hover:text-foreground",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "animate-pulse": isLoading,
        },
      )}
    >
      Resend {countdown.count > 0 ? `(${countdown.count})` : ""}
    </button>
  );
}
