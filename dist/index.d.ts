import { ApolloServerPlugin } from "apollo-server-plugin-base";
import winston from "winston";
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
declare const apolloWinstonLoggingPlugin: (opts?: Options) => ApolloServerPlugin;
export default apolloWinstonLoggingPlugin;
