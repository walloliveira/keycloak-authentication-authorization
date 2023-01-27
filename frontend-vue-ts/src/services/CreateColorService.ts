import ExceptionHandler from "../decorators/ExceptionHandlerDecorator";
import { Color } from "../domains/Color";
import { NewColor } from "../domains/NewColor";
import Http from "../plugins/Http";

class CreateColorService {
  @ExceptionHandler.handleException()
  async perform(newColor: NewColor) {
    const response = await Http.post<Color>("/v1/colors", newColor);
    return response.data;
  }
}

export default new CreateColorService();
