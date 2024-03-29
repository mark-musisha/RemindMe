import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
