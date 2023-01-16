import { reactive } from "vue";

const store = reactive({
  authToken: "",
  isAuthenticated: false,
});
export default store;
