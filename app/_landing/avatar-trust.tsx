import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function AvatarTrust(props: { count?: number }) {
  return (
    <div className="bg-background flex items-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-1.5">
        <Avatar className="size-5">
          <AvatarImage src="/images/users/user-1.png" alt="Avatar 01" />
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
        <Avatar className="size-5">
          <AvatarImage src="/images/users/user-2.png" alt="Avatar 02" />
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
        <Avatar className="size-5">
          <AvatarImage src="/images/users/user-3.png" alt="Avatar 03" />
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
        <Avatar className="size-5">
          <AvatarImage src="/images/users/user-4.png" alt="Avatar 04" />
          <AvatarFallback>
            <User className="size-4" />
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="text-muted-foreground px-2 text-xs">
        <strong className="text-foreground font-medium">
          {props.count ?? "+2000"}
        </strong>{" "}
        trusted by developers
      </p>
    </div>
  );
}
