import LoadingSpinner from "./icons/loading-spinner";

const chatRowWidths = [75, 80, 50, 65, 80];

const ChatPlaceholder = () => (
  <div role="status" className="animate-pulse">
    <p className="flex mb-2 text-sm font-medium text-[#efeff1]">
      <span className="mr-2">
        <LoadingSpinner />
      </span>
      Loading chat...
    </p>
    {chatRowWidths.map((width, index) => (
      <div
        key={index}
        className={`h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 max-w-[${width}%]`}
      />
    ))}
  </div>
);

export default ChatPlaceholder;
