import { useState } from 'react';

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`flex ${isActive ? 'w-80 outline-none ring-2 ring-ring' : 'w-[30px]'} h-10 px-1 relative rounded-full transition-all duration-500 overflow-hidden`}
    >
      <div
        onClick={() => setIsActive(true)}
        className="flex justify-center items-center w-10 h-full bg-inherit rounded-full z-[1] cursor-pointer"
      >
        <img src="/search.svg" alt="검색" draggable={false} />
      </div>
      <div className={`${isActive ? 'inline-block' : 'hidden'} flex justify-center w-full h-full items-center`}>
        <input type="text" className={`w-full h-full border-none outline-none`} />
      </div>
      <div
        onClick={() => setIsActive(false)}
        className={`${isActive ? 'inline' : 'hidden'} px-2 flex justify-center items-center cursor-pointer`}
      >
        <img src="/close_MD.svg" alt="검색 취소" />
      </div>
    </div>
  );
}
