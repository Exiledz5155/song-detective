import React from "react";

interface Props {
  stemVal: string; // this can be typed to our specific Stem model
}

const StemItem: React.FC<Props> = ({ stemVal }) => (
  <div
    className="h-8 bg-gray-200 rounded-lg flex items-center justify-center text-black"
    style={{ width: "500px" }}
  >
    {stemVal}
  </div>
);

export default StemItem;
