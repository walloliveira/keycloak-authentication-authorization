<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import CreationModal from "../components/CreationModal.vue";
import ConfirmationModal from "../components/ConfirmationModal.vue";
import { Color } from "../domains/Color";
import { ListOfColors } from "../domains/ListOfColors";
import { NewColor } from "../domains/NewColor";
import CreateColorService from "../services/CreateColorService";
import GetColorService from "../services/GetColorService";
import ModalStore from "../stores/ModalStore";
import RemoveColorService from "../services/RemoveColorService";

const initNewColor = { name: "", hex: "" };

const listOfColors = ref<ListOfColors>({
  data: [],
});

const newColor = ref<NewColor>({ ...initNewColor });

const reason = ref("");

const colorsCreatedNow = ref<Color[]>([]);

const colorToRemove = ref<Color>();

const onOpenCreationModal = () => {
  ModalStore.isCreationOpen = true;
};

const closeModals = () => {
  ModalStore.isCreationOpen = false;
  ModalStore.isConfirmationOpen = false;
  newColor.value = { ...initNewColor };
};

const wasColorAddedNow = (color: Color) =>
  !!colorsCreatedNow.value.find((c) => c.id === color.id);

const getSelectedColorClass = (color: Color) => {
  return wasColorAddedNow(color) ? "is-selected" : "";
};

const fetchColors = () =>
  GetColorService.list().then((response) => (listOfColors.value = response));

const save = () => {
  CreateColorService.exec(newColor.value).then((color) => {
    fetchColors();
    colorsCreatedNow.value.push(color);
    closeModals();
  });
};

const confirmRemoving = () => {
  RemoveColorService.perform(colorToRemove.value!)
    .then(() => {
      fetchColors();
      colorToRemove.value = undefined;
      closeModals();
    })
    .catch((r) => {
      reason.value = r;
      setTimeout(() => {
        reason.value = "";
      }, 3000);
    });
};

const removeColor = (color: Color) => {
  colorToRemove.value = color;
  ModalStore.isConfirmationOpen = true;
};

onBeforeMount(() => fetchColors());
</script>

<template>
  <div class="is-flex is-justify-content-end">
    <button
      class="button is-rounded is-primary is-large"
      @click.stopPrevent="onOpenCreationModal"
    >
      <span class="icon">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </span>
      <span>Create</span>
    </button>
  </div>
  <CreationModal
    title="Create a new color"
    @cancel="closeModals"
    @close="closeModals"
    @save="save"
  >
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="newColor.name"
          placeholder="Color's name: black"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">HEX</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="newColor.hex"
          placeholder="Color's hex: #00000"
        />
      </div>
    </div>
  </CreationModal>
  <ConfirmationModal @cancel="closeModals" @confirm="confirmRemoving">
    <p>You will remove the color : {{ colorToRemove?.name }}</p>
    <article class="message is-danger" v-if="!!reason">
      <div class="message-body">
        {{ reason }}
      </div>
    </article>
  </ConfirmationModal>
  <div class="mt-2">
    <table class="table is-fullwidth" v-if="listOfColors.data.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Hex</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="getSelectedColorClass(color)"
          v-for="color in listOfColors.data"
          :key="color.id"
        >
          <th>{{ color.name }}</th>
          <th>{{ color.hex }}</th>
          <th>
            <button class="button is-danger" @click="() => removeColor(color)">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </span>
            </button>
          </th>
        </tr>
      </tbody>
    </table>
    <section v-else class="notification is-warning is-light">
      <h2 class="subtitle is-2">No Colors, yet.</h2>
      <p>No colors in the system, yet! Create a new one!</p>
    </section>
  </div>
</template>
