const checkResponse = async (res: Response) => {
  if (res.ok) {
    return await res.json();
  } else {
    return Promise.reject(await res.json());
  }
};

export { checkResponse };
