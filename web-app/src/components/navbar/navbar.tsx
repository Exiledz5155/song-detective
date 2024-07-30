import {
  QuestionMarkCircleIcon,
  UserIcon,
  CogIcon,
  InformationCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

const TopNavBar = () => (
  <nav className="bg-gray-1000 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CogIcon className="h-5 text-gray-400 hover:text-white cursor-pointer mr-4" />
        <InformationCircleIcon className="h-5 text-gray-400 hover:text-white cursor-pointer mr-4" />
        <QuestionMarkCircleIcon className="h-5 text-gray-400 hover:text-white cursor-pointer" />
        <ChartBarIcon className="h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="text-mainTextColor font-bold text-custom-size">
        <Link href="/">SONG DETECTIVE</Link>
      </div>
      <div className="flex items-center">
        <UserIcon className="h-5 text-gray-400 hover:text-white cursor-pointer mr-4" />
      </div>
    </div>
  </nav>
);

export default TopNavBar;
