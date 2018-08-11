declare module 'proj-root/assets/*';

declare module 'extra-types' {
  global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
      Promise: Promise<any>;
    }
  }
}
