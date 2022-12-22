export const fetcher = (url: string, reqInit?: RequestInit) =>
    fetch(url, reqInit).then(res => res.json());

export const toStringify = (...args: any) => {
    return JSON.stringify(args);
}
