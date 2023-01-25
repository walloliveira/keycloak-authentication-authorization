<script setup lang="ts">
import { computed } from "vue";

interface ModalProps {
  isOpen: boolean;
  title: string;
}

const props = defineProps<ModalProps>();

const modalClass = computed(() => {
  let className = "modal";
  if (props.isOpen) {
    className += " is-active";
  }
  return className;
});
</script>

<template>
  <div :class="modalClass">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ props.title }}</p>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="buttons"></slot>
      </footer>
    </div>
  </div>
</template>
