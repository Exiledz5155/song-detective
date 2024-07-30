import { Box } from "@mui/material";
import TopNavBar from "../components/navbar";
import StemList from "../components/stemList";
import { Stem } from "../lib/definitions";
import { mainFont } from "@/components/fonts";
import SongProvider from "@/components/providers/SongProvider";
import Results from "@/components/results";

const App = () => (
  <div className={`${mainFont.className}`}>
    <SongProvider>
      <TopNavBar />
      <div className="container mx-auto max-w-screen-sm">
        <StemList />
        <Results />
      </div>
    </SongProvider>
  </div>
);

export default App;
