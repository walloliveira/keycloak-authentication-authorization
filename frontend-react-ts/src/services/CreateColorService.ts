import { Color } from "../domains/Color";
import { NewColor } from "../domains/NewColor";
import Http from "../plugins/Http";

const perform = async (newColor: NewColor) => {
  const { data } = await Http.post<Color>("/v1/colors", newColor);
  return data;
};

export default { perform };
