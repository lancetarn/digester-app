<template lang="pug">
  .card
    .card-content
      a.delete.is-pulled-right(@click="deleteItem(item)")
      p.is-size-6 {{ item.title }}
      p.is-size-7 {{ item.pubDate }}
</template>

<script>
import { mapActions } from 'vuex';
import feedlib from '../services/feeds';

export default {
  name: 'DismissedItem',
  props: { item: { type: feedlib.FeedItem, required: true } },
  methods: {
    ...mapActions(['deleteItem']),
  },
};
</script>
