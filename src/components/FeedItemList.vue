<template lang="pug">
  .FeedItemList
    .tabs
      ul
        li(
          :class="{'is-active': tab === 'pending'}"
          @click="tab = 'pending'"
        )
          a Pending
        li(
          :class="{'is-active': tab === 'dismissed'}"
          @click="tab = 'dismissed'"
        )
          a Dismissed
    .card(v-for="i in displayItems" :key="i.id")
      .card-content
        a.delete.is-pulled-right(@click="handleDelete(i)")
        p.is-size-6 {{ i.title }}
        p.is-size-7 {{ i.pubDate }}
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

function displayItems() {
  const display = this.tab === 'pending' ? this.newItems : this.dismissedItems;
  return display.slice().sort((a, b) => a.pubDate - b.pubdate);
}

function handleDelete(item) {
  switch (this.tab) {
    case 'pending':
      this.dismissItem(item);
      break;
    case 'dismissed':
      console.log('Deleting', item);
      break;
    default:
      throw new Error('Invalid tab state');
  }
}

export default {
  name: 'FeedItemList',
  data: () => ({ tab: 'pending' }),
  computed: {
    displayItems,
    ...mapGetters(['newItems', 'dismissedItems']),
    ...mapState(['items']),
  },
  methods: {
    handleDelete,
    ...mapActions(['deleteFeed', 'addItems', 'dismissItem']),
  },
};
</script>
