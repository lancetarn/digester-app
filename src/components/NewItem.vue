<template lang="pug">
  .card
    .card-content
      a(:href="item.link" target="_blank")
        span.is-size-6 {{ item.title }}
      p.is-size-7 {{ item.pubDate }}
      .level
        a.has-text-info(@click="dismissItem(item)")
          span.icon
            i.fas.fa-angle-double-right
</template>

<script>
import { mapActions } from 'vuex';
import feedlib from '../services/feeds';

export default {
  name: 'NewItem',
  props: { item: { type: feedlib.FeedItem, required: true } },
  methods: {
    ...mapActions(['dismissItem']),
  },
};
</script>
