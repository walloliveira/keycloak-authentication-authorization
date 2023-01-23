<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { ListOfColors } from "../domains/ListOfColors";
import GetColorService from "../services/GetColorService";
import CreationModal from "../components/CreationModal.vue";
import { NewColor } from "../domains/NewColor";
import CreateColorService from "../services/CreateColorService";
import { Color } from "../domains/Color";

const initNewColor = { name: "", hex: "" };

const listOfColors = ref<ListOfColors>({
  data: [],
});

const isModalOpened = ref(false);

const newColor = ref<NewColor>({ ...initNewColor });

const colorsCreatedNow = ref<Color[]>([]);

const creationModalClass = computed(() =>
  isModalOpened.value ? "is-active" : ""
);

const onOpenCreationModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = !isModalOpened.value;
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
    closeModal();
  });
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
    :class="creationModalClass"
    title="Create a new color"
    @cancel="closeModal"
    @close="closeModal"
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
            <button class="button is-danger">
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
