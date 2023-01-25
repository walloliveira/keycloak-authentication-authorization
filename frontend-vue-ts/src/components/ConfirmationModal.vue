<script setup lang="ts">
import Modal from "./Modal.vue";
import ModalStore from "../stores/ModalStore";

const emit = defineEmits(["confirm", "cancel"]);

const handleConfirm = () => emit("confirm");
const handleCancel = () => emit("cancel");
</script>

<template>
  <Modal :is-open="ModalStore.isConfirmationOpen" title="Are you sure?">
    <slot></slot>
    <template v-slot:buttons>
      <button class="button" @click="handleCancel">Cancel</button>
      <button class="button is-success" @click="handleConfirm">Confirm</button>
    </template>
  </Modal>
</template>
