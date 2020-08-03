import md5 from 'blueimp-md5';
// import moment from 'moment';
import http from 'tauri/api/http';

const ItemStatus = {
  new: 1,
  dismissed: 2,
};

function makeFeed(name, address) {
  return {
    name,
    address,
    id: md5(address),
    lastChecked: null,
  };
}

function feedItemFromNode(xmlNode) {
  const item = {
    title: xmlNode.getElementsByTagName('title')[0].textContent,
    description: xmlNode.getElementsByTagName('description')[0].textContent,
    content: xmlNode.getElementsByTagName('content')[0]?.textContent,
    pubDate: xmlNode.getElementsByTagName('pubDate')[0].textContent,
    link: xmlNode.getElementsByTagName('link')[0].nodeValue,
    dismissed: false,
    status: ItemStatus.new,
  };
  item.id = md5(`${item.title}|${item.description}|${item.pubDate}`);
  return item;
}

async function fetchItems(feed) {
  console.log('Fetching...');
  const res = await http.get(feed.address, { responseType: http.ResponseType.Text });
  const parser = new DOMParser();
  const xml = parser.parseFromString(res, 'application/xml');
  const items = xml.getElementsByTagName('item');
  return [...items]
    .map(feedItemFromNode)
    .map((f) => ({ feedId: feed.id, feedName: feed.name, ...f }));
}

export default {
  ItemStatus,
  fetchItems,
  makeFeed,
};
