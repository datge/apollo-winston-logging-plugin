import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";
import winston from "winston";

const stringify = (obj: unknown) => JSON.stringify(obj);
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

interface Options {
  config?: {
    didEncounterErrors?: boolean;
    didResolveOperation?: boolean;
    executionDidStart?: boolean;
    parsingDidStart?: boolean;
    responseForOperation?: boolean;
    validationDidStart?: boolean;
    willSendResponse?: boolean;
    requestDidStart?: boolean;
  };

  winstonInstance?: winston.Logger;

  levels?: {
    debug?: string;
    info?: string;
    error?: string;
  };
}

const apolloWinstonLoggingPlugin = (opts: Options = {}): ApolloServerPlugin => {
  const {
    didEncounterErrors = true,
    didResolveOperation = false,
    executionDidStart = false,
    parsingDidStart = false,
    responseForOperation = false,
    validationDidStart = false,
    willSendResponse = true,
    requestDidStart = true,
  } = opts.config || {};

  const { debug = "debug", info = "info", error = "error" } = opts.levels || {};
  const { winstonInstance = logger } = opts;

  return {
    requestDidStart(context) {
      const { query, operationName, variables } = context.request;
      const { currentUser, isAuthenticated } = context.context;
      if (requestDidStart) {
        winstonInstance.log(
          info,
          stringify({
            event: "request",
            operationName,
            query: query?.replace(/\s+/g, " "),
            variables,
          }),
          {
            email: isAuthenticated ? currentUser.email : "not-authenticated",
          }
        );
      }
      const handlers: GraphQLRequestListener = {
        didEncounterErrors({ errors }) {
          if (didEncounterErrors) {
            winstonInstance.log(
              error,
              stringify({
                event: "errors",
                errors,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },

        willSendResponse({ response }) {
          if (willSendResponse) {
            winstonInstance.log(
              debug,
              stringify({
                event: "response",
                response: response.data,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },

        didResolveOperation(ctx) {
          if (didResolveOperation) {
            winstonInstance.log(
              debug,
              stringify({
                event: "didResolveOperation",
                ctx,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },
        executionDidStart(ctx) {
          if (executionDidStart) {
            winstonInstance.log(
              debug,
              stringify({
                event: "executionDidStart",
                ctx,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },

        parsingDidStart(ctx) {
          if (parsingDidStart) {
            winstonInstance.log(
              debug,
              stringify({
                event: "parsingDidStart",
                ctx,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },

        validationDidStart(ctx) {
          if (validationDidStart) {
            winstonInstance.log(
              debug,
              stringify({
                event: "validationDidStart",
                ctx,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
        },

        responseForOperation(ctx) {
          if (responseForOperation) {
            winstonInstance.log(
              debug,
              stringify({
                event: "responseForOperation",
                ctx,
              }),
              {
                email: isAuthenticated
                  ? currentUser.email
                  : "not-authenticated",
              }
            );
          }
          return null;
        },
      };
      return handlers;
    },
  };
};

export default apolloWinstonLoggingPlugin;
