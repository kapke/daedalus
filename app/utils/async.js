export const tryAsync = <T>(cb: () => T): Promise<T> => Promise.resolve().then(cb);
