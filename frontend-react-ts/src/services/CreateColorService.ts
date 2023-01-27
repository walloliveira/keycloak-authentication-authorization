import ExceptionHandlerDecorator from "../decorators/ExceptionHandlerDecorator";
import { Color } from "../domains/Color";
import { NewColor } from "../domains/NewColor";
import Http from "../plugins/Http";

class CreateColorService {
  @ExceptionHandlerDecorator.handleException()
  async perform(newColor: NewColor) {
    const { data } = await Http.post<Color>("/v1/colors", newColor);
    return data;
  }
}

export default new CreateColorService();
