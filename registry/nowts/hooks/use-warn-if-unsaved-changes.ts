import { useEffect } from "react";

// Comment : https://github.com/vercel/next.js/discussions/9662#discussioncomment-8819562
export const useWarnIfUnsavedChanges = (unsaved: boolean, message?: string) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAnchorClick = (e: any) => {
      const targetUrl = e.currentTarget.href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        if (window.onbeforeunload) {
          // @ts-expect-error - onbeforeunload is a function
          const res = window.onbeforeunload();
          if (!res) {
            e.preventDefault();
          }
        }
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll("a[href]");
      for (const anchor of anchorElements) {
        anchor.addEventListener("click", handleAnchorClick);
      }
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // don't know if needed or not but it works
    return () => {
      mutationObserver.disconnect();
      const anchorElements = document.querySelectorAll("a[href]");
      for (const anchor of anchorElements) {
        anchor.removeEventListener("click", handleAnchorClick);
      }
    };
  }, []);

  useEffect(() => {
    const beforeUnloadHandler = () => {
      const yes = confirm(
        message ??
          "Changes you made has not been saved just yet. Do you wish to proceed anyway?"
      );

      if (!yes) return;
    };
    window.onbeforeunload = unsaved ? beforeUnloadHandler : null;

    return () => {
      window.onbeforeunload = null;
    };
  }, [unsaved, message]);
};
