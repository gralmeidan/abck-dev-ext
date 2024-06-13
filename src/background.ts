import { COOKIE_NAMES, CookieName } from './constants/cookie.constants';
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
    chrome.cookies.getAll({ url: details.url }, cookies => {
      const data = cookies?.filter(cookie =>
        COOKIE_NAMES.includes(cookie.name as CookieName)
      );

      if (data?.length) {
        sendMessage(Action.COOKIES, data);
      }
    });
  },
  { urls: ['<all_urls>'] },
  ['responseHeaders']
);

onMessage(Action.SENSOR, data => {
  console.log('Sensor data received', data);
});
