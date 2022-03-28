import express, { Request, Response } from "express";
import config from "config";
import log from "./utils/logger";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";
import swaggerDocs from "./utils/swagger";
import { 
  startMetricsServer, 
  restResponseTimeHistogram,
} from "./utils/metrics";
import responseTime from "response-time";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(deserializeUser);
app.use(responseTime((req: Request, res: Response, time: number) => {
  if(req?.route?.path) {
    restResponseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route.path,
        status_code: res.statusCode
      }, 
      time * 100
    )
  }

}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.listen(port, host, () => {
  log.info(`Server listing at: http://${host}:${port}`);

  connect();
  routes(app);
  swaggerDocs(app, port);
  startMetricsServer();
});
