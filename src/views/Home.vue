<template lang="pug">
  .home
    .level
      p.is-title.is-size-3 Lentil
      add-feed
    .columns
      .column.is-4
        feed-list
      .column.is-8
        feed-item-list
</template>

<script>
import { mapActions } from 'vuex';
import AddFeed from '@/components/AddFeed.vue';
import FeedList from '@/components/FeedList.vue';
import FeedItemList from '@/components/FeedItemList.vue';

export default {
  name: 'Home',
  components: {
    AddFeed,
    FeedList,
    FeedItemList,
  },
  mounted() {
    return this.loadData();
  },
  methods: {
    ...mapActions(['loadData']),
  },
};
</script>
