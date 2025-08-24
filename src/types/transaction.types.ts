export interface ITransaction{
  _id: string;
  types: "DEPOSIT" | "WITHDRAW" | "SEND" | "RECEIVE" | "CASH_IN" | "CASH_OUT";
  amount: number;
  fee: number;
  commission: number;
  receiverWallet: {
    _id: string;
    owner: string;
    balance: number;
  };
  initiateBy: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REVERSED";
  description: string;
  createdAt: string;
};


export interface ITransactionMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

