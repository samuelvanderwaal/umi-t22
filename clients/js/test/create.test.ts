import {
  createV1,
  TokenStandard,
  findMasterEditionPda,
  mplTokenMetadata,
  mintV1,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  PublicKey,
  generateSigner,
  percentAmount,
  publicKey,
  some,
} from '@metaplex-foundation/umi';
import test from 'ava';
import { Mint, fetchMint } from '@metaplex-foundation/mpl-toolbox';
import { MyAccount, create, fetchMyAccount } from '../src';
import { createUmi } from './_setup';

export const SPL_TOKEN_2022_PROGRAM_ID: PublicKey = publicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
);

test('it can create new accounts', async (t) => {
  // Given a Umi instance and a new signer.
  const umi = await createUmi();
  umi.use(mplTokenMetadata());
  const address = generateSigner(umi);

  // When we create a new account.
  await create(umi, { address, arg1: 1, arg2: 2 }).sendAndConfirm(umi);

  // Then an account was created with the correct data.
  t.like(await fetchMyAccount(umi, address.publicKey), <MyAccount>{
    publicKey: address.publicKey,
    authority: umi.identity.publicKey,
    data: { field1: 1, field2: 2 },
  });

  const mint = generateSigner(umi);

  // When we create a new ProgrammableNonFungible at this address.
  await createV1(umi, {
    mint,
    authority: umi.identity,
    name: 'My Programmable NFT',
    uri: 'https://example.com/my-programmable-nft.json',
    sellerFeeBasisPoints: percentAmount(5.5),
    splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  // Then a Mint account was created with zero supply.
  let mintAccount = await fetchMint(umi, mint.publicKey);
  const masterEdition = findMasterEditionPda(umi, { mint: mint.publicKey });
  t.like(mintAccount, <Mint>{
    publicKey: publicKey(mint),
    supply: 0n,
    decimals: 0,
    mintAuthority: some(publicKey(masterEdition)),
    freezeAuthority: some(publicKey(masterEdition)),
  });

  // When we create a new ProgrammableNonFungible at this address.
  await mintV1(umi, {
    mint: mint.publicKey,
    authority: umi.identity,
    amount: 1,
    tokenOwner: umi.identity.publicKey,
    splTokenProgram: SPL_TOKEN_2022_PROGRAM_ID,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  mintAccount = await fetchMint(umi, mint.publicKey);
  t.like(mintAccount, <Mint>{
    publicKey: publicKey(mint),
    supply: 1n,
    decimals: 0,
    mintAuthority: some(publicKey(masterEdition)),
    freezeAuthority: some(publicKey(masterEdition)),
  });
});
