"use client";

import {useEffect, useState} from 'react';
import tmi from "tmi.js";
import UserMessage from './user-message';
import WinnerHistory from './winner-history';

const client = new tmi.Client({
    channels: [ 'doublelift' ]
});

const secretWord = 'a';

export default function Chat() {
    const [lastMessage, setLastMessage] = useState({});
    const [messageHistory, setMessageHistory] = useState([]);
    const [winner, setWinner] = useState({});

    useEffect(() => {
        client.connect();
        client.on('message', (channel: string, tags: object, message: string, self: boolean) => {
            // "Alca: Hello, World!"
            // setLastMessage(`${tags['display-name']}: ${message}`);
            setLastMessage({
                userName: tags['display-name'],
                userColor: tags.color,
                message: message
            });
        });
        // add winners to localStorage
        if(!localStorage.winners) {
            localStorage.winners = JSON.stringify([]);
        }
    }, []);

    useEffect(() => {
        // set message history
        let history = [...messageHistory, lastMessage];
        if (history.length > 5) {
            history.shift();
        }
        setMessageHistory(history);

        // set winner
        if (Object.keys(winner).length === 0 && lastMessage?.message?.toLowerCase().includes(secretWord)) {
            const winner = {...lastMessage};
            setWinner(winner);

            const winners = JSON.parse(localStorage.winners);
            localStorage.winners = JSON.stringify([...winners, winner]);
        }
    }, [lastMessage])

    return (
        <main className="flex min-h-screen flex-col justify-between p-24">
            <section className="flex flex-col">
                {messageHistory.map((message, i) => <div key={i}><UserMessage name={message.userName} color={message.userColor} message={message.message} /></div>)}
            </section>
            <section className="flex whitespace-pre-wrap">
                <h2 className="mb-3 text-2xl font-semibold">winner: </h2><h2 className="mb-3 text-2xl font-semibold" style={{color: `${winner.userColor}`}}>{winner.userName}</h2>
            </section>
            <section>
                <button onClick={() => setWinner({})}>{`>reset winner<`}</button>
                {localStorage.winners && <WinnerHistory winners={JSON.parse(localStorage.winners)} />
            }
            </section>
        </main>
    );
}
