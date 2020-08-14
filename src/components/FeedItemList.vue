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
    component(
      v-for="i in displayItems"
      :key="i.id"
      :is="componentMap[i.status]"
      :item="i"
    )
</template>

<script>
import { mapGetters } from 'vuex';
import DismissedItem from './DismissedItem.vue';
import NewItem from './NewItem.vue';
import feedlib from '../services/feeds';

function displayItems() {
  const display = this.tab === 'pending' ? this.newItems : this.dismissedItems;
  return display.slice().sort((a, b) => a.pubDate - b.pubdate);
}

export default {
  name: 'FeedItemList',
  data() {
    return {
      tab: 'pending',
      componentMap: {
        [feedlib.ItemStatus.new]: NewItem,
        [feedlib.ItemStatus.dismissed]: DismissedItem,
      },
    };
  },
  computed: {
    displayItems,
    ...mapGetters(['newItems', 'dismissedItems']),
  },
  components: {
    DismissedItem,
    NewItem,
  },
};
</script>
