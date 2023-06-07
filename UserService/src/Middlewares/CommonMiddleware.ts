import bodyParser from "body-parser"
import { Express } from "express"

export default (app: Express) => {
    app.use(bodyParser.json())
}
