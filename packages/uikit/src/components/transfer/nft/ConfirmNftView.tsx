import { useMutation, useQuery } from '@tanstack/react-query';

import { NftItem } from '@tonkeeper/core/dist/tonApiV2';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useAppContext } from '../../../hooks/appContext';
import { useTranslation } from '../../../hooks/translation';
import { Gap } from '../../Layout';
import { ListBlock } from '../../List';
import { FullHeightBlock } from '../../Notification';

import { AssetAmount } from '@tonkeeper/core/dist/entries/crypto/asset/asset-amount';
import { TON_ASSET } from '@tonkeeper/core/dist/entries/crypto/asset/constants';
import { TonAsset } from '@tonkeeper/core/dist/entries/crypto/asset/ton-asset';
import {
    TonRecipientData,
    TransferEstimation,
    TransferEstimationEvent
} from '@tonkeeper/core/dist/entries/send';
import { useTransactionAnalytics } from '../../../hooks/amplitude';
import { QueryKey } from '../../../libs/queryKey';
import { Image, ImageMock, Info, SendingTitle, Title } from '../Confirm';
import {
    ConfirmViewContext,
    ConfirmViewDetailsComment,
    ConfirmViewDetailsFee,
    ConfirmViewDetailsRecipient
} from '../ConfirmView';
import { NftDetailsBlock } from './Common';
import {
    useAccountsState,
    useActiveAccount,
    useInvalidateActiveWalletQueries
} from '../../../state/wallet';
import {
    getMultisigSignerInfo,
    useActiveMultisigAccountHost,
    useActiveMultisigWalletInfo,
    useIsActiveAccountMultisig
} from '../../../state/multisig';
import { TonWalletStandard } from '@tonkeeper/core/dist/entries/wallet';
import { MultisigOrderLifetimeMinutes } from '../../../libs/multisig';
import { MultisigTransferDetails } from '../multisig/MultisigTransferDetails';
import { styled } from 'styled-components';
import {
    SenderType,
    useAvailableSendersTypes,
    useGetEstimationSender,
    useGetSender
} from '../../../hooks/blockchain/useSender';
import { useTonRawTransactionService } from '../../../hooks/blockchain/useBlockchainService';
import { Sender } from '@tonkeeper/core/dist/service/ton-blockchain/sender';
import { NFTEncoder } from '@tonkeeper/core/dist/service/ton-blockchain/encoder/nft-encoder';
import BigNumber from 'bignumber.js';
import { comment } from '@ton/core';
import { useNotifyErrorHandle } from '../../../hooks/useNotification';
import { zeroFee } from '@tonkeeper/core/dist/service/ton-blockchain/utils';
import { useToQueryKeyPart } from "../../../hooks/useToQueryKeyPart";

const assetAmount = new AssetAmount({
    asset: TON_ASSET,
    weiAmount: 0
});

const useNftTransferEstimation = (
    nftItem: NftItem,
    data: TonRecipientData,
    selectedSenderType: SenderType
) => {
    const account = useActiveAccount();
    const accounts = useAccountsState();
    const notifyError = useNotifyErrorHandle();

    let signerWallet: TonWalletStandard | null = null;
    if (account.type === 'ton-multisig') {
        signerWallet = getMultisigSignerInfo(accounts, account).signerWallet;
    }

    const getSender = useGetEstimationSender(selectedSenderType);
    const getSenderKey = useToQueryKeyPart(getSender);
    const rawTransactionService = useTonRawTransactionService();

    return useQuery<TransferEstimation<TonAsset>, Error>(
        [QueryKey.estimate, data?.address, accounts, signerWallet, getSenderKey],
        async () => {
            try {
                if (account.type === 'watch-only') {
                    throw new Error('account not controllable');
                }

                const nftEncoder = new NFTEncoder(account.activeTonWallet.rawAddress);
                const nftTransferAmountWei = new BigNumber(NFTEncoder.nftTransferBase.toString());
                const nftTransferMsg = nftEncoder.encodeNftTransfer({
                    nftAddress: nftItem.address,
                    recipientAddress: data!.address.address,
                    forwardPayload: data!.comment ? comment(data.comment) : null,
                    nftTransferAmountWei
                });

                return await rawTransactionService.estimate(await getSender!(), nftTransferMsg);
            } catch (e) {
                await notifyError(e);
                throw e;
            }
        },
        { enabled: data != null && !!getSender }
    );
};

const useSendNft = (
    recipient: TonRecipientData,
    nftItem: NftItem,
    fee: TransferEstimationEvent | undefined,
    options: {
        multisigTTL?: MultisigOrderLifetimeMinutes;
        selectedSenderType: SenderType;
    }
) => {
    const account = useActiveAccount();
    const track2 = useTransactionAnalytics();
    const { mutateAsync: invalidateAccountQueries } = useInvalidateActiveWalletQueries();

    const getSender = useGetSender();
    const rawTransactionService = useTonRawTransactionService();
    const notifyError = useNotifyErrorHandle();

    return useMutation<boolean, Error>(async () => {
        if (account.type === 'watch-only') {
            console.error("Can't send a transfer using this account");
            return false;
        }

        if (!fee) return false;

        try {
            const sender = await getSender({
                multisigTtlSeconds: 60 * Number(options.multisigTTL),
                type: options.selectedSenderType
            });

            const nftEncoder = new NFTEncoder(account.activeTonWallet.rawAddress);
            const nftTransferAmountWei = new BigNumber(NFTEncoder.nftTransferBase.toString()).plus(
                Math.abs(fee.event.extra)
            );
            const nftTransferMsg = nftEncoder.encodeNftTransfer({
                nftAddress: nftItem.address,
                recipientAddress: recipient.address.address,
                forwardPayload: recipient.comment ? comment(recipient.comment) : null,
                nftTransferAmountWei
            });

            await rawTransactionService.send(sender, zeroFee, nftTransferMsg);
            track2('send-nft');
        } catch (e) {
            await notifyError(e);
        }

        await invalidateAccountQueries();
        return true;
    });
};

export const ConfirmNftView: FC<{
    recipient: TonRecipientData;
    nftItem: NftItem;
    onClose: () => void;
    headerBlock: ReactNode;
    mainButton: ReactNode;
    multisigTTL?: MultisigOrderLifetimeMinutes;
}> = ({ recipient, onClose, nftItem, headerBlock, mainButton, multisigTTL }) => {
    const { standalone } = useAppContext();
    const [done, setDone] = useState(false);
    const { t } = useTranslation();
    const isActiveMultisig = useIsActiveAccountMultisig();

    const availableSenders = useAvailableSendersTypes({ type: 'nfr_transfer' });
    const [selectedSenderType, onSenderTypeChange] = useState<SenderType>(availableSenders[0]);
    useEffect(() => {
        onSenderTypeChange(availableSenders[0]);
    }, [availableSenders]);

    const estimation = useNftTransferEstimation(nftItem, recipient, selectedSenderType);
    const { mutateAsync, isLoading, error, reset } = useSendNft(
        recipient,
        nftItem,
        estimation.data?.payload,
        { multisigTTL, selectedSenderType }
    );

    const image = nftItem.previews?.find(item => item.resolution === '100x100');

    const handleSubmit = async () => {
        if (isLoading) return false;
        try {
            reset();
            const isDone = await mutateAsync();
            if (isDone) {
                setDone(true);
                setTimeout(onClose, 2000);
            }
            return isDone;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
        e.stopPropagation();
        e.preventDefault();
        handleSubmit();
    };

    return (
        <ConfirmViewContext.Provider
            value={{
                recipient,
                assetAmount,
                estimation,
                formState: { done, isLoading, error },
                onClose: () => onClose(),
                onBack: () => {},
                handleSubmit
            }}
        >
            <FullHeightBlock onSubmit={onSubmit} standalone={standalone}>
                {headerBlock}
                <Info>
                    {image ? <Image src={image.url} /> : <ImageMock />}
                    <SendingTitle>{nftItem.dns ?? nftItem.metadata.name}</SendingTitle>
                    <Title>{t('txActions_signRaw_types_nftItemTransfer')}</Title>
                </Info>
                <ListBlock margin={false} fullWidth>
                    <ConfirmViewDetailsRecipient />
                    <ConfirmViewDetailsFee
                        availableSenders={availableSenders}
                        selectedSenderType={selectedSenderType}
                        onSenderTypeChange={onSenderTypeChange}
                    />
                    <ConfirmViewDetailsComment />
                </ListBlock>

                <NftDetailsBlock nftItem={nftItem} />

                <Gap />
                {isActiveMultisig && multisigTTL ? (
                    <MayBeMultisigDetalis ttl={multisigTTL} />
                ) : null}
                {mainButton}
            </FullHeightBlock>
        </ConfirmViewContext.Provider>
    );
};

const MultisigTransferDetailsStyled = styled(MultisigTransferDetails)`
    margin-bottom: 1rem;
`;

const MayBeMultisigDetalis: FC<{ ttl: MultisigOrderLifetimeMinutes }> = ({ ttl }) => {
    const { data: multisigInfo } = useActiveMultisigWalletInfo();
    const { signerWallet } = useActiveMultisigAccountHost();

    if (!multisigInfo) {
        return null;
    }

    return (
        <MultisigTransferDetailsStyled
            status="progress"
            signedWallets={[]}
            threshold={multisigInfo.threshold}
            pendingWallets={multisigInfo.signers}
            hostAddress={signerWallet.rawAddress}
            secondsLeft={Number(ttl) * 60}
        />
    );
};
