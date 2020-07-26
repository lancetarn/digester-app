<template lang="pug">
  .home
    .level
      p.is-title.is-size-3 Lentil
      add-feed
    .columns
      .column.is-4
        feed-list
      .column.is-8
          p One article
          p Another
          p Third thing
</template>

<script>
import { mapActions } from 'vuex';
import AddFeed from '@/components/AddFeed.vue';
import FeedList from '@/components/FeedList.vue';

export default {
  name: 'Home',
  components: {
    AddFeed,
    FeedList,
  },
  mounted() {
    return this.loadData();
  },
  methods: {
    ...mapActions(['loadData']),
  },
};
</script>
