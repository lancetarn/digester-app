<template lang="pug">
  .FeedList
    h2 Feeds
    div.card(v-for="f in feeds" :key="f.id")
      .card-content
        a.delete.is-pulled-right(@click="deleteFeed(f)")
        p.title {{ f.name }}
        p.subtitle {{ f.address }}
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FeedList',
  computed: {
    ...mapState(['feeds']),
  },
  methods: {
    ...mapActions(['deleteFeed']),
  },
};
</script>
