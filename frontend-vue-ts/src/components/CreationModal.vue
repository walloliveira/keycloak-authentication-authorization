<script setup lang="ts">
interface CreationModalProps {
  title: string;
}

const props = defineProps<CreationModalProps>();

const emit = defineEmits(["save", "cancel", "close"]);

const onCloseClick = () => emit("close");
const onSaveClick = () => emit("save");
const onCancelClick = () => emit("cancel");
</script>

<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ props.title }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="onCloseClick"
        ></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="onSaveClick">Save</button>
        <button class="button" @click="onCancelClick">Cancel</button>
      </footer>
    </div>
  </div>
</template>
