<template lang="pug">
  .FeedList
    p Feeds
    .card(v-for="f in activeFeeds" :key="f.id")
      .card-content
        a.has-text-info(@click="refresh(f)")
          span.icon
            i.fas.fa-sync-alt(:class="isLoading(f.id)")
        a.delete.is-pulled-right(@click="deactivateFeed(f)")
        a(:href="f.address").is-size-6 {{ f.name }}
    hr
    p Deleted
    a(v-for="f in deletedFeeds" :key="f.id")
      div.card
        .card-content
          a.delete.is-pulled-right(@click="deleteFeed(f)")
          a(:href="f.address").is-size-5 {{ f.name }}
          span.is-size-6 Added {{ f.createdAt }}
          a.has-text-info(@click="reactivateFeed(f)")
            span.icon
              i.fas.fa-recycle
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import feeds from '@/services/feeds';

function isLoading(id) {
  if (this.loadingFeeds[id]) {
    return 'fa-spin';
  }
  return '';
}

function activeFeeds() {
  return this.feeds.filter((f) => f.status === 'active');
}

function deletedFeeds() {
  return this.feeds.filter((f) => f.status === 'deleted');
}

async function refresh(feed) {
  Vue.set(this.loadingFeeds, feed.id, true);
  await this.fetchItems(feed);
  setTimeout(() => Vue.set(this.loadingFeeds, feed.id, false), 1000);
}

export default {
  name: 'FeedList',
  computed: {
    activeFeeds,
    deletedFeeds,
    ...mapState(['feeds']),
  },
  data() {
    return {
      loadingFeeds: {},
    };
  },
  mounted() {
    console.log('Got feeds: ', this.feeds);
    this.feeds.forEach(async (f) => {
      console.log('Loading: ', f.name);
      this.loadingFeeds[f.id] = true;
      await this.fetchItems(f);
      this.loadingFeeds[f.id] = false;
    });
  },
  methods: {
    async fetchItems(f) {
      const items = await feeds.fetchItems(f);
      this.addItems(items);
    },
    isLoading,
    refresh,
    ...mapActions(['deactivateFeed', 'deleteFeed', 'addItems', 'reactivateFeed']),
  },
};
</script>
