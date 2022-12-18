export const fetcher = (url: string, reqInit?: RequestInit) =>
    fetch(url, reqInit).then(res => res.json());
