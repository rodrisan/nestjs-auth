import { UUID } from 'crypto';

export interface PayloadToken {
  role: string;
  sub: UUID;
}
