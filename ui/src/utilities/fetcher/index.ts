const fetcher = async (
  input: RequestInfo | URL,
  { ...init }: RequestInit | undefined = {}
) => {
  const response = await fetch(`http://${window.location.hostname}:3001${input}`, {
    mode: "cors",
    credentials: "include",
    headers: { "content-type": "application/json" },
    ...init,
  })
    //   res.headers.
    return response.json();
  
};

export default fetcher;
