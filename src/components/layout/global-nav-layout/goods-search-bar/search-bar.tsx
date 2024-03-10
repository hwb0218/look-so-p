import { FormEvent, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { useSearchBarContext } from '@providers/search-bar';
import { ROUTE_PATHS } from '@constants/routes';

export default function SearchBar() {
  const navigate = useNavigate();
  const { isOpen, openSearchBar, closeSearchBar, filterSearchGoods } = useSearchBarContext();

  const [query, setQuery] = useState('');

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate({
      pathname: ROUTE_PATHS.SEARCH,
      search: `?${createSearchParams({ query: query.trim() })}`,
    });

    filterSearchGoods(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${isOpen ? 'w-[450px] outline-none ring-2 ring-ring' : 'w-[32px]'} h-10 px-1 relative rounded-full transition-all duration-500 overflow-hidden`}
    >
      <div
        onClick={() => openSearchBar()}
        className="flex justify-center items-center w-10 h-full bg-inherit rounded-full z-[1] cursor-pointer"
      >
        <img src="/search.svg" alt="검색" draggable={false} className="w-6 h-6" />
      </div>
      <div className={`${isOpen ? 'inline-block' : 'hidden'} flex justify-center w-full h-full items-center`}>
        <input
          onChange={handleChangeQuery}
          type="text"
          placeholder="상품을 검색하세요"
          className={`w-full h-full border-none outline-none bg-transparent`}
        />
      </div>
      <div
        onClick={() => closeSearchBar()}
        className={`${isOpen ? 'inline' : 'hidden'} px-2 flex justify-center items-center cursor-pointer`}
      >
        <img src="/close_MD.svg" alt="검색 취소" />
      </div>
    </form>
  );
}
