const { makeEnum } = require('./util');

const ETIME_SEC = makeEnum({
  ONE: 1000,
  QUARTER_TO: 750,
  HALF: 500,
  QUARTER: 250,
  EIGHTH: 125,
});

const DEFAULT_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:83.0) Gecko/20100101 Firefox/83.0',
  Connection: 'keep-alive',
};

const DEFAULT_FETCH_OPTIONS = {
  method: 'GET',
  redirect: 'manual',
};

module.exports = {
  ETIME_SEC,
  DEFAULT_FETCH_OPTIONS,
  DEFAULT_FETCH_HEADERS,
};
