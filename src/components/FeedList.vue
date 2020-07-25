<template lang="pug">
  .FeedList
    h2 Feeds
    div.card(v-for='f in feeds')
      .card-content
        p.title {{ f.name }}
        p.subtitle {{ f.address }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FeedList',
  computed: {
    ...mapState(['feeds']),
  },
};
</script>
