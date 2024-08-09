import { Box } from "@mui/material";
import TopNavBar from "../components/navbar";
import StemList from "../components/stemList";
import { Stem } from "../lib/definitions";
import { mainFont } from "@/components/fonts";
import SongProvider from "@/components/providers/SongProvider";
import Results from "@/components/results";
import AppFooter from "@/components/appFooter";

const App = () => (
  <div className={`${mainFont.className} min-h-screen flex flex-col`}>
    <SongProvider>
      <TopNavBar />
      <div className="flex-grow container mx-auto p-4 md:p-8">
        <StemList />
        <Results />
      </div>
      <AppFooter />
    </SongProvider>
  </div>
);

export default App;
