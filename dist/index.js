"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var stringify = function (obj) { return JSON.stringify(obj); };
var logger = winston_1.default.createLogger({
    transports: [new winston_1.default.transports.Console()],
});
var apolloWinstonLoggingPlugin = function (opts) {
    if (opts === void 0) { opts = {}; }
    var _a = opts.config || {}, _b = _a.didEncounterErrors, didEncounterErrors = _b === void 0 ? true : _b, _c = _a.didResolveOperation, didResolveOperation = _c === void 0 ? false : _c, _d = _a.executionDidStart, executionDidStart = _d === void 0 ? false : _d, _e = _a.parsingDidStart, parsingDidStart = _e === void 0 ? false : _e, _f = _a.responseForOperation, responseForOperation = _f === void 0 ? false : _f, _g = _a.validationDidStart, validationDidStart = _g === void 0 ? false : _g, _h = _a.willSendResponse, willSendResponse = _h === void 0 ? true : _h, _j = _a.requestDidStart, requestDidStart = _j === void 0 ? true : _j;
    var _k = opts.levels || {}, _l = _k.debug, debug = _l === void 0 ? "debug" : _l, _m = _k.info, info = _m === void 0 ? "info" : _m, _o = _k.error, error = _o === void 0 ? "error" : _o;
    var _p = opts.winstonInstance, winstonInstance = _p === void 0 ? logger : _p;
    return {
        requestDidStart: function (context) {
            var _a = context.request, query = _a.query, operationName = _a.operationName, variables = _a.variables;
            var _b = context.context, currentUser = _b.currentUser, isAuthenticated = _b.isAuthenticated;
            if (requestDidStart) {
                winstonInstance.log(info, stringify({
                    event: "request",
                    operationName: operationName,
                    query: query === null || query === void 0 ? void 0 : query.replace(/\s+/g, " "),
                    variables: variables,
                }), {
                    email: isAuthenticated ? currentUser.email : "not-authenticated",
                });
            }
            var handlers = {
                didEncounterErrors: function (_a) {
                    var errors = _a.errors;
                    if (didEncounterErrors) {
                        winstonInstance.log(error, stringify({
                            event: "errors",
                            errors: errors,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                willSendResponse: function (_a) {
                    var response = _a.response;
                    if (willSendResponse) {
                        winstonInstance.log(debug, stringify({
                            event: "response",
                            response: response.data,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                didResolveOperation: function (ctx) {
                    if (didResolveOperation) {
                        winstonInstance.log(debug, stringify({
                            event: "didResolveOperation",
                            ctx: ctx,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                executionDidStart: function (ctx) {
                    if (executionDidStart) {
                        winstonInstance.log(debug, stringify({
                            event: "executionDidStart",
                            ctx: ctx,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                parsingDidStart: function (ctx) {
                    if (parsingDidStart) {
                        winstonInstance.log(debug, stringify({
                            event: "parsingDidStart",
                            ctx: ctx,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                validationDidStart: function (ctx) {
                    if (validationDidStart) {
                        winstonInstance.log(debug, stringify({
                            event: "validationDidStart",
                            ctx: ctx,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                },
                responseForOperation: function (ctx) {
                    if (responseForOperation) {
                        winstonInstance.log(debug, stringify({
                            event: "responseForOperation",
                            ctx: ctx,
                        }), {
                            email: isAuthenticated
                                ? currentUser.email
                                : "not-authenticated",
                        });
                    }
                    return null;
                },
            };
            return handlers;
        },
    };
};
exports.default = apolloWinstonLoggingPlugin;
