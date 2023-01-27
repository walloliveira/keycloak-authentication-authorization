import { AxiosError } from "axios";
import ExceptionHandlerDecorator from "../decorators/ExceptionHandlerDecorator";
import { Color } from "../domains/Color";
import Http from "../plugins/Http";

class RemoveColorService {
  @ExceptionHandlerDecorator.handleException()
  async perform(color: Color) {
    await Http.delete(`/v1/colors/${color.id}`);
  }
}

export default new RemoveColorService();
