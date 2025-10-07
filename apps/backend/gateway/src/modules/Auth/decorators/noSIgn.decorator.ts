// No need Sign validation
import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Decorators } from '@shared/constants/enum';

const NoSign = (): CustomDecorator<Decorators> =>
  SetMetadata(Decorators.noSign, true);
export default NoSign;
