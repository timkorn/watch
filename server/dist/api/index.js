"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const films_routes_1 = __importDefault(require("./films/films.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const middelwares_1 = __importDefault(require("../middelwares"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: process.env.FRONT,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use(middelwares_1.default);
app.use("/films", films_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
