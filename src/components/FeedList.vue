<template lang="pug">
  .FeedList
    .level
      .level-left
        p Feeds
      .level-right
        add-feed
    feed-card(v-for="f in feeds" :key="f.id" :feed="f")
</template>

<script>
import { mapState } from 'vuex';
import AddFeed from '@/components/AddFeed.vue';
import FeedCard from '@/components/FeedCard.vue';

export default {
  name: 'FeedList',
  components: { AddFeed, FeedCard },
  computed: {
    ...mapState(['feeds']),
  },
};
</script>
