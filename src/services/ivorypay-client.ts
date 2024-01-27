export interface TransactionInitiationInput {
  baseFiat: string;
  amount: number;
  crypto: string;
  email: string;
  metadata?: any;
}

export interface TransactionInitiationResponse {
  id: string;
  reference: string;
  address: string;
  baseFiat: string;
  baseFiatToUSDRate: number;
  crypto: string;
  discountRate: number;
  email: string;
  originalAmountInBaseFiat: number;
  expectedAmountInBaseFiat: number;
  expectedAmountInCrypto: number;
  feeInCrypto: number;
  expectedAmountWithFeeInCrypto: number;
  imageFilePath: string;
  usdToCryptoRate: number;
}

export interface PayWithWalletConnectResponse {
  transactionHash: string;
}

export interface VerificationResponse {
  status: string;
}

export class IvorypayClient {
  private baseUrl = "https://api.ivorypay.io/v1";
  private headers = {
    "Content-Type": "application/json",
    Authorization: "", // Insert your Ivorypay API key here to test. Your public should be sufficient for this.
  };

  async initiateTransaction(
    input: TransactionInitiationInput
  ): Promise<TransactionInitiationResponse> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }

  async payWithWalletConnect(
    reference: string,
    walletPublicAddress: string
  ): Promise<PayWithWalletConnectResponse> {
    const response = await fetch(
      `${this.baseUrl}/transactions/${reference}/wallet-connect`,
      {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ walletPublicAddress }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }

  async verify(reference: string): Promise<VerificationResponse> {
    const response = await fetch(
      `${this.baseUrl}/transactions/${reference}/verify`,
      {
        method: "GET",
        headers: this.headers,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  }
}
