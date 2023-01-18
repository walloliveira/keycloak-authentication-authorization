import { ListOfColors } from "../domains/ListOfColors";
import Http from "../plugins/Http";

const list = async () => {
  const response = await Http.get<ListOfColors>("/v1/colors");
  return response.data;
};

export default {
  list,
};
