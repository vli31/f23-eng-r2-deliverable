"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];

// Create the DeleteSpeciesDialog component
export default function DeleteSpeciesDialog({species, profile}: {species: Species, profile: string}) {
  const router = useRouter();

  const handleDelete = async () => {
    // Show a confirmation dialog to confirm the deletion
    if (profile != species.author) {
      return toast({
        title: "Something went wrong.",
        description: "Please only delete your own animals!",
        variant: "destructive",
      })
    }

    const confirmDeletion = window.confirm('Are you sure you want to delete this species?');

    if (confirmDeletion) {
      const supabase = createClientComponentClient<Database>();

      const { error } = await supabase.from("species").delete().eq("id", species.id);

      if (error) {
        return toast({
          title: "Something went wrong.",
          description: error.message,
          variant: "destructive",
        });
      }

      // Refresh the species list after deletion
      router.refresh();
    }
  };

  return (
    <Dialog>
            <Button
              variant="destructive"
              onClick={handleDelete}>
              Delete
            </Button>
    </Dialog>
  );
}
