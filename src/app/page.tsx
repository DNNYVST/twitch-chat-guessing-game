"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import Card from "./components/core/card";
import SetupForm from "./components/setup-form";
import Leaderboard, { Winner } from "./components/leaderboard";
import Button from "./components/core/button";
import UserMessage, { Message } from "./components/user-message";
import ChatPlaceholder from "./components/chat-placeholder";

export default function Page() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");
  const [secretWord, setSecretWord] = useState<string>("");
  const [lastMessage, setLastMessage] = useState<Message>({} as Message);
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [winner, setWinner] = useState<Winner>({} as Winner);

  useEffect(() => {
    // initial setup
    if (!localStorage.channelName) {
      localStorage.channelName = "";
    } else {
      setChannelName(localStorage.channelName);
    }
    if (!localStorage.winners) {
      localStorage.winners = JSON.stringify([]);
    }
    // set initialized to true for render logic
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!channelName) return;
    const client = new tmi.Client({
      channels: [channelName],
    });
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
    client.on("disconnected", (reason: any) => {
      // TODO
      // reset leaderboard?
    });

    // todo if the chat successfully reconnects clear the leaderboard, winner modal, etc
    localStorage.channelName = channelName;
    return () => {
      client.disconnect();
    };
  }, [channelName]);

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

  return (
    <main className="flex flex-col space-y-4 my-[5%] mx-[5%] sm:mx-[20%]">
      {initialized && (
        <div className="flex flex-col items-stretch space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <section className="flex flex-col w-full space-y-4 sm:w-2/3">
            {/* secret configuration */}
            <section className="h-min">
              <Card title="Setup">
                <SetupForm
                  initialChannelName={channelName}
                  onSaveChannelName={setChannelName}
                  onSaveSecretWord={setSecretWord}
                />
              </Card>
            </section>
            {/* chat */}
            <section className="h-full">
              <Card title="Chat">
                {messageHistory.length > 1 ? (
                  <>
                    {messageHistory.map(({ name, color, message }, i) => (
                      <div key={i}>
                        <UserMessage
                          name={name}
                          color={color}
                          message={message}
                        />
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {channelName ? (
                      <ChatPlaceholder />
                    ) : (
                      <p className="text-sm font-medium animate-pulse">
                        Enter a channel name to begin!
                      </p>
                    )}
                  </>
                )}
              </Card>
            </section>
          </section>
          {/* leaderboard */}
          <section className="sm:w-1/3 min-h-72">
            <Card title="Leaderboard">
              <Leaderboard winners={JSON.parse(localStorage.winners || "[]")} />
            </Card>
          </section>
        </div>
      )}
      <>
        {/* winner */}
        {Object.keys(winner).length > 0 && (
          <section className="w-full whitespace-pre-wrap">
            <Card title="Winner">
              <h2
                className="mb-3 text-2xl font-semibold"
                style={{ color: `${winner.color}` }}
              >
                {winner.name}
              </h2>
              <Button
                ariaLabel="Reset winner"
                onClick={() => setWinner({} as Winner)}
              >{`Reset winner`}</Button>
            </Card>
          </section>
        )}
      </>
    </main>
  );
}
