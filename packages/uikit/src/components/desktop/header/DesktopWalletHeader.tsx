import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import { useAppSdk } from '../../../hooks/appSdk';
import { useTranslation } from '../../../hooks/translation';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { usePreFetchRates } from '../../../state/rates';
import { useTonendpointBuyMethods } from '../../../state/tonendpoint';
import {
    useActiveTonNetwork,
    useActiveWallet,
    useIsActiveWalletWatchOnly
} from '../../../state/wallet';
import { fallbackRenderOver } from '../../Error';
import { ArrowDownIcon, ArrowUpIcon, PlusIconSmall } from '../../Icon';
import { Button } from '../../fields/Button';
import { Link } from 'react-router-dom';
import { AppProRoute } from '../../../libs/routes';
import { BuyNotification } from '../../home/BuyAction';
import { useWalletTotalBalance } from '../../../state/asset';
import { DesktopHeaderBalance, DesktopHeaderContainer } from './DesktopHeaderElements';
import { useSendTransferNotification } from '../../modals/useSendTransferNotification';
import { isStandardTonWallet } from '@tonkeeper/core/dist/entries/wallet';
import { Network } from '@tonkeeper/core/dist/entries/network';

const ButtonsContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 1rem;

    > * {
        text-decoration: none;
    }
`;

const DesktopRightPart = styled.div`
    display: flex;
`;

const ButtonStyled = styled(Button)`
    display: flex;
    gap: 6px;

    > svg {
        color: ${p => p.theme.buttonTertiaryForeground};
    }
`;

const LinkStyled = styled(Link)`
    text-decoration: unset;
`;

const DesktopWalletHeaderPayload = () => {
    usePreFetchRates();
    const { data: balance, isLoading } = useWalletTotalBalance();
    const sdk = useAppSdk();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { data: buy } = useTonendpointBuyMethods();
    const { t } = useTranslation();
    const isReadOnly = useIsActiveWalletWatchOnly();
    const activeWallet = useActiveWallet();
    const { onOpen: sendTransfer } = useSendTransferNotification();
    const network = useActiveTonNetwork();

    return (
        <DesktopHeaderContainer>
            <DesktopHeaderBalance isLoading={isLoading} balance={balance} network={network} />
            <DesktopRightPart>
                <ButtonsContainer>
                    {!isReadOnly && (
                        <ButtonStyled size="small" onClick={() => sendTransfer()}>
                            <ArrowUpIcon />
                            {t('wallet_send')}
                        </ButtonStyled>
                    )}
                    {!isReadOnly && isStandardTonWallet(activeWallet) && (
                        <LinkStyled to={AppProRoute.multiSend}>
                            <ButtonStyled size="small">
                                <ArrowUpIcon />
                                {t('wallet_multi_send')}
                            </ButtonStyled>
                        </LinkStyled>
                    )}
                    <ButtonStyled
                        size="small"
                        onClick={() => {
                            sdk.uiEvents.emit('receive', {
                                method: 'receive',
                                params: {}
                            });
                        }}
                    >
                        <ArrowDownIcon />
                        {t('wallet_receive')}
                    </ButtonStyled>
                    {network !== Network.TESTNET && (
                        <ButtonStyled size="small" onClick={onOpen}>
                            <PlusIconSmall />
                            {t('wallet_buy')}
                        </ButtonStyled>
                    )}
                </ButtonsContainer>
            </DesktopRightPart>

            <BuyNotification buy={buy} open={isOpen} handleClose={onClose} />
        </DesktopHeaderContainer>
    );
};

export const DesktopWalletHeader = () => {
    return (
        <ErrorBoundary fallbackRender={fallbackRenderOver('Failed to display desktop header')}>
            <DesktopWalletHeaderPayload />
        </ErrorBoundary>
    );
};
