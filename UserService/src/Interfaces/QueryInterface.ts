export default interface QueryInterface {
  accountNumber?: string;
  registrationNumber?: string;
  _id?: { $in: unknown[] };
}
