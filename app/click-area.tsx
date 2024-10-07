"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";

const ClickArea = () => {
  const [points, setPoints] = useState(250000);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 11;

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return (
    <div className="bg-blue-900 h-dvh">
      <h1 className="text-center text-2xl py-3 font-semibold text-white">
        {" "}
        {points}{" "}
      </h1>
      <div className="p-4 flex justify-center">
        <div
          className="w-full h-full rounded-full p-4 circle-outer"
          onClick={handleCardClick}
        >
          <div className="w-full h-full rounded-full circle-inner">
            <Image
              src="/hmster.png"
              alt="Main Character"
              width={300}
              height={300}
              className="w-full h-full"
            />
          </div>
        </div>

        {clicks.map((click) => (
          <div
            key={click.id}
            className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
            style={{
              top: `${click.y - 42}px`,
              left: `${click.x - 28}px`,
              animation: `float 1s ease-out`,
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            {pointsToAdd}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickArea;
