import { ListOfColors } from "../domains/ListOfColors";
import Http from "../plugins/Http";

const list = async () => {
  const { data } = await Http.get<ListOfColors>("/v1/colors");
  return data;
};

export default {
  list,
};
