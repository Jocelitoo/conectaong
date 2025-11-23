"use client";

import { deleteOng } from "@/actions/ongActions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteOngButtonProps {
  ongId: string;
  imageId: string;
}

export const DeleteOngButton = ({ ongId, imageId }: DeleteOngButtonProps) => {
  const delOng = () => {
    deleteOng(ongId, imageId)
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
      onClick={delOng}
      className="cursor-pointer"
    >
      <Trash2 />
    </Button>
  );
};
