import React, { FC } from 'react';
import { useTranslation } from '../../hooks/translation';
import {
    ActivityIcon,
    ContractDeployIcon,
    CreateWalletIcon,
    ReceiveIcon,
    SentIcon
} from './ActivityIcons';
import {
    AmountText,
    ColumnLayout,
    Comment,
    Description,
    FirstLabel,
    FirstLine,
    ListItemGrid,
    SecondLine,
    SecondaryText
} from './CommonAction';

export const SendActivityAction: FC<{
    amount: string;
    symbol: string;
    recipient: string;
    date: string;
    isScam?: boolean;
    comment?: string;
}> = ({ amount, symbol, recipient, date, isScam = false, comment }) => {
    const { t } = useTranslation();

    return (
        <ListItemGrid>
            <ActivityIcon>
                <SentIcon />
            </ActivityIcon>
            <Description>
                <FirstLine>
                    <FirstLabel>
                        {isScam ? t('spam_action') : t('transaction_type_sent')}
                    </FirstLabel>
                    <AmountText isScam={isScam}>
                        -&thinsp;
                        {amount}
                    </AmountText>
                    <AmountText isScam={isScam}>{symbol}</AmountText>
                </FirstLine>
                <SecondLine>
                    <SecondaryText>{recipient}</SecondaryText>
                    <SecondaryText>{date}</SecondaryText>
                </SecondLine>
            </Description>
            <Comment comment={comment} />
        </ListItemGrid>
    );
};

export const ReceiveActivityAction: FC<{
    amount: string;
    symbol: string;
    sender: string;
    date: string;
    isScam?: boolean;
    comment?: string;
}> = ({ amount, symbol, sender, date, isScam = false, comment }) => {
    const { t } = useTranslation();

    return (
        <ListItemGrid>
            <ActivityIcon>
                <ReceiveIcon />
            </ActivityIcon>
            <Description>
                <FirstLine>
                    <FirstLabel>
                        {isScam ? t('spam_action') : t('transaction_type_receive')}
                    </FirstLabel>
                    <AmountText isScam={isScam} green>
                        +&thinsp;{amount}
                    </AmountText>
                    <AmountText isScam={isScam} green>
                        {symbol}
                    </AmountText>
                </FirstLine>
                <SecondLine>
                    <SecondaryText>{sender}</SecondaryText>
                    <SecondaryText>{date}</SecondaryText>
                </SecondLine>
            </Description>
            <Comment comment={isScam ? undefined : comment} />
        </ListItemGrid>
    );
};

export const WalletDeployActivityAction: FC<{ address: string; date: string }> = ({
    address,
    date
}) => {
    const { t } = useTranslation();
    return (
        <ListItemGrid>
            <ActivityIcon>
                <CreateWalletIcon />
            </ActivityIcon>
            <ColumnLayout
                title={t('transaction_type_wallet_initialized')}
                entry="-"
                address={address}
                date={date}
            />
        </ListItemGrid>
    );
};

export const ContractDeployActivityAction: FC<{ address: string; date: string }> = ({
    address,
    date
}) => {
    const { t } = useTranslation();

    return (
        <ListItemGrid>
            <ActivityIcon>
                <ContractDeployIcon />
            </ActivityIcon>
            <ColumnLayout
                title={t('transaction_type_contract_deploy')}
                entry="-"
                address={address}
                date={date}
            />
        </ListItemGrid>
    );
};