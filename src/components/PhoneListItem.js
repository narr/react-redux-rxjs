// @flow

import './PhoneListItem.scss';

import React from 'react';

type Props = {
  id: string,
  imageUrl: string,
  name: string,
  snippet: string,
  onPhoneClick: (phoneId: string) => void,
};

function PhoneListItem(props: Props) {
  function handlePhoneClick(e: SyntheticInputEvent<HTMLInputElement>) {
    props.onPhoneClick(props.id);
  }

  return (
    <li className="phone-list-item thumbnail" styleName="thumbnail">
      <a href={'#/' + props.id} styleName="thumb" onClick={handlePhoneClick}>
        <img src={props.imageUrl} alt={props.name} />
      </a>
      <a href={'#/' + props.id} onClick={handlePhoneClick}>
        {props.name}
      </a>
      <p>{props.snippet}</p>
    </li>
  );
}

export default PhoneListItem;
