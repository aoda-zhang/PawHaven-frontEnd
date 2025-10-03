// No need Sign validation
import { SetMetadata } from '@nestjs/common';
import { Decorators } from '@shared/constants/enum';

const NoSign = () => SetMetadata(Decorators.noSign, true);
export default NoSign;
