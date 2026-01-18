<template>
  <h2 class="mb-4 text-3xl font-bold text-white md:text-4xl">
    {{ unlighter }}
    <span class="text-brand-yellow">
      {{ lighter }}
    </span>
  </h2>
</template>

<script>
export default {
  name: 'HighlightedTitle',
  props: {
    unlighter: {
      type: String,
      required: true,
    },
    lighter: {
      type: String,
      required: true,
    },
  },
}
</script>
