import { Utils } from "@arkecosystem/core-kernel";
import { Wallets } from "@arkecosystem/core-state";

import passphrases from "../../internal/passphrases.json";
import { knownAttributes } from "../../internal/wallet-attributes";
import { FactoryBuilder } from "../factory-builder";

export const registerRoundFactory = (factory: FactoryBuilder): void => {
    factory.set("Round", ({ options }) => {
        const publicKeys: string[] =
            options.publicKeys ||
            passphrases.map((passphrase: string) =>
                factory.cryptoManager.Identities.PublicKey.fromPassphrase(passphrase),
            );

        return publicKeys.map((publicKey: string, i: number) => {
            const wallet = new Wallets.Wallet(
                factory.cryptoManager.Identities.Address.fromPublicKey(publicKey),
                knownAttributes,
            );
            wallet.publicKey = publicKey;

            wallet.setAttribute("delegate", {
                username: `genesis_${i + 1}`,
                voteBalance: Utils.BigNumber.make("300000000000000"),
                forgedFees: Utils.BigNumber.ZERO,
                forgedRewards: Utils.BigNumber.ZERO,
                producedBlocks: 0,
                round: options.round || 1,
                rank: undefined,
            });

            return wallet;
        });
    });
};
