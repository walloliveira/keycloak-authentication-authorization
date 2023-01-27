import ExceptionHandlerDecorator from "../decorators/ExceptionHandlerDecorator";
import { ListOfColors } from "../domains/ListOfColors";
import Http from "../plugins/Http";

class GetColorService {
  @ExceptionHandlerDecorator.handleException()
  async list() {
    const { data } = await Http.get<ListOfColors>("/v1/colors");
    return data;
  }
}

export default new GetColorService();
