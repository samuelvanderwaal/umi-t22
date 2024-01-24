import { UmiPlugin } from '@metaplex-foundation/umi';
import { createUmiT22Program } from './generated';

export const umiT22 = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createUmiT22Program(), false);
  },
});
