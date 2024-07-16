import { useState, MouseEvent, ChangeEvent } from "react";
import TextInput from "./core/text-input";
import Button from "./core/button";
import Locked from "./icons/locked";
import Unlocked from "./icons/unlocked";

const SetupForm = ({
  onSaveChannelName,
  onSaveSecretWord,
}: {
  onSaveChannelName: Function;
  onSaveSecretWord: Function;
}) => {
  const [channelName, setChannelName] = useState<string>("");
  const [channelNameLock, setChannelNameLock] = useState<boolean>(false);
  const [secretWord, setSecretWord] = useState<string>("");

  const onClickSaveChannelName = () => {
    setChannelNameLock(true);
    onSaveChannelName(channelName);
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
      {/* Edit or Save button*/}
      {channelNameLock ? (
        <Button
          aria-label="Edit channel name"
          onClick={() => setChannelNameLock(false)}
          variant="secondary"
        >
          <div className="flex">
            <Locked />
            <span className="ml-1">Edit</span>
          </div>
        </Button>
      ) : (
        <Button aria-label="Save channel name" onClick={onClickSaveChannelName}>
          <div className="flex">
            <Unlocked />
            <span className="ml-1">Save</span>
          </div>
        </Button>
      )}
      {/* Secret word */}
      <div className="mt-8 mb-2">
        <TextInput
          title="Enter secret word"
          placeholder="Enter secret word"
          id="secretword"
          value={secretWord}
          onChange={({ target: { value } }) => setSecretWord(value.trim())}
        />
      </div>
      <Button
        aria-label="Save secret word"
        onClick={() => onSaveSecretWord(secretWord)}
        disabled={!secretWord}
      >
        Save
      </Button>
    </>
  );
};

export default SetupForm;
