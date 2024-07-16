import { useState, useEffect, MouseEventHandler } from "react";
import TextInput from "./core/text-input";
import Button from "./core/button";
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
}) => (
  <>
    {editOrSaveCondition ? (
      <Button
        aria-label="Edit secret word"
        onClick={onClickEditButton}
        variant="secondary"
      >
        <div className="flex">
          <Locked />
          <span className="ml-1">Edit</span>
        </div>
      </Button>
    ) : (
      <Button
        aria-label="Save secret word"
        onClick={onClickSaveButton}
        disabled={saveButtonDisabled}
      >
        <div className="flex">
          <Unlocked />
          <span className="ml-1">Save</span>
        </div>
      </Button>
    )}
  </>
);

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
    <>
      {/* Channel name */}
      <TextInput
        title="Enter channel name"
        placeholder="Enter channel name"
        id="channelname"
        value={channelName}
        onChange={({ target: { value } }) => setChannelName(value.trim())}
        disabled={channelNameLock}
      />
      <p
        className={`my-2 text-xs font-bold italic text-[#FF8280] ${
          channelNameLock && "opacity-40"
        }`}
      >
        * Changing channel name will reload chat and clear the leaderboard
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
          title="Enter secret word"
          placeholder="Enter secret word"
          id="secretword"
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
    </>
  );
};

export default SetupForm;
