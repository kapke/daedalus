// @flow

type Options = {
  rejectTimeoutTime?: number,
  checkIntervalTime?: number,
  contentDocument?: HTMLElement,
};

export default (selector: string, options?: Options = {}): Promise<HTMLElement> => {
  const REJECT_TIMEOUT = 5000;
  const CHECK_INTERVAL = 500;
  const {
    rejectTimeoutTime = REJECT_TIMEOUT,
    checkIntervalTime = CHECK_INTERVAL,
    contentDocument = document,
  } = options;
  return new Promise((resolve, reject) => {
    const rejectTimeout = setTimeout(() => {
      clearInterval(checkInterval);
      return reject('Element not found');
    }, rejectTimeoutTime);
    const check = () => {
      const element = contentDocument.querySelector(selector);
      if (element) {
        resolve(element);
        clearInterval(checkInterval);
        clearTimeout(rejectTimeout);
      }
    };
    const checkInterval = setInterval(check, checkIntervalTime);
    check();
  });
};
