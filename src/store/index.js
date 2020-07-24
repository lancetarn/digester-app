import Vue from 'vue';
import Vuex from 'vuex';

// import { Dir } from 'tauri/api/fs';  // eslint-disable-line
import { Dir, createDir, writeFile } from 'tauri/api/fs'; // eslint-disable-line

Vue.use(Vuex);

async function saveStore(store) {
  await createDir('lentil', { dir: Dir.Data, recursive: true });
  const f = { path: 'lentil/feed_data.json', contents: JSON.stringify(store) };
  console.log(`Writing ${f.path}`);
  await writeFile(f, { dir: Dir.Data });
  console.log('Wrote it');
  return true;
}

export default new Vuex.Store({
  state: {
    feeds: [],
  },
  mutations: {
    addFeed({ feeds }, newFeed) {
      feeds.push(newFeed);
    },
  },
  actions: {
    async addFeed({ state, commit }, { newFeed }) {
      commit('addFeed', newFeed);
      saveStore(state);
    },
  },
  modules: {
  },
});
