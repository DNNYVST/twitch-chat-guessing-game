"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import UserMessage, { Message } from "./user-message";
import WinnerHistory, { Winner } from "./winner-history";

const client = new tmi.Client({
  channels: ["loltyler1"],
});

const secretWord = "a";

export default function Chat() {
  const [initialized, setInitialized] = useState(false);
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
    <main className="flex min-h-screen flex-col justify-between p-24">
      <section className="flex flex-col">
        {messageHistory.map(({ name, color, message }, i) => (
          <div key={i}>
            <UserMessage name={name} color={color} message={message} />
          </div>
        ))}
      </section>
      <section className="flex whitespace-pre-wrap">
        <h2 className="mb-3 text-2xl font-semibold">winner: </h2>
        <h2
          className="mb-3 text-2xl font-semibold"
          style={{ color: `${winner.color}` }}
        >
          {winner.name}
        </h2>
      </section>
      <section>
        <button
          onClick={() => setWinner({} as Winner)}
          disabled={!localStorage.winners}
        >{`>reset winner<`}</button>
        {initialized && (
          <>
            <button onClick={clearLeaderboard}>clear leaderboard</button>
            <WinnerHistory
              winners={JSON.parse(localStorage.winners || "[]") || []}
            />
          </>
        )}
      </section>
    </main>
  );
}
