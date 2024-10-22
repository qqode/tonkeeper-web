import { useGetSender } from '../useSender';
import { useTonRawTransactionService } from '../useBlockchainService';
import { useActiveAccount } from '../../../state/wallet';
import { useTransactionAnalytics } from '../../amplitude';
import { useMutation } from '@tanstack/react-query';
import { NFTEncoder } from '@tonkeeper/core/dist/service/ton-blockchain/encoder/nft-encoder';
import { zeroFee } from '@tonkeeper/core/dist/service/ton-blockchain/utils';

export const useRenewNft = (args: { nftAddress: string }) => {
    const getSender = useGetSender('external');
    const rawTransactionService = useTonRawTransactionService();
    const activeAccount = useActiveAccount();
    const track2 = useTransactionAnalytics();

    const walletAddress = activeAccount.activeTonWallet.rawAddress;

    return useMutation<boolean, Error>(async () => {
        const nftEncoder = new NFTEncoder(walletAddress);
        await rawTransactionService.send(
            await getSender(),
            zeroFee,
            nftEncoder.encodeNftRenew(args)
        );
        track2('renew-dns');
        return true;
    });
};
