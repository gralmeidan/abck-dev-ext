chrome.devtools.panels.create(
  'My Panel',
  null,
  '../src/devtools/panel/index.html',
  panel => {
    console.log('Panel created', panel);
  }
);
