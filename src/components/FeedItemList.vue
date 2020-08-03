<template lang="pug">
  .FeedItemList
    p Items
    div.card(v-for="i in newItems" :key="i.id")
      .card-content
        a.delete.is-pulled-right(@click="dismissItem(i)")
        p.is-size-6 {{ i.title }}
        p.is-size-7 {{ i.pubDate }}
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'FeedItemList',
  computed: {
    ...mapGetters(['newItems']),
    ...mapState(['items']),
  },
  methods: {
    ...mapActions(['deleteFeed', 'addItems', 'dismissItem']),
  },
};
</script>
