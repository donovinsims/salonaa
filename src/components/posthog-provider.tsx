import { type ReactNode, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { initPostHog, capturePageView } from "@/lib/posthog";

export function PostHogProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    capturePageView();
  }, [router.state.location.pathname]);

  return <>{children}</>;
}
