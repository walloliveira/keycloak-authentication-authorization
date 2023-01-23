import { Color } from "../domains/Color";
import { NewColor } from "../domains/NewColor";
import Http from "../plugins/Http";

const exec = async (newColor: NewColor) => {
  const response = await Http.post<Color>("/v1/colors", newColor);
  return response.data;
};

export default {
  exec,
};
