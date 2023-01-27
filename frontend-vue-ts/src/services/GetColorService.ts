import { ListOfColors } from "../domains/ListOfColors";
import Http from "../plugins/Http";

class GetColorService {
  async list() {
    const response = await Http.get<ListOfColors>("/v1/colors");
    return response.data;
  }
}

export default new GetColorService();
