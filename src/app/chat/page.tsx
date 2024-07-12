"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import Card from "./components/core/card";
import SecretWordForm from "./components/secret-word-form";
import Leaderboard from "./components/leaderboard";
import Button from "./components/core/button";
import UserMessage, { Message } from "./components/user-message";
import ChatPlaceholder from "./components/chat-placeholder";
import { Winner } from "./components/winner-history";

const client = new tmi.Client({
  channels: ["loltyler1"],
});

export default function Chat() {
  const [initialized, setInitialized] = useState(false);
  const [secretWord, setSecretWord] = useState<string>("");
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
      secretWord &&
      Object.keys(winner).length === 0 &&
      lastMessage?.message?.toLowerCase().includes(secretWord)
    ) {
      const winner = { ...lastMessage };
      setWinner(winner);
      localStorage.winners = JSON.stringify([
        winner,
        ...JSON.parse(localStorage.winners),
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
      <section className="h-min">
        <Card title="Secret Word">
          <SecretWordForm onSubmit={setSecretWord} />
        </Card>
      </section>
      {/* leaderboard */}
      {initialized && (
        <section className="sm:col-start-2 min-h-72">
          <Card title="Leaderboard">
            <Leaderboard winners={JSON.parse(localStorage.winners || "[]")}/>
          </Card>
        </section>
      )}
      {/* winner */}
      {Object.keys(winner).length > 0 && (
        <section className="whitespace-pre-wrap sm:col-span-2">
          <Card title="Winner">
            <h2
              className="mb-3 text-2xl font-semibold"
              style={{ color: `${winner.color}` }}
            >
              {winner.name}
            </h2>
            <Button
              aria-label="Reset winner"
              onClick={() => setWinner({} as Winner)}
            >{`Reset winner`}</Button>
          </Card>
        </section>
      )}
      {/* chat */}
      <section className="sm:col-span-2">
        <Card title="Chat">
          {initialized && messageHistory.length > 1 ? (
            <>
              {messageHistory.map(({ name, color, message }, i) => (
                <div key={i}>
                  <UserMessage name={name} color={color} message={message} />
                </div>
              ))}
            </>
          ) : (
            <ChatPlaceholder />
          )}
        </Card>
      </section>
    </main>
  );
}
