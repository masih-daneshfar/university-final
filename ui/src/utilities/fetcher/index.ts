const fetcher = async (
  input: RequestInfo | URL,
  init: RequestInit | undefined = {}
) => {
  return fetch(`http://${window.location.hostname}:3001${input}`, {
    mode: "cors",
    credentials: "include",
    headers: { "content-type": "application/json" },
    ...init,
  }).then((res) => {
    //   res.headers.
    return res.json();
  });
};

export default fetcher;
