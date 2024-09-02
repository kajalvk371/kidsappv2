import Link from "next/link";
import GameCard from "./_components/GameCard";
import GameCardMaths from "./_components/GameCardMaths";
import GameCardQuiz from "./_components/GameCardQuiz";
export default function Home() {
  return (
    <div className="h-full flex  flex-col gap-5">
      <h1 className="text-4xl font-semibold border-b text-pink-600">
        Kids Learning App!
      </h1>
      <p>select any game to start! &rarr;</p>
      <div className="flex gap-8 md:flex-row flex-col">
        <GameCard />
        <GameCardMaths />
        <GameCardQuiz />
      </div>
    </div>
  );
}
