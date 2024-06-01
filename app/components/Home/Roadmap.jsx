import React from "react";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";

function Roadmap() {
  return (
    <div className="roadmap sidebar-item">
      <div className="flex justify-between items-center">
        <div className="text-[1.5rem] font-bold text-darkblue">Roadmap</div>
        <div>
          <Link href="#" className="text-lightblue underline">
            View
          </Link>
        </div>
      </div>
      <ul className="mt-6">
        <li className="flex items-center gap-4 py-1">
          <FaCircle className="text-[#f49e85]" /> <span className="flex-1 opacity-70">Planned</span> <span className="opacity-60 font-bold">2</span>
        </li>
        <li className="flex items-center gap-4 py-1 ">
          <FaCircle className="text-[#ae1feb]" /> <span className="flex-1 opacity-60">In-Progress</span> <span className="opacity-60 font-bold">3</span>
        </li>
        <li className="flex items-center gap-4 py-1 ">
          <FaCircle className="text-[#63bdfa]" /> <span className="flex-1 opacity-60">Live</span> <span className="opacity-60 font-bold">1</span>
        </li>
      </ul>
    </div>
  );
}

export default Roadmap;
