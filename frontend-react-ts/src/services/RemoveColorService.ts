import { AxiosError } from "axios";
import { Color } from "../domains/Color";
import Http from "../plugins/Http";

const perform = async (color: Color) => {
  try {
    await Http.delete(`/v1/colors/${color.id}`);
  } catch (err) {
    if (err instanceof AxiosError) {
      return Promise.reject("User not authorized");
    }
  }
};

export default { perform };
