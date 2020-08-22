<template lang="pug">
  .FeedList
    p Feeds
    .card(v-for="f in activeFeeds" :key="f.id")
      .card-content
        a.has-text-info(@click="fetchItems(f)")
          span.icon
            i.fas.fa-sync-alt
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
import { mapActions, mapState } from 'vuex';
import feeds from '@/services/feeds';

function activeFeeds() {
  return this.feeds.filter((f) => f.status === 'active');
}

function deletedFeeds() {
  return this.feeds.filter((f) => f.status === 'deleted');
}

export default {
  name: 'FeedList',
  computed: {
    activeFeeds,
    deletedFeeds,
    ...mapState(['feeds']),
  },
  methods: {
    async fetchItems(f) {
      const items = await feeds.fetchItems(f);
      this.addItems(items);
    },
    ...mapActions(['deactivateFeed', 'deleteFeed', 'addItems', 'reactivateFeed']),
  },
};
</script>
