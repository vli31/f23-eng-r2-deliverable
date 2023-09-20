"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";

// Create the LearnMoreDialog component
export default function LearnMoreDialog({ species }: {species: Database["public"]["Tables"]["species"]["Row"]}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Learn More
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Species Details</DialogTitle>
        </DialogHeader>
          <div className="p-4">
          <h2>{species.common_name}</h2>
          <p>{species.scientific_name}</p>
          <p>Kingdom: {species.kingdom}</p>
          {species.total_population && (
            <p>Total Population: {species.total_population}</p>
          )}
          <p className="mt-2">{species.description}</p>
          <div className="mt-4 flex justify-end">
            {/* onClick={onClose}  */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
