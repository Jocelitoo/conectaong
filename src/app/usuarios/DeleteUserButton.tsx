"use client";

import { deleteUser } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface DeleteUserButtonProps {
  ongId: string;
  imageId: string | undefined;
}

export const DeleteUserButton = ({ ongId, imageId }: DeleteUserButtonProps) => {
  const { data, status } = useSession();

  const delUser = () => {
    if (data?.user.role === "Admin")
      deleteUser(ongId, imageId)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          toast(error.message, {
            style: { backgroundColor: "#e74c3c", color: "#000" },
          });
        });
  };

  return (
    <Button
      size={"lg"}
      variant={"destructive"}
      onClick={delUser}
      className="cursor-pointer"
    >
      <Trash2 />
    </Button>
  );
};
