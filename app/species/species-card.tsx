// import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import React, { useState } from 'react';

import Image from "next/image";
import LearnMoreDialog from "./learn-more-dialog";
// import AddSpeciesDialog from "./add-species-dialog";
// import { createServerSupabaseClient } from "@/lib/server-utils";
// import { redirect } from "next/navigation";
import EditSpeciesDialog from "./edit-species-dialog";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({species, profile}: {species: Species, profile: string}) {
  // Create supabase server component client and obtain user session from stored cookie
  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <LearnMoreDialog species={species}/>
      <EditSpeciesDialog key={new Date().getTime()} userId={profile} />
    </div>
  );
}
