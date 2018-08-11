import * as React from 'react';
import { connect } from 'react-redux';

import { appLoaded, IappState, TypeAppLoaded } from '../shared';

interface RootProps {
  appLoaded: TypeAppLoaded;
  appState: IappState;
  initSpinnerSelector: string;
}

class RootContainer extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  public componentDidMount() {
    setTimeout(() => {
      this.props.appLoaded();
    }, 2000);
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
        {this.props.appState.loaded && <span>This app is ready</span>}
      </React.Fragment>
    );
  }

  private isAppLoaded = (prevProps: RootProps) => {
    return !prevProps.appState.loaded && this.props.appState.loaded;
  };
}

const mapStateToProps = (state: RootProps) => ({
  appState: state.appState,
});

const mapDispatchToProps = {
  appLoaded,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);
