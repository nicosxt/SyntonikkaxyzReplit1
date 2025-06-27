import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import PlatformerGame from "../components/PlatformerGame";
import StarfieldBackground from "../components/StarfieldBackground";

export default function PlatformerPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Starfield background - visible in both light and dark modes for the game */}
      <StarfieldBackground className="block" />
      
      {/* BACK Button - positioned like MORE button on HOME page but left-aligned */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <button className="flex items-center gap-2 text-gray-800 dark:text-white hover:opacity-70 transition-all duration-300 hover:translate-x-[-4px] hover:scale-105">
            <ArrowLeft className="w-6 h-6 transition-transform duration-300 hover:translate-x-[-4px]" />
            <span className="text-lg font-light">BACK</span>
          </button>
        </Link>
      </div>
      
      {/* Game Container with transparent background */}
      <div className="relative w-full h-full z-10">
        <PlatformerGame />
      </div>
    </div>
  );
}