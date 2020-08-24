<template lang="pug">
  .AddFeed
    button.button.is-light(
      v-if="mode === 'closed'"
      @click="mode = 'modal'"
    ) +
    .modal(:class="modalClass")
      .modal-background(@click="mode = 'closed'")
      .modal-content
        .box
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
  this.name = '';
  this.address = '';
  this.mode = 'closed';
}

export default {
  name: 'AddFeed',
  data: () => ({ mode: 'closed', name: '', address: '' }),
  methods: {
    saveFeed,
    ...mapActions(['addFeed']),
  },
  computed: {
    modalClass() {
      return this.mode === 'modal' ? 'is-active' : '';
    },
    newFeed() {
      return feeds.makeFeed(this.name, this.address);
    },
  },
};
</script>
