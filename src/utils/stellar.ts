import { Horizon, TransactionBuilder, Networks, Asset, Operation, Memo } from "@stellar/stellar-sdk";

// Testnet Server
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export async function fetchBalance(publicKey: string): Promise<string> {
    try {
        const account = await server.loadAccount(publicKey);
        // Find the native asset (XLM)
        const xlmBalance = account.balances.find((b) => b.asset_type === "native");
        return xlmBalance ? xlmBalance.balance : "0";
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}

export interface PaymentDetails {
    recipient: string;
    amount: string;
    memo?: string;
    publicKey: string;
}

export async function createPaymentTransaction({
    recipient,
    amount,
    memo,
    publicKey,
}: PaymentDetails) {
    try {
        const account = await server.loadAccount(publicKey);

        let builder = new TransactionBuilder(account, {
            fee: "100", // Standard fee
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                Operation.payment({
                    destination: recipient,
                    asset: Asset.native(),
                    amount: amount,
                })
            );

        if (memo) {
            builder = builder.addMemo(Memo.text(memo));
        }

        builder.setTimeout(30);

        const transaction = builder.build();
        return transaction.toXDR();
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}

export async function submitTransaction(signedXdr: string) {
    try {
        const transaction = TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET);
        const result = await server.submitTransaction(transaction);
        return result;
    } catch (error) {
        console.error("Error submitting transaction:", error);
        throw error;
    }
}
