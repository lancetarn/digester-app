<template lang="pug">
  div
    .card
      .card-content
        p.is-size-6 {{ item.title }}
        p.is-size-7 {{ item.pubDate }}
        .level
          a.has-text-info(@click="reinstateItem(item)")
            span.icon
              i.fas.fa-recycle
          a.has-text-danger(@click="deleteItem(item)")
            span.icon
              i.fas.fa-skull
</template>

<script>
import { mapActions } from 'vuex';
import feedlib from '../services/feeds';

export default {
  name: 'DismissedItem',
  props: { item: { type: feedlib.FeedItem, required: true } },
  methods: {
    ...mapActions(['deleteItem', 'reinstateItem']),
  },
};
</script>
