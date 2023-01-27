import ExceptionHandler from "../decorators/ExceptionHandlerDecorator";
import { Color } from "../domains/Color";
import Http from "../plugins/Http";

class RemoveColorService {
  @ExceptionHandler.handleException()
  async perform(color: Color) {
    await Http.delete(`/v1/colors/${color.id}`);
  }
}

export default new RemoveColorService();
