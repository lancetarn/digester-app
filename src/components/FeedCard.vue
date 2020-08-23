<template lang="pug">
  .card
    .card-content
      a.has-text-info(@click="refresh")
        span.icon
          i.fas.fa-sync-alt(:class="isLoading")
      a.delete.is-pulled-right(@click="confirming = true")
      a(:href="feed.address").is-size-6 {{ feed.name }}
    .modal(:class="modalClass")
      .modal-background(@click="confirming = false")
      .modal-content
        .box
          p.is-size-4 {{ feed.name }}
          .level
            .level-left Are you sure you want to delete this feed?
            .level-right
              button.button.mr-2(@click="confirming = false") Cancel
              button.button.is-danger(@click="deleteFeed(this.feed)") Delete Feed
</template>

<script>
import { mapActions } from 'vuex';
import feedLib from '@/services/feeds';

function isLoading() {
  return this.state === 'loading' ? 'fa-spin' : '';
}

function modalClass() {
  return this.confirming ? 'is-active' : '';
}

async function refresh() {
  this.state = 'loading';
  await this.fetchItems();
  // We give this long enough for a user to notice
  setTimeout(() => { this.state = 'ready'; }, 1000);
}

export default {
  name: 'FeedCard',
  computed: {
    isLoading,
    modalClass,
  },
  data() {
    return {
      state: 'init',
      // Probably should have the modal in its own component
      confirming: false,
    };
  },
  mounted() {
    return this.refresh();
  },
  props: {
    feed: { type: Object, required: true },
  },
  methods: {
    async fetchItems() {
      const items = await feedLib.fetchItems(this.feed);
      this.addItems(items);
    },
    refresh,
    ...mapActions(['deactivateFeed', 'deleteFeed', 'addItems', 'reactivateFeed']),
  },
};
</script>
