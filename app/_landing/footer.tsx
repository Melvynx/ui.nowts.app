import { Typography } from "@/registry/nowts/components/typography";
import Link from "next/link";

export type FooterProps = {};

export const Footer = (props: FooterProps) => {
  return (
    <footer className="max-w-4xl mx-auto relative border-t py-8 mt-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <Typography variant="p" className="text-muted-foreground">
          Product by{" "}
          <Link
            href="https://melvynx.com"
            className="font-medium hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Melvyn
          </Link>{" "}
          <Link
            href="https://twitter.com/melvynxdev"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @melvynxdev
          </Link>
        </Typography>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="https://nowts.app"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Full-stack boilerplate: nowts.app
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/ui/better-auth-otp" className="hover:underline">
            Documentation
          </Link>
        </div>
        <Typography variant="muted">
          Documentation based on source code of{" "}
          <Link href="https://www.luxeui.com/">LuxeUI</Link>.
        </Typography>
      </div>
    </footer>
  );
};
