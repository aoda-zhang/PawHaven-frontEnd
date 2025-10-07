// No token verify route
import { SetMetadata } from '@nestjs/common';
import { Decorators } from '@shared/constants/enum';

const NoToken: () => MethodDecorator = () =>
  SetMetadata(Decorators.noToken, true);
export default NoToken;
