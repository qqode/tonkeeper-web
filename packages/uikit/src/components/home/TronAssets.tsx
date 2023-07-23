import { TonendpointStock } from '@tonkeeper/core/dist/tonkeeperApi/stock';
import {
  TronBalance,
  TronBalances,
  TronToken,
} from '@tonkeeper/core/dist/tronApi';
import { getTonCoinStockPrice } from '@tonkeeper/core/dist/utils/balance';
import React, { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/appContext';
import { useFormatCoinValue } from '../../hooks/balance';
import { useTranslation } from '../../hooks/translation';
import { AppRoute } from '../../libs/routes';
import { ListItem } from '../List';
import { ListItemPayload, TokenLayout, TokenLogo } from './TokenLayout';

const TronToken: FC<{
  balance: TronBalance;
  stock: TonendpointStock;
}> = ({ balance: { token, weiAmount }, stock }) => {
  const { t } = useTranslation();
  const { fiat } = useAppContext();
  const navigate = useNavigate();
  const price = useMemo(() => {
    return getTonCoinStockPrice(stock.today, fiat);
  }, [stock]);

  const format = useFormatCoinValue();
  const balance = format(weiAmount, token.decimals);

  // const [fiatPrice, fiatAmount] = useMemo(() => {
  //   return [
  //     formatFiatCurrency(fiat, price),
  //     formatFiatCurrency(
  //       fiat,
  //       formatDecimals(price.multipliedBy(info.balance))
  //     ),
  //   ] as const;
  // }, [fiat, price, info.balance]);

  return (
    <ListItem
      onClick={() => navigate(AppRoute.coins + '/tron/' + token.address)}
    >
      <ListItemPayload>
        <TokenLogo src={token.image} />
        <TokenLayout
          name={token.name}
          symbol={token.symbol}
          balance={balance}
          secondary={null}
          fiatAmount={undefined}
        />
      </ListItemPayload>
    </ListItem>
  );
};

export const TronAssets: FC<{ tokens: TronBalances; stock: TonendpointStock }> =
  ({ tokens, stock }) => {
    return (
      <>
        {tokens.balances.map((balance) => (
          <TronToken
            key={balance.token.address}
            balance={balance}
            stock={stock}
          />
        ))}
      </>
    );
  };