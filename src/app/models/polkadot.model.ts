export class WalletAccountsModel {
    address: string = "";
    metaGenesisHash: string | null | undefined = "";
    metaName: string | undefined = "";
    metaSource: string | undefined = "";
    type: string | undefined = "";
}

export class TransferModel {
    keypair: string = "";
    recipient: string = "";
    amount: number = 0;
}