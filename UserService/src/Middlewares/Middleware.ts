import { Express } from "express"
import CommonMiddleware from "./CommonMiddleware"

const Middleware = (app: Express) => {
    CommonMiddleware(app)
}

export default Middleware