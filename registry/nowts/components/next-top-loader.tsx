"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { create } from "zustand";

type NextTopLoaderProps = {
  /**
   * Color for the TopLoader.
   * @default "#3b82f6"
   */
  color?: string;
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number;
  /**
   * To show spinner or not.
   * @default true
   */
  showSpinner?: boolean;
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number;
  /**
   * Timeout in ms before the TopLoader will appear.
   * @default 0
   */
  delay?: number;
};

const isAnchorOfCurrentUrl = (currentUrl: string, newUrl: string) => {
  const currentUrlObj = new URL(currentUrl);
  const newUrlObj = new URL(newUrl);
  const currentHash = currentUrlObj.hash;
  const newHash = newUrlObj.hash;

  return (
    currentUrlObj.hostname === newUrlObj.hostname &&
    currentUrlObj.pathname === newUrlObj.pathname &&
    currentUrlObj.search === newUrlObj.search &&
    currentHash !== newHash &&
    currentUrlObj.href.replace(currentHash, "") ===
      newUrlObj.href.replace(newHash, "")
  );
};

export const useNextTopLoaderStore = create<{
  isEnable: boolean;
  isLoading: boolean;
  progress: number;
  disable: () => void;
  enable: () => void;
  start: () => void;
  done: () => void;
  setProgress: (progress: number) => void;
}>((set) => ({
  isEnable: true,
  isLoading: false,
  progress: 0,
  disable: () => set({ isEnable: false }),
  enable: () => set({ isEnable: true }),
  start: () => set({ isLoading: true, progress: 0 }),
  done: () => set({ isLoading: false, progress: 100 }),
  setProgress: (progress: number) => set({ progress }),
}));

const TopLoaderBar = ({
  color = "#3b82f6",
  height = 3,
  showSpinner = true,
  speed = 200,
}: Pick<NextTopLoaderProps, "color" | "height" | "showSpinner" | "speed">) => {
  const { isLoading, progress } = useNextTopLoaderStore();

  if (!isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        width: "100%",
        height: `${height}px`,
      }}
    >
      <div
        className="h-full transition-all ease-out"
        style={{
          backgroundColor: color,
          width: `${progress}%`,
          transition: `width ${speed}ms ease-out`,
          boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
        }}
      />
      {showSpinner && (
        <div
          className="absolute top-1/2 right-4 -translate-y-1/2 animate-spin"
          style={{
            width: `${height * 6}px`,
            height: `${height * 6}px`,
            border: `2px solid transparent`,
            borderTop: `2px solid ${color}`,
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export const NextTopLoader = ({
  color = "var(--primary)",
  height = 2,
  showSpinner = true,
  speed = 200,
  delay = 0,
}: NextTopLoaderProps) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let startTimeout: NodeJS.Timeout;

    const { start, done, setProgress } = useNextTopLoaderStore.getState();

    const startProgress = () => {
      start();
      let currentProgress = 0;

      progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15;
        if (currentProgress >= 90) {
          currentProgress = 90;
          clearInterval(progressInterval);
        }
        setProgress(currentProgress);
      }, 100);
    };

    const completeProgress = () => {
      clearInterval(progressInterval);
      clearTimeout(startTimeout);
      setProgress(100);
      setTimeout(() => {
        done();
      }, speed);
    };

    const handleClick = (event: MouseEvent) => {
      if (useNextTopLoaderStore.getState().isEnable === false) return;

      if (event.ctrlKey || event.metaKey) return;

      try {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (!anchor) return;

        const currentUrl = window.location.href;
        const newUrl = anchor.href;
        const isExternalLink = anchor.target === "_blank";
        const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
        const isDisabled = anchor.getAttribute("data-toploader-disabled");

        if (isDisabled === "true") return;

        if (newUrl === currentUrl || isAnchor || isExternalLink) {
          // Quick progress for same page or anchor links
          start();
          setTimeout(completeProgress, 50);
        } else {
          // Start progress for navigation
          if (delay === 0) {
            startProgress();
          } else {
            startTimeout = setTimeout(() => {
              startProgress();
            }, delay);
          }
        }
      } catch {
        // Quick progress for any errors
        start();
        setTimeout(completeProgress, 50);
      }
    };

    // Override history methods to detect navigation completion
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      completeProgress();
      return originalPushState.apply(window.history, args);
    };

    window.history.replaceState = function (...args) {
      completeProgress();
      return originalReplaceState.apply(window.history, args);
    };

    // Listen for popstate (back/forward buttons)
    const handlePopState = () => {
      completeProgress();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
      clearInterval(progressInterval);
      clearTimeout(startTimeout);

      // Restore original methods
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [delay, speed]);

  if (!mounted) return null;

  return createPortal(
    <TopLoaderBar
      color={color}
      height={height}
      showSpinner={showSpinner}
      speed={speed}
    />,
    document.body
  );
};

/**
 * Stop loading of the current top loader bar
 */
export const stopLoading = () => {
  const { setProgress, done } = useNextTopLoaderStore.getState();
  setProgress(100);
  setTimeout(() => {
    done();
  }, 100);
};
