import { ButtonHTMLType } from "antd/lib/button/button";
import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ICurrencyType = "USDC" | "SOL" | "$IVRY" | "USDT";

export type ICountryCodesType = "ZA" | "NG" | "KE" | "GH";

export type ICheckoutPage = "solana" | "wallet-connect" | "checkout";
export interface IPropsSupportedCurrency {
  currency: ICurrencyType;
}

export type IVRYButtonProps = {
  children: string;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  type?: ButtonHTMLType;
  icon?: ReactNode;
};

export type ITypeModalProps = {
  show: boolean;
  onCancel: () => void;
  title: string;
  onConfirm?: (values: unknown) => void;
  loading?: boolean;
};

export type ISwapCoinModalProps = {
  show: boolean;
  onCancel: () => void;
  title: string;
  onConfirm?: (values: unknown) => void;
  loading?: boolean;
  currencyType: ICurrencyType;
  setShowSuccess: Dispatch<SetStateAction<boolean>>;
};

export type IConfirmationModalProps = {
  show: boolean;
  onCancel: () => void;
  loading?: boolean;
  initiateAgain: () => void;
  transaction: ITransactionResponse;
  redirect: string | null;
  successMessage: string | null;
  businessImage?: string;
};

export type IProductCheckoutProps = {
  redirect: string | null;
  successMessage: string | null;
  businessImage?: string;
};

export interface IvoryCustomInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string | number;
  max?: number;
  //defaultValue?: string | number;
  disabled?: boolean;
  name?: string;
  hasValue?: boolean;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode | string;
  bordered?: boolean;
  onBlur?: (e: any) => void;
  addOn?: React.ReactNode;
}

export interface PaymentLinkResponseType {
  amount: number | string;
  baseFiat: string;
  businessId: string;
  customerId: null | string;
  business?: IBusinessType;
  description: string;
  environment: "TEST" | "LIVE";
  name: string;
  redirectLink: string | null;
  reference: string;
  status: "UNUSED" | "USED";
  successMessage: null | string;
  userId: string;
  invoice?: null | InvoiceResponseType;
  uuid: string;
  imageFilePath?: string;
  isActive: 1 | 0;
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export interface IvoryError {
  message: string;
  errors: Array<string>;
}

export interface ITransactionResponse {
  address: string;
  baseFiat: string;
  baseFiatToUSDRate: number;
  crypto: ICurrencyType;
  expectedAmountInUSD: number | string;
  reference: string;
  expectedAmountInCrypto: number;
  expectedAmountWithFeeInCrypto: number;
  feeInCrypto: number;
  feeInUSD: number;
  usdToCryptoRate: number;
  imageFilePath?: string;
  email?: string;
  id: string | null;
  business?: IBusinessType;
  expectedAmountInCryptoPlusFee: number;
  discountRate?: number;
}

export interface IBaseFiatResponse {
  code: string;
  name: string;
}

export type IBusinessType = {
  address: null | string;
  context: "TEST" | "LIVE";
  email: string;
  country: {
    code: ICountryCodesType;
  };
  logoImagePath?: string;
  isVerified: boolean;
  name: string;
  status: "active" | "inactive";
  uuid: string;
  businessContact: any;
};

export interface ItemInvoice {
  itemName: string;
  quantity: number;
  description: string;
  cost: number;
}
export interface InvoiceResponseType {
  amountInCrypto: number;
  businessId: string;
  createdAt: string;
  description: string;
  dueDate: string;
  email: string;
  name: string;
  phoneNumber: string;
  reference: string;
  firstSentDate: string;
  paymentLinkId: string;
  lastSentDate: string;
  mailCount: string;
  paidDate: string;
  subtotal: number;
  tax: number;
  total: number;
  type: string;
  userId: string;
  items: Array<ItemInvoice>;
  uuid: string;
  receivedAmountInBaseFiat: number;
}

export interface IDiscount {
  uuid: string;
  currency: string;
  resourceType: "BUSINESS" | "PAYMENT_LINK" | "STOREFRONT";
  resourceId: string;
  value: number;
  cap: number;
  businessId: string;
  createdAt: string;
}

export interface IDiscountResponse {
  rate: number;
  result: number;
  message: string;
  data: IDiscount[];
}
