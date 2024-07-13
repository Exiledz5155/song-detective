import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

const TopNavBar = () => (
  <nav className="bg-gray-1000 p-4">
    <div className="container mx-auto flex justify-center items-center">
      <div className="text-mainTextColor font-bold text-custom-size">
        <Link href="/">SONG DETECTIVE</Link>
      </div>
      <QuestionMarkCircleIcon className="h-5 md:ml-4 text-gray-400 hover:text-white cursor-pointer" />
    </div>
  </nav>
);

export default TopNavBar;
