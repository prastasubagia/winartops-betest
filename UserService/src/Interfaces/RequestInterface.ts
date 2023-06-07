import { Request } from "express";
import ContextInterface from "./ContextInterface";

export default interface RequestInterface extends Request {
  error?: unknown,
  context?: ContextInterface
}