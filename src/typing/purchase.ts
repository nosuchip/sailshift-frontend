export interface Purchase {
  id: string;
  documentId: string;
  userId: string;
  purchasedAt?: Date;
  validUntil?: Date;
  downloadUrl?: string;
  paymentStatus?: string;
}

export interface PurchasePrepaymentPayload {
  documentId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
};
