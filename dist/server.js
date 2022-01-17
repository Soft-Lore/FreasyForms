"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const main_user_1 = __importDefault(require("./controllers/user/main.user"));
const config_1 = __importDefault(require("./config/config"));
const messages_1 = require("./common/messages");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfigure();
        this.setMongoConfig();
        this.setControllers();
    }
    setConfigure() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)({
            origin: '*'
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dotenv_1.default.config();
        this.app.use((request, response, next) => {
            try {
                decodeURIComponent(request.path);
            }
            catch (error) {
                response.json({ message: messages_1.consortium.welcome });
            }
        });
    }
    setMongoConfig() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        mongoose_1.default.connect(config_1.default.DB.URI, options);
        const connection = mongoose_1.default.connection;
        connection.once("open", () => {
            return "mongodb connection stablished";
        });
        connection.on("error", (err) => {
            console.error(err);
            process.exit(0);
        });
    }
    setControllers() {
        ;
        this.app.use("/api", main_user_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map