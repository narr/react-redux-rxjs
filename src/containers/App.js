// @flow

import React, { Component } from 'react';

import PhoneSearch from '../components/PhoneSearch';
import AppIntro from '../components/AppIntro';

type Props = {};
type State = {
  searchValue: string,
  orderBy: string,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
      orderBy: '',
    };

    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleOrderByChange = this.handleOrderByChange.bind(this);
  }

  handleSearchValueChange: Function;
  handleSearchValueChange(e: SyntheticInputEvent<HTMLInputElement>) {
    console.log(e.target.value);
    this.setState({ searchValue: e.target.value });
  }

  handleOrderByChange: Function;
  handleOrderByChange(e: SyntheticInputEvent<HTMLInputElement>) {
    console.log(e.target.value);
    this.setState({ orderBy: e.target.value });
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
            <AppIntro />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
