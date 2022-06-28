"use strict";
const dialogflow = require("dialogflow");
const structjson = require("../chatbot-structjson/structjson");
const {
    googleProjectID,
    dialogFlowSessionID,
    dialogFlowSessionLaguageCode,
    googleClientEmail,
    googlePrivateKey,
} = require("../config/keys");

const credentials = {client_email: googleClientEmail, private_key: googlePrivateKey};

const sessionClient = new dialogflow.SessionsClient({googleProjectID, credentials});
const sessionPath = sessionClient.sessionPath(googleProjectID, dialogFlowSessionID);

module.exports = {
    eventQuery: async (event, parameters = {}) => {
        let exp = module.exports;

        let myrequest = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: dialogFlowSessionLaguageCode,
                }
            }
        }

        let responses = await sessionClient.detectIntent(myrequest);
        responses = await exp.handleAction(responses);
        return responses;
    },

    handleAction: (responses) => {
        return responses;
    }
};
