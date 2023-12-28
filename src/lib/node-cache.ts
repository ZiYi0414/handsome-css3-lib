import NodeCache from 'node-cache';
// const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const getCache = (key: string) => {
  return myCache.get(key);
};

const setCache = (key: string, value: any, time?: number) => {
  return myCache.set(key, value, time ?? 10000);
};

const hasCache = (key: string) => {
  return myCache.has(key);
};

const getKeys = () => {
  return myCache.keys();
};

export { getCache, setCache, hasCache, getKeys };
