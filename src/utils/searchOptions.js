export const webOptions = (keyword, offset) => {
  return {
    method: 'GET',
    url: 'https://bing-web-search1.p.rapidapi.com/search',
    params: {
      q: keyword,
      mkt: 'en-us',
      count: '20',
      offset: offset,
      safeSearch: 'Off',
      textFormat: 'Raw',
    },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    },
  };
};

export const imageOptions = (keyword, offset) => {
  return {
    method: 'GET',
    url: 'https://bing-image-search1.p.rapidapi.com/images/search',
    params: { q: keyword, count: '20', offset: offset },
    headers: {
      'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    },
  };
};

export const TranslateOptions = (query, target, source) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append('q', query);
  encodedParams.append('target', target);
  encodedParams.append('source', source);

  return {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    data: encodedParams,
  };
};
