import md5 from 'blueimp-md5';

function makeFeed(name, address) {
  return { name, address, id: md5(address) };
}

export default {
  makeFeed,
};
