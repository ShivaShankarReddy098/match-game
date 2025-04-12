import Image from "next/image";
import logo from "../../public/match-game-website-logo.png";
export default function Navbar({ score, timer }) {
  return (
    <nav className="w-full bg-[#2c0e3a] shadow p-5 flex justify-between ">
      <Image src={logo} width={115} height={120} />
      <div className="flex gap-6 text-lg font-medium">
        <p className="text-white">
          Score: <span className="text-yellow-200">{score}</span>
        </p>
        <p className="flex">
          <img
            src="/match-game-timer-img.png"
            alt="timer"
            className="w-6 h-6"
          />
          <span className="text-yellow-200">{timer} sec</span>
        </p>
      </div>
    </nav>
  );
}
