import React from 'react';

import Wrapper from '@components/common/ui/wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';

import { sortingOptions } from '@constants/sorting-options';

interface Props {
  sortingOption: string;
  setSortingOption: React.Dispatch<React.SetStateAction<string>>;
}

const GoodsSorter = ({ sortingOption, setSortingOption }: Props) => {
  return (
    <Wrapper className="my-4">
      <Select value={sortingOption} defaultValue={sortingOption} onValueChange={setSortingOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortingOptions.map(({ value, title }) => (
            <SelectItem key={value} value={value}>
              {title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Wrapper>
  );
};

export default React.memo(GoodsSorter);
