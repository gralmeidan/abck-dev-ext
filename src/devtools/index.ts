chrome.devtools.panels.create(
  'Abck',
  null,
  '../src/devtools/panel/index.html',
  panel => {
    console.log('Panel created', panel);
  }
);
