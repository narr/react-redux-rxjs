import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loadInitData } from '../shared';

interface RootProps {
  appLoaded: boolean;
  onInit: () => void;
  initSpinnerSelector: string;
}

class RootContainer extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.onInit();
  }

  public componentDidUpdate(prevProps: RootProps) {
    if (this.isAppLoaded(prevProps)) {
      const initSpinnerEl: HTMLElement | null = document.querySelector(
        this.props.initSpinnerSelector
      );
      if (initSpinnerEl) {
        initSpinnerEl.style.display = 'none';
      }
    }
  }

  public render() {
    /* istanbul ignore next: ignore for coverage */
    if (process.env.NODE_ENV === 'development') {
      // this is to check if render is called unnecessarily
      // check Redux Devtool's Persist button for unsure render call
      // tslint:disable-next-line no-console
      console.log(this.props);
    }
    return (
      <React.Fragment>
        {this.props.appLoaded && (
          <span onClick={this.onClickReadyText}>This app is ready</span>
        )}
      </React.Fragment>
    );
  }

  private isAppLoaded = (prevProps: RootProps) => {
    return !prevProps.appLoaded && this.props.appLoaded;
  };

  private onClickReadyText = (e: React.MouseEvent) => {
    // tslint:disable-next-line no-console
    console.log(e.target);
  };
}

const mapStateToProps = (state: RootProps, props: any) => {
  return {
    appLoaded: state.appLoaded,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onInit: () => {
    dispatch(loadInitData());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
