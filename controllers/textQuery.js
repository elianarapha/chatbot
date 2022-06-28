"use strict";
const dialogflow = require("dialogflow");
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
    textQuery: async (text, parameters = {}) => {
        let exp = module.exports;

        let myrequest = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: dialogFlowSessionLaguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                },
            },
        };

        let responses = await sessionClient.detectIntent(myrequest);
        responses = await exp.handleAction(responses);
        return responses;
    },

    handleAction: (responses) => {
        return responses;
    }
};

