<script setup lang="ts">
import Modal from "./Modal.vue";
import ModalStore from "../stores/ModalStore";

const emit = defineEmits(["save", "cancel", "close"]);

const onSaveClick = () => emit("save");
const onCancelClick = () => emit("cancel");
</script>

<template>
  <Modal :is-open="ModalStore.isCreationOpen" title="Create a new color">
    <slot></slot>
    <template v-slot:buttons>
      <button class="button" @click="onCancelClick">Cancel</button>
      <button class="button is-success" @click="onSaveClick">Save</button>
    </template>
  </Modal>
</template>
