"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";

const tabsList = [
  { tabId: "FRUIT", displayText: "Fruits" },
  { tabId: "ANIMAL", displayText: "Animals" },
  { tabId: "PLACE", displayText: "Places" },
];

const imagesList = [
  {
    id: "1",
    imageUrl: "/images/fruits/mango.jpeg",
    thumbnailUrl: "/images/fruits/mango.jpeg",
    imageAltText: "mango",
    thumbnailAltText: "mango thumbnail",
    category: "FRUIT",
  },
  {
    id: "2",
    imageUrl: "/images/fruits/orange.jpeg",
    thumbnailUrl: "/images/fruits/orange.jpeg",
    imageAltText: "orange",
    thumbnailAltText: "orange thumbnail",
    category: "FRUIT",
  },
  {
    id: "3",
    imageUrl: "/images/fruits/pineapple.jpeg",
    thumbnailUrl: "/images/fruits/pineapple.jpeg",
    imageAltText: "pineapple",
    thumbnailAltText: "pineapple thumbnail",
    category: "FRUIT",
  },
  {
    id: "4",
    imageUrl: "/images/fruits/strawberry.jpeg",
    thumbnailUrl: "/images/fruits/strawberry.jpeg",
    imageAltText: "strawberry",
    thumbnailAltText: "strawberry thumbnail",
    category: "FRUIT",
  },
  {
    id: "5",
    imageUrl: "/images/animals/dog.jpeg",
    thumbnailUrl: "/images/animals/dog.jpeg",
    imageAltText: "dog",
    thumbnailAltText: "dog thumbnail",
    category: "ANIMAL",
  },
  {
    id: "6",
    imageUrl: "/images/animals/cat.jpeg",
    thumbnailUrl: "/images/animals/cat.jpeg",
    imageAltText: "cat",
    thumbnailAltText: "cat thumbnail",
    category: "ANIMAL",
  },
  {
    id: "7",
    imageUrl: "/images/animals/elephant.jpeg",
    thumbnailUrl: "/images/animals/elephant.jpeg",
    imageAltText: "elephant",
    thumbnailAltText: "elephant thumbnail",
    category: "ANIMAL",
  },
  {
    id: "8",
    imageUrl: "/images/animals/lion.jpeg",
    thumbnailUrl: "/images/animals/lion.jpeg",
    imageAltText: "lion",
    thumbnailAltText: "lion thumbnail",
    category: "ANIMAL",
  },
  {
    id: "9",
    imageUrl: "/images/places/beach.jpeg",
    thumbnailUrl: "/images/places/beach.jpeg",
    imageAltText: "beach",
    thumbnailAltText: "beach thumbnail",
    category: "PLACE",
  },
  {
    id: "10",
    imageUrl: "/images/places/temple.jpeg",
    thumbnailUrl: "/images/places/temple.jpeg",
    imageAltText: "temple",
    thumbnailAltText: "temple thumbnail",
    category: "PLACE",
  },
  {
    id: "11",
    imageUrl: "/images/places/park.jpeg",
    thumbnailUrl: "/images/places/park.jpeg",
    imageAltText: "park",
    thumbnailAltText: "park thumbnail",
    category: "PLACE",
  },
  {
    id: "12",
    imageUrl: "/images/places/museum.jpeg",
    thumbnailUrl: "/images/places/museum.jpeg",
    imageAltText: "museum",
    thumbnailAltText: "museum thumbnail",
    category: "PLACE",
  },
];

export default function MatchGameMainSection() {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [activeTab, setActiveTab] = useState("FRUIT");
  const [randomImage, setRandomImage] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const intervalRef = useRef(null);

  const generateRandomImage = () => {
    const random = imagesList[Math.floor(Math.random() * imagesList.length)];
    setRandomImage(random);
    setActiveTab(random.category);
  };
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    generateRandomImage();
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleThumbnailClick = (id) => {
    if (id === randomImage.id) {
      setScore((prev) => prev + 1);
      generateRandomImage();
    } else {
      clearInterval(intervalRef.current);
      setGameOver(true);
    }
  };

  const handleTabClick = (tabId) => setActiveTab(tabId);

  const handlePlayAgain = () => {
    setScore(0);
    setTimer(60);
    setGameOver(false);
    generateRandomImage();
    clearInterval(intervalRef.current);
    startTimer();
  };

  const filteredImages = imagesList.filter(
    (image) => image.category === activeTab
  );
  return (
    <div className="text-center">
      <Navbar score={score} timer={timer} />
      <img
        src="/match-game-bg.png"
        alt="hero-img"
        className="absolute -z-50 h-[100%] w-full"
      />

      {gameOver ? (
        <div className="relative mt-1 z-50 flex flex-col items-center justify-center px-4">
          <img
            src="/match-game-score-card-lg-bg.png"
            alt="match-game-over"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-4"
          />
          <div className="absolute top-1/2 mt-4 lg:top-110 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <img
              src="/match-game-trophy.png"
              alt="trophy"
              className="w-65 h-60  md:w-24 md:h-24 lg:w-88 lg:h-68 mb-4"
            />

            <div className="text-xl md:text-2xl mb-4 text-white text-center">
              <p>Your Score:</p>
              <p className="font-bold">{score}</p>
            </div>

            <button
              onClick={handlePlayAgain}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 flex items-center gap-2"
            >
              <img
                src="/match-game-play-again-img.png"
                alt="restart"
                className="w-4 h-4"
              />
              Play Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <img
              src={randomImage?.imageUrl}
              alt={randomImage?.imageAltText}
              className="w-120 h-100 mx-auto rounded shadow-md mt-10"
            />
          </div>

          <div className="mb-6">
            <ul className="flex justify-center gap-6">
              {tabsList.map((tab) => (
                <li key={tab.tabId}>
                  <button
                    onClick={() => handleTabClick(tab.tabId)}
                    className={`px-2 py-2 cursor-pointer transition delay-75 ${
                      activeTab === tab.tabId
                        ? " text-[#fec653] border-b-2"
                        : "text-white"
                    }`}
                  >
                    {tab.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex gap-2 sm:grid-cols-4  justify-center text-center">
            {filteredImages.map((image) => (
              <li key={image.id}>
                <button onClick={() => handleThumbnailClick(image.id)}>
                  <img
                    src={image.thumbnailUrl}
                    alt={image.thumbnailAltText}
                    className="w-24 h-24 rounded hover:cursor-pointer transition"
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
