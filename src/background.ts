import { Action, onMessage, sendMessage } from './helpers/messaging';

chrome.webRequest.onBeforeRequest.addListener(
  details => {
    if (details.requestBody?.error || !details.requestBody) {
      return;
    }

    const bytes = details.requestBody?.raw?.[0]?.bytes;

    if (!bytes) {
      return;
    }

    const decoder = new TextDecoder('utf-8');
    const body = decoder.decode(bytes);

    if (!body || !body.includes('sensor_data')) {
      return;
    }

    let data: any;

    try {
      data = JSON.parse(body);
    } catch (error) {
      return;
    }

    sendMessage(Action.SENSOR, data.sensor_data);
  },
  { urls: ['<all_urls>'] },
  ['requestBody']
);

chrome.webRequest.onCompleted.addListener(
  details => {
    console.log('Completed', details.url);
    chrome.cookies.getAll({ url: details.url }, cookies => {
      console.log('Cookies', cookies);
    });
  },
  { urls: ['<all_urls>'] },
  ['responseHeaders']
);

onMessage(Action.SENSOR, data => {
  console.log('Sensor data received', data);
});
