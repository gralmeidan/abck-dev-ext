import type { Cookie } from '../types/storage.types';

export enum Action {
  SENSOR = 'sensor_data',
  COOKIES = 'cookies_data',
}

export type MessageData<T extends Action> = {
  [Action.SENSOR]: string;
  [Action.COOKIES]: Cookie[];
}[T];

export function sendMessage<T extends Action>(action: T, data: MessageData<T>) {
  chrome.runtime.sendMessage({ action, data });
}

export function onMessage<T extends Action>(
  action: T,
  callback: (data: MessageData<T>) => void
) {
  chrome.runtime.onMessage.addListener(message => {
    if (message.action === action) {
      callback(message.data);
    }
  });
}
