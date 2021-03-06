import md5 from 'blueimp-md5';
// import moment from 'moment';
import http from 'tauri/api/http';

class FeedItem {
  constructor({
    id,
    title,
    description,
    content,
    pubDate,
    link,
    status,
    feedId,
    feedName,
  }) {
    if (!(title && description && pubDate)) {
      console.error({
        title, description, content, pubDate, link, status,
      });
      throw new Error('Invalid FeedItem');
    }
    this.title = title;
    this.description = description;
    this.content = content;
    this.pubDate = new Date(pubDate);
    this.link = link;
    this.status = status;
    this.id = id || md5(`${title}|${description}|${pubDate}`);
    this.feedId = feedId;
    this.feedName = feedName;
  }
}

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
    createdAt: new Date(),
    status: 'active',
  };
}

function feedItemFromNode(xmlNode) {
  const item = {
    title: xmlNode.getElementsByTagName('title')[0].textContent,
    description: xmlNode.getElementsByTagName('description')[0].textContent,
    content: xmlNode.getElementsByTagName('content')[0]?.textContent,
    pubDate: xmlNode.getElementsByTagName('pubDate')[0].textContent,
    link: xmlNode.getElementsByTagName('link')[0].textContent,
    status: ItemStatus.new,
  };
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
    .map((f) => (new FeedItem({ feedId: feed.id, feedName: feed.name, ...f })));
}

export default {
  FeedItem,
  ItemStatus,
  fetchItems,
  makeFeed,
};
