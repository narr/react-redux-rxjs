const materialIcons = {
  // Support for Firefox.
  '-moz-osx-font-smoothing': 'grayscale',
  // Support for all WebKit browsers.
  '-webkit-font-smoothing': 'antialiased',
  direction: 'ltr',
  display: 'inline-block',
  'font-family': 'Material Icons',
  // Support for IE.
  'font-feature-settings': "'liga' 1",
  'font-size': '24px',
  'font-style': 'normal',
  'font-weight': 'normal',
  'letter-spacing': 'normal',
  'line-height': 1,
  // Support for Safari and Chrome
  'text-rendering': 'optimizeLegibility',
  'text-transform': 'none',
  'white-space': 'nowrap',
  'word-wrap': 'normal',
};

function getStyleAsString(styleObj: object) {
  const styleString = JSON.stringify(styleObj)
    .replace(/,/g, ';')
    .replace(/"/g, '');
  return styleString;
}

export default { getStyleAsString, materialIcons };
