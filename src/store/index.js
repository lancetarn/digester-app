import Vue from 'vue';
import Vuex from 'vuex';

import {
  Dir, createDir, readTextFile, writeFile,
} from 'tauri/api/fs';

Vue.use(Vuex);

const dataDir = 'lentil';
const storeFile = 'feed_data.json';

/**
 *
 * @param {Array} parts - Path parts
 * @return {String} Aggregated path
 */
function dataPath(...parts) {
  parts.unshift(dataDir);
  return parts.join('/');
}

/**
 * JSONify the store and save it. Just like that.
 * Creates the dataDir and storeFile if they don't exist.
 *
 * @async
 * @param {Object} store - The store
 * @return Promise<Void>
 */
async function saveStore(store) {
  await createDir(dataDir, { dir: Dir.Data, recursive: true });
  const contents = JSON.stringify(store);
  const f = { path: dataPath(storeFile), contents };
  console.log(`Writing ${f.path}`);
  await writeFile(f, { dir: Dir.Data });
}

function mapIds(records) {
  const ids = {};
  records.forEach((e) => { ids[e.id] = true; });
  return ids;
}

export default new Vuex.Store({
  state: {
    feeds: [],
    items: [],
    dismissed: [],
  },
  getters: {
    existingItemIds({ items }) {
      return mapIds(items);
    },
    alreadyDismissed({ dismissed }) {
      return mapIds(dismissed);
    },
  },
  mutations: {
    setFeeds(state, { feeds }) {
      state.feeds = feeds;
    },
    setItems(state, { items }) {
      console.log('setting items', items);
      state.items = items;
    },
    setDismissed(state, { dismissed }) {
      state.dismissed = dismissed;
    },
  },
  actions: {
    addFeed({ state, commit }, { newFeed }) {
      const feeds = [newFeed, ...state.feeds];
      commit('setFeeds', feeds);
      saveStore(state);
    },
    deleteFeed({ state, commit }, feed) {
      const feeds = state.feeds.filter((f) => f.id !== feed.id);
      commit('setFeeds', { feeds });
      saveStore(state);
    },
    addItems({ state, commit, getters }, newItems) {
      const items = [
        ...state.items,
        ...newItems
          .filter((i) => !getters.existingItemIds[i.id])
          .filter((i) => !getters.alreadyDismissedIds[i.id]),
      ];
      commit('setItems', { items });
      saveStore(state);
    },
    dismissItem({ state, commit, getters }, item) {
      const items = state.items.filter((i) => (i.id !== item.id));
      commit('setItems', { items });
      console.log('Is dismissed?', getters.alreadyDismissed[item.id]);
      const dismissed = [
        ...state.dismissed,
        ...[item].filter((i) => !getters.alreadyDismissed[i.id]),
      ];
      commit('setDismissed', { dismissed });
      saveStore(state);
    },
    async loadData({ commit }) {
      let raw = {};
      try {
        raw = await readTextFile(dataPath(storeFile), { dir: Dir.Data });
      } catch {
        // Use default state if no file found.
        console.log('Data file not loaded.');
        return;
      }

      const data = JSON.parse(raw);
      const feeds = data.feeds || [];
      commit('setFeeds', { feeds });
      const items = data.items || [];
      commit('setItems', { items });
      const dismissed = data.dismissed || [];
      commit('setDismissed', { dismissed });
    },
  },
  modules: {
  },
});
