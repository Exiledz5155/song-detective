import { Box } from "@mui/material";
import TopNavBar from "./ui/navbar";
import StemList from "./ui/stemList";
import { Stem } from "./lib/definitions";

const App = () => {
  const stems: Stem[] = [
    { id: "1", name: "Drums", songId: "fav song" },
    { id: "2", name: "Bass", songId: "fav song" },
    { id: "3", name: "Synth1", songId: "fav song" },
    { id: "4", name: "Synth2", songId: "fav song" },
    { id: "5", name: "Voice Cover", songId: "fav song" },
  ];
  return (
    <div>
      <TopNavBar />
      <div className="flex justify-center ">
        <div>
          <StemList stems={stems} />
        </div>
      </div>
    </div>
  );
};

export default App;
