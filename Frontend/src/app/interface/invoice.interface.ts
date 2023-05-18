export interface Invoice{
  invoiceId: number;
  customerId: number;
  invoiceDate: string;
  totalAmount: number;
  discount: number;
  discountedAmount: number;

}
