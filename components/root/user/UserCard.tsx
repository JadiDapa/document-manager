import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@/lib/types/user";
import { format } from "date-fns";
import DeleteDialog from "../DeleteDialog";
import { deleteUser } from "@/lib/networks/user";

export default function UserCard({ user }: { user: UserType }) {
  return (
    <Card className="bg-background w-full rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="bg-primary flex size-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-inner">
            {user.username.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg leading-tight font-semibold">
              {user.username}
            </h3>

            <p className="text-muted-foreground text-sm capitalize">
              {user.role.toLowerCase()}
            </p>

            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                Joined {format(new Date(user.createdAt), "dd MMM yyyy")}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-muted mt-5 flex items-center justify-center gap-12 rounded-xl px-4 py-3">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">Role</p>
            <p className="font-semibold capitalize">{user.role}</p>
          </div>

          <div className="bg-border h-8 w-px" />

          <div className="text-center">
            <p className="text-muted-foreground text-xs">Status</p>
            <p className="font-semibold text-green-600">Active</p>
          </div>
        </div>

        {/* Action */}
        <div className="flex">
          <DeleteDialog
            mutatuonFn={deleteUser}
            queryKey={["users"]}
            params={user.id}
          >
            <Button className="bg-primary hover:text-primary mt-5 flex-1 rounded-xl rounded-e-none text-white hover:bg-white">
              Delete User
            </Button>
          </DeleteDialog>
          <Button className="border-primary text-primary hover:bg-primary mt-5 flex-1 rounded-xl rounded-s-none border-2 bg-white hover:text-white">
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
