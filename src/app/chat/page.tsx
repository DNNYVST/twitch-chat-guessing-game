"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import UserMessage, { Message } from "./user-message";
import WinnerHistory, { Winner } from "./winner-history";

const client = new tmi.Client({
  channels: ["loltyler1"],
});

export default function Chat() {
  const [initialized, setInitialized] = useState(false);
  const [secretWord, setSecretWord] = useState<string>("a");
  const [lastMessage, setLastMessage] = useState<Message>({} as Message);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [winner, setWinner] = useState<Winner>({} as Winner);

  useEffect(() => {
    // set up client and event handler
    client.connect();
    client.on(
      "message",
      (channel: string, tags: any, message: string, self: boolean) => {
        setLastMessage({
          name: tags["display-name"],
          color: tags.color === "#000000" ? "#FFFFFF" : tags.color,
          message: message,
        });
      }
    );
    // set scoreboard localStorage variable
    if (!localStorage.winners) {
      localStorage.winners = JSON.stringify([]);
    }
    // set initialized to true for render logic
    setInitialized(true);
  }, []);

  useEffect(() => {
    // keep track of last 5 messages only
    let history: Array<Message> = [...messageHistory, lastMessage];
    if (history.length > 5) {
      history.shift();
    }
    setMessageHistory(history);
    // set winner and update localStorage scoreboard
    if (
      Object.keys(winner).length === 0 &&
      lastMessage?.message?.toLowerCase().includes(secretWord)
    ) {
      const winner = { ...lastMessage };
      setWinner(winner);
      localStorage.winners = JSON.stringify([
        ...JSON.parse(localStorage.winners),
        winner,
      ]);
    }
  }, [lastMessage]);

  const clearLeaderboard = () => {
    localStorage.clear();
    localStorage.winners = JSON.stringify([]);
  };

  return (
    <main className="grid gap-4 sm:grid-cols-2 my-[5%] mx-[5%] sm:mx-[20%]">
      {/* secret configuration */}
      <section className="rounded-md bg-[#282b30] h-min shadow-lg p-4">
        <label
          htmlFor="secret"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Secret:{" "}
        </label>
        <input
          id="secret"
          type="text"
          value={secretWord}
          onChange={(e) => setSecretWord(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <button>SAVE/EDIT</button>
      </section>
      {/* leaderboard */}
      <section className="sm:col-start-2 rounded-md bg-[#282b30] min-h-72 shadow-lg p-4">
        {initialized && (
          <>
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Leaderboard:
            </p>
            <button onClick={clearLeaderboard}>clear</button>
            <div className="overflow-y-scroll max-h-72">
              <WinnerHistory
                winners={JSON.parse(localStorage.winners || "[]") || []}
              />
            </div>
          </>
        )}
      </section>
      {/* winner */}
      <section className="sm:col-span-2 whitespace-pre-wrap rounded-md bg-[#36393e] shadow-lg p-4">
        <h2 className="mb-3 text-2xl font-semibold">winner: </h2>
        <h2
          className="mb-3 text-2xl font-semibold"
          style={{ color: `${winner.color}` }}
        >
          {winner.name}
        </h2>
        <button
          onClick={() => setWinner({} as Winner)}
        >{`>reset winner<`}</button>
      </section>
      {/* chat */}
      <section className="sm:col-span-2 bg-[#282b30] rounded-md shadow-lg p-4">
        {messageHistory.map(({ name, color, message }, i) => (
          <div key={i}>
            <UserMessage name={name} color={color} message={message} />
          </div>
        ))}
      </section>
    </main>
  );
}
