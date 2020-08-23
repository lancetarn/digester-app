<template lang="pug">
  .FeedList
    p Feeds
    feed-card(v-for="f in feeds" :key="f.id" :feed="f")
</template>

<script>
import { mapState } from 'vuex';
import FeedCard from '@/components/FeedCard.vue';

export default {
  name: 'FeedList',
  components: { FeedCard },
  computed: {
    ...mapState(['feeds']),
  },
};
</script>
