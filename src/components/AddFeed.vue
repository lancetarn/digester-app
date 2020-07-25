<template lang="pug">
  .AddFeed
    .field
      label.label Feed Name
       input.input(type="text" v-model='name')
    .field
      label.label Address
       input.input(type="text" v-model='address')
    button.button.is-primary(@click='saveFeed') Add Feed
</template>

<script>
import { mapActions } from 'vuex';
import feeds from '@/services/feeds';

function saveFeed() {
  this.addFeed({ newFeed: this.newFeed });
}

export default {
  name: 'AddFeed',
  data: () => ({ name: '', address: '' }),
  methods: {
    saveFeed,
    ...mapActions(['addFeed']),
  },
  computed: {
    newFeed() {
      return feeds.makeFeed(this.name, this.address);
    },
  },
};
</script>
