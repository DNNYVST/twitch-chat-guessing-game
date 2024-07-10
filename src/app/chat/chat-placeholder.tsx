const chatRowWidths = [75, 80, 50, 65, 80];

const ChatPlaceholder = () => (
  <div role="status" className="animate-pulse">
    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
