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
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1">
        <CogIcon className="h-5 text-gray-400 hover:text-white cursor-pointer mr-4" />
        <InformationCircleIcon className="h-5 text-gray-400 hover:text-white cursor-pointer mr-4" />
        <QuestionMarkCircleIcon className="h-5 text-gray-400 hover:text-white cursor-pointer" />
        <ChartBarIcon className="h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="text-mainTextColor font-bold text-custom-size text-center absolute left-1/2 transform -translate-x-1/2">
        <Link href="/">Meowify</Link>
      </div>
      <div className="flex items-center flex-1 justify-end">
        <UserIcon className="h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  </nav>
);

export default TopNavBar;
