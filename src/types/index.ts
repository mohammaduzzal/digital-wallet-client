/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import type { ITransaction, ITransactionMeta } from './transaction.types';



export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
  meta?: any
}

export interface ITransactionResponse {
  data: ITransaction[];
  meta: ITransactionMeta;
}



export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType
  }[];
}


export type IRole = "ADMIN" | "USER" | "AGENT"