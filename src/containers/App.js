// @flow

import _ from 'lodash';
import React, { Component } from 'react';

import PhoneSearch from '../components/PhoneSearch';
import PhoneList from '../components/PhoneList';

type Props = {};
type State = {
  searchValue: string,
  orderBy: string,
  phoneList: Array<{
    id: string,
    imageUrl: string,
    name: string,
    snippet: string,
    hide: boolean,
    keyId: string,
  }>,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
      orderBy: 'age',
      phoneList: [],
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
    this.handlePhoneClick = this.handlePhoneClick.bind(this);
    this.fetchPhoneData = this.fetchPhoneData.bind(this);
  }

  handleSearchValueChange: Function;
  handleSearchValueChange(e: SyntheticInputEvent<HTMLInputElement>) {
    console.log(e.target.value);
    // save oriiginal phonelist
    const newSearch = e.target.value;
    if (newSearch === this.state.searchValue) {
      return;
    }
    const newFilteredPhoneList = _.map(this.state.phoneList, function(phone) {
      if (
        phone.name.toLowerCase().indexOf(newSearch.trim()) > -1 ||
        phone.snippet.toLowerCase().indexOf(newSearch.trim()) > -1
      ) {
        phone.hide = false;
      } else {
        phone.hide = true;
      }
      return phone;
    });
    this.setState({
      searchValue: newSearch,
      phoneList: newFilteredPhoneList,
    });
  }

  handleOrderByChange: Function;
  handleOrderByChange(e: SyntheticInputEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const newOrderBy = e.target.value;
    if (newOrderBy === this.state.orderBy) {
      return;
    }
    const newSortedPhoneList = _(this.state.phoneList)
      .sortBy(phone => {
        const orderBy = phone[newOrderBy];
        if (_.isString(orderBy)) {
          return orderBy.toLowerCase();
        }
        return orderBy;
      })
      .map(phone => {
        phone.keyId = phone.id + '_sortBy-' + newOrderBy;
        return phone;
      })
      .value();

    this.setState({
      orderBy: e.target.value,
      phoneList: newSortedPhoneList,
    });
  }

  handlePhoneClick: Function;
  handlePhoneClick(phoneId: string) {
    console.log('phoneId is', phoneId);
  }

  fetchPhoneData: Function;
  fetchPhoneData() {
    fetch('/assets/json/phones.json')
      .then(res => res.json())
      // .then(res => {
      //   throw Error('error');
      // })
      .then(
        result => {
          console.log(result);
          const phoneList = result.map(phone => {
            phone.imageUrl = 'assets/' + phone.imageUrl;
            phone.keyId = phone.id;
            return phone;
          });
          this.setState({
            phoneList: phoneList,
          });
        },
        error => {
          console.log(error);
        },
      );
  }

  componentDidMount() {
    this.fetchPhoneData();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <PhoneSearch
              searchValue={this.state.searchValue}
              onSearchValueChange={this.handleSearchValueChange}
              orderBy={this.state.orderBy}
              onOrderByChange={this.handleOrderByChange}
            />
          </div>
          <div className="col-md-10">
            <PhoneList
              phoneList={this.state.phoneList}
              onPhoneClick={this.handlePhoneClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
