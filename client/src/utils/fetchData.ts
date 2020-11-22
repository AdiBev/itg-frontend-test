///Util func to fetch data
///Req type **GET** only
export const fetchData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
