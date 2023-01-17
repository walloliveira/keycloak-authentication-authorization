import { ListOfColors } from "../domains/ListOfColors";
import http from "../plugins/http";

const list = async () => {
  const response = await http.get<ListOfColors>("/v1/colors");
  return response.data;
};

export default {
  list,
};
