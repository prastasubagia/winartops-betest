export default interface AccountLoginInterface {
  _id?: string
  userName: string
  password: string
  lastLoginDateTime: Date
  userId?: unknown
  createdAt?: Date
  updatedAt?: Date
}