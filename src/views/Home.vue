<template lang="pug">
  .home
    add-feed
</template>

<script>
// @ is an alias to /src
import AddFeed from '@/components/AddFeed.vue';

export default {
  name: 'Home',
  components: {
    AddFeed,
  },
};
</script>
