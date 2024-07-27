"use client";

import { useState, useEffect, MouseEventHandler } from "react";
import Card from "./core/styled/card";
import TextInput from "./core/styled/text-input";
import Button from "./core/styled/button";
import Locked from "./icons/locked";
import Unlocked from "./icons/unlocked";

const EditOrSaveButton = ({
  editOrSaveCondition,
  onClickEditButton,
  onClickSaveButton,
  saveButtonDisabled,
}: {
  editOrSaveCondition: boolean;
  onClickEditButton: MouseEventHandler<HTMLButtonElement>;
  onClickSaveButton: MouseEventHandler<HTMLButtonElement>;
  saveButtonDisabled: boolean;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <>
      {editOrSaveCondition ? (
        <Button
          aria-label="Edit secret word"
          onClick={onClickEditButton}
          variant="secondary"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex">
            {hover ? <Unlocked /> : <Locked />}
            <span className="ml-1">Edit</span>
          </div>
        </Button>
      ) : (
        <Button
          aria-label="Save secret word"
          onClick={onClickSaveButton}
          disabled={saveButtonDisabled}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex">
            {hover ? <Locked /> : <Unlocked />}
            <span className="ml-1">Save</span>
          </div>
        </Button>
      )}
    </>
  );
};

const SetupForm = ({
  initialChannelName = "",
  onSaveChannelName,
  onSaveSecretWord,
}: {
  initialChannelName?: string;
  onSaveChannelName: Function;
  onSaveSecretWord: Function;
}) => {
  const [channelName, setChannelName] = useState<string>(initialChannelName);
  const [channelNameLock, setChannelNameLock] = useState<boolean>(false);
  const [secretWord, setSecretWord] = useState<string>("");
  const [secretWordLock, setSecretWordLock] = useState<boolean>(false);

  useEffect(() => {
    if (!initialChannelName) return;
    setChannelName(initialChannelName);
    setChannelNameLock(true);
  }, [initialChannelName]);

  const onClickSaveChannelName = () => {
    setChannelNameLock(true);
    onSaveChannelName(channelName);
  };

  const onClickSaveSecretWord = () => {
    setSecretWordLock(true);
    onSaveSecretWord(secretWord);
  };

  return (
    <Card title="Setup">
      {/* Channel name */}
      <TextInput
        aria-label="Enter channel name"
        id="channelname"
        title="Enter channel name"
        placeholder="Enter channel name"
        value={channelName}
        onChange={({ target: { value } }) => setChannelName(value.trim())}
        disabled={channelNameLock}
      />
      <p
        className={`my-2 text-xs italic text-[#FF8280] ${
          channelNameLock && "opacity-40"
        }`}
      >
        Changing channel name will reload chat and clear the leaderboard
      </p>
      <EditOrSaveButton
        editOrSaveCondition={channelNameLock}
        onClickEditButton={() => setChannelNameLock(false)}
        onClickSaveButton={onClickSaveChannelName}
        saveButtonDisabled={!channelName}
      />
      {/* Secret word */}
      <div className="mt-8 mb-2">
        <TextInput
          aria-label="Enter secret word"
          id="secretword"
          title="Enter secret word"
          placeholder="Enter secret word"
          value={secretWord}
          onChange={({ target: { value } }) => setSecretWord(value.trim())}
          disabled={secretWordLock}
        />
      </div>
      <EditOrSaveButton
        editOrSaveCondition={secretWordLock}
        onClickEditButton={() => setSecretWordLock(false)}
        onClickSaveButton={onClickSaveSecretWord}
        saveButtonDisabled={!secretWord}
      />
    </Card>
  );
};

export default SetupForm;
