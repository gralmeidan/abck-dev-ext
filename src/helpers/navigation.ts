import * as tldts from 'tldts';

export async function getInspectedDomain(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(
      'window.location.href',
      (result, isException) => {
        if (isException) {
          reject(isException);
        } else {
          try {
            resolve(tldts.getDomain(result as string));
          } catch (error) {
            console.error('Error getting inspected domain', error);
            resolve('');
          }
        }
      }
    );
  });
}
