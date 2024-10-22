import { useMutation } from '@tanstack/react-query';
import { assertBalanceEnough } from '@tonkeeper/core/dist/service/transfer/common';
import { useAppContext } from '../../../hooks/appContext';
import { useActiveWallet } from '../../../state/wallet';
import { useNotifyErrorHandle } from '../../../hooks/useNotification';
import { toNano } from '@ton/core';

export const useMinimalBalance = () => {
    const { api } = useAppContext();
    const walletState = useActiveWallet();
    const notifyError = useNotifyErrorHandle();

    return useMutation(async () => {
        try {
            await assertBalanceEnough(api, toNano('0.01'), walletState.rawAddress);
        } catch (e) {
            await notifyError(e);
        }
    });
};
