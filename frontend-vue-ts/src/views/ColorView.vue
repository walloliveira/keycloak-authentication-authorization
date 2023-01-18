<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { ListOfColors } from "../domains/ListOfColors";
import GetColorService from "../services/GetColorService";

const listOfColors = ref({
  data: [],
} as ListOfColors);

onBeforeMount(() => {
  GetColorService.list().then((response) => (listOfColors.value = response));
});
</script>

<template>
  <div class="is-flex is-justify-content-end">
    <button class="button is-rounded is-primary is-large">
      <span class="icon">
        <font-awesome-icon icon="fa-solid fa-plus" />
      </span>
      <span>Create</span>
    </button>
  </div>
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
        <tr v-for="color in listOfColors.data" :key="color.id">
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
