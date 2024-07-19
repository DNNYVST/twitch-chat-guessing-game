export default function Page() {
  return (
    <div className="flex flex-row items-stretch space-x-4 border-2 border-red-600 my-[5%] mx-[5%] sm:mx-[20%]">
      <div className="flex flex-col w-1/2 space-y-4">
        <div className="p-4 border-2 border-purple-500 h-3/6">Projects</div>
        <div className="p-4 border-2 border-purple-500 h-3/6">Empty </div>
      </div>
      <div className="w-1/2 p-6 border-2 border-purple-500 ">Study/Work</div>
    </div>
  );
}
