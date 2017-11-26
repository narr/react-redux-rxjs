// @flow

import './PhoneList.scss';

import React, { PureComponent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PhoneListItem from './PhoneListItem';

type Props = {
  phoneList: Array<{
    id: string,
    imageUrl: string,
    name: string,
    snippet: string,
    hide: boolean,
    keyId: string,
  }>,
  onPhoneClick: (phoneId: string) => void,
};

class PhoneList extends PureComponent<Props> {
  render() {
    console.log('PhoneList render..!!');
    return (
      <ul className="phone-list" styleName="phones">
        <TransitionGroup>
          {this.props.phoneList.filter(phone => !phone.hide).map(phone => (
            <CSSTransition
              key={phone.keyId}
              timeout={500}
              classNames={{
                appear: 'phone-list-item--appear',
                appearActive: 'phone-list-item--active-appear',
                enter: 'phone-list-item--enter',
                enterActive: 'phone-list-item--active-enter',
                exit: 'phone-list-item--exit',
                exitActive: 'phone-list-item--active-exit',
              }}
            >
              <PhoneListItem
                id={phone.id}
                imageUrl={phone.imageUrl}
                name={phone.name}
                snippet={phone.snippet}
                onPhoneClick={this.props.onPhoneClick}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    );
  }
}

export default PhoneList;
