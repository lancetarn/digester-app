<template lang="pug">
  .FeedList
    p Feeds
    a(v-for="f in feeds" :key="f.id" @click.prevent="fetchItems(f)")
      div.card
        .card-content
          a.delete.is-pulled-right(@click="deleteFeed(f)")
          p.is-size-5 {{ f.name }}
          p.is-size-6 {{ f.address }}
</template>

<script>
import { mapActions, mapState } from 'vuex';
import feeds from '@/services/feeds';

export default {
  name: 'FeedList',
  computed: {
    ...mapState(['feeds']),
  },
  methods: {
    async fetchItems(f) {
      const items = await feeds.fetchItems(f);
      console.log(items);
      this.addItems(items);
    },
    ...mapActions(['deleteFeed', 'addItems']),
  },
};
</script>
