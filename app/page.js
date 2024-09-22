// app/page.js
import GameCard from "./_components/GameCard";
import GameCardMaths from "./_components/GameCardMaths";
import GameCardQuiz from "./_components/GameCardQuiz";
import ProtectedRoute from "./_components/ProtectedRoute";

export default function Home() {
  return (
    <div className="h-full flex flex-col gap-5">
      <h1 className="text-4xl font-semibold border-b text-pink-600">
        Kids Learning App!
      </h1>
      <p>Select any game to start! &rarr;</p>
      <div className="flex gap-8 md:flex-row flex-col">
        <ProtectedRoute>
          <GameCard />
          <GameCardMaths />
          <GameCardQuiz />
        </ProtectedRoute>
      </div>
    </div>
  );
}
