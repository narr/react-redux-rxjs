// @flow

import React from 'react';

type Props = {
  searchValue: string,
  onSearchValueChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  orderBy: string,
  onOrderByChange: (event: SyntheticInputEvent<HTMLInputElement>) => void,
};

function PhoneSearch(props: Props) {
  return (
    <div className="phone-search">
      <p>
        Search:&nbsp;
        <input value={props.searchValue} onChange={props.onSearchValueChange} />
      </p>
      <p>
        Sort by:&nbsp;
        <select value={props.orderBy} onChange={props.onOrderByChange}>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    </div>
  );
}

export default PhoneSearch;
