"use client";

import { useEffect, useState } from "react";
import tmi from "tmi.js";
import {
  Main,
  Container,
  SetupSection,
  ChatSection,
  LeaderboardSection,
  StyledLink,
} from "./page.styled";
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
          color: tags.color,
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
    <Main>
      <StyledLink href="/stream-view" target="_blank" rel="noopener noreferrer">
        Stream View (new tab)
      </StyledLink>
      {initialized && (
        <Container>
          <SetupSection>
            <SetupForm
              initialChannelName={channelName}
              onSaveChannelName={setChannelName}
              onSaveSecretWord={setSecretWord}
            />
          </SetupSection>
          <ChatSection>
            <Chat messages={messageHistory} channelName={channelName} />
          </ChatSection>
          <LeaderboardSection>
            <Leaderboard winners={JSON.parse(localStorage.winners || "[]")} />
            {streamerMode && (
              <Chat messages={messageHistory} channelName={channelName} />
            )}
          </LeaderboardSection>
        </Container>
      )}
      {/* winner modal */}
      {Object.keys(winner).length > 0 && (
        <WinnerModal
          winner={winner}
          onClickReplay={() => setWinner({} as Winner)}
        />
      )}
    </Main>
  );
}
