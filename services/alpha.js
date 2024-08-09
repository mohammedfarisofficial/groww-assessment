import axios from 'axios';

var url =
  'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

const AlphaClient = axios.create({
  baseURL: process.env.ALPHA_CLIENT_URL,
});

export {AlphaClient};
