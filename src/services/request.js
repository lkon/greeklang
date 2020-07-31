const request = (word) => {
  return fetch(
    `http://greeklang.ru/srchajax/?lookword=${encodeURI(word)}&action=lookword`,
    // `https://conjugation.website/search/gr/${encodeURI(word)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
        'access-control-allow-origin': 'https://cooljugator.com',
      },
      mode: 'no-cors',
    },
  ).then(async (res: Response) => {
    const json = await res.json();
    return json;
  });
};

export default request;
