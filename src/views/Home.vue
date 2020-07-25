<template lang="pug">
  .home
    add-feed
    feed-list
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
