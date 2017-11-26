// @flow

import './PhoneList.scss';

import React, { PureComponent } from 'react';

import PhoneListItem from './PhoneListItem';

type Props = {
  phoneList: Array<{
    id: string,
    imageUrl: string,
    name: string,
    snippet: string,
    hide: boolean,
  }>,
  onPhoneClick: (phoneId: string) => void,
};

class PhoneList extends PureComponent<Props> {
  render() {
    console.log('PhoneList render..!!');
    return (
      <ul className="phone-list" styleName="phones">
        {this.props.phoneList
          .filter(phone => !phone.hide)
          .map(phone => (
            <PhoneListItem
              key={phone.id}
              id={phone.id}
              imageUrl={phone.imageUrl}
              name={phone.name}
              snippet={phone.snippet}
              onPhoneClick={this.props.onPhoneClick}
            />
          ))}
      </ul>
    );
  }
}

export default PhoneList;
