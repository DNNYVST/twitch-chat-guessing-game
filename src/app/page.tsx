"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import Link from "next/link";
import SetupForm from "./components/setup-form";
import Leaderboard, { Winner } from "./components/leaderboard";
import { Message } from "./components/user-message";
import Chat from "./components/chat";
import WinnerModal from "./components/winner-modal";

export default function Page() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [streamerMode, setStreamerMode] = useState<boolean>(false);
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
    <main className="my-[2%] mx-[5%] sm:mx-[20%]">
      <Link
        href="/stream-view"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-end mb-[1%] text-[#efeff1] text-sm font-medium underline underline-offset-4 decoration-[#9147ff] decoration-2"
      >
        Stream View (new tab)
      </Link>
      {initialized && (
        <div className="flex flex-col items-stretch space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <section className="flex flex-col w-full space-y-4 sm:w-2/3">
            {/* setup */}
            <section className="h-min">
              <SetupForm
                initialChannelName={channelName}
                onSaveChannelName={setChannelName}
                onSaveSecretWord={setSecretWord}
              />
            </section>
            {/* chat */}
            <section className="h-full">
              <Chat messages={messageHistory} channelName={channelName} />
            </section>
          </section>
          {/* leaderboard */}
          <section
            className={`sm:w-1/3 min-h-72 ${
              streamerMode &&
              "outline outline-[#00b8b8] outline-offset-4 rounded-md"
            }`}
          >
            <Leaderboard winners={JSON.parse(localStorage.winners || "[]")} />
            {streamerMode && (
              <div className="h-min">
                <Chat messages={messageHistory} channelName={channelName} />
              </div>
            )}
          </section>
        </div>
      )}
      {/* winner modal */}
      {Object.keys(winner).length > 0 && (
        <WinnerModal
          winner={winner}
          onClickReplay={() => setWinner({} as Winner)}
        />
      )}
    </main>
  );
}
