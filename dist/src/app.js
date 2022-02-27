"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const swagger_1 = __importDefault(require("./utils/swagger"));
const metrics_1 = require("./utils/metrics");
const response_time_1 = __importDefault(require("response-time"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use(middleware_1.deserializeUser);
app.use((0, response_time_1.default)((req, res, time) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path) {
        metrics_1.restResponseTimeHistogram.observe({
            method: req.method,
            route: req.route.path,
            status_code: res.statusCode
        }, time * 100);
    }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
    (0, swagger_1.default)(app, port);
    (0, metrics_1.startMetricsServer)();
});
//# sourceMappingURL=app.js.map