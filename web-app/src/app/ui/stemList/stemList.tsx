import { Stem } from "@/app/lib/definitions";
import React from "react";
import StemItem from "../StemItem";

interface StemListProps {
  stems: Stem[];
}

const StemList: React.FC<StemListProps> = ({ stems }) => (
  <>
    {stems.map((stem) => (
      <div key={stem.id} className="mb-4">
        <StemItem stemVal={stem.name} />
      </div>
    ))}
  </>
);

export default StemList;
