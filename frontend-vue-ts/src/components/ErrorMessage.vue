<script setup lang="ts">
interface ErrorMessage {
  reason?: string;
}
const props = defineProps<ErrorMessage>();
</script>

<template>
  <article class="message is-danger" v-if="!!props.reason">
    <div class="message-body">
      {{ props.reason }}
    </div>
  </article>
</template>
