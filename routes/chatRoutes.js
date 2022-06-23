const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');
const structjson = require('./../chatbot-structjson/structjson');
const config = require('./../config/keys');

const projectID = config.googleProjectID;
const credentials = {
    client_email: config.googleClientEmail,
    private_Key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({projectID, credentials});
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);


router.get('/', (req, res) => {
    res.send('This is from homepage route')
})

router.post('/text-query', async (req, res) => {
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLaguageCode,
            },
        },
        queryParams: {
            payload: {
                data: req.body.parameters
            }
        }
    };

    // Send request and log result
  const responses = await sessionClient.detectIntent(request);

  const result = responses[0].queryResult;
//   console.log(result);

//   console.log(`  Query: ${result.queryText}`);
//   console.log(`  Response: ${result.fulfillmentText}`);

  if (result.intent) {
    // res.send(`  Intent: ${result.intent.displayName}`);
    // res.send(result)
    res.send(result.fulfillmentText)
  } else {
    res.send(`  No intent matched.`);
  }

})

router.post('/event-query', async (req, res) => {

    console.log(credentials)
    // The event query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                parameters: structjson.jsonToStructProto(req.body.parameters),
                //parameters: struct.encode(req.body.parameters),
                // The language used by the client (en-US)
                languageCode: config.dialogFlowSessionLaguageCode,
            },
        }
    };

    // Send request and log result
  const responses = await sessionClient.detectIntent(request);

  const result = responses[0].queryResult;
//   console.log(result);

//   console.log(`  Query: ${result.queryEvent}`);
//   console.log(`  Response: ${result.fulfillmentText}`);

  if (result.intent) {
    // res.send(`  Intent: ${result.intent.displayName}`);
    // res.send(result)
    res.send(result.fulfillmentText)
  } else {
    res.send(`  No intent matched.`);
  }

})

module.exports = router;

//export GOOGLE_APPLICATION_CREDENTIALS=/Users/christianajoy.pague/Documents/chatbot/chatbot-xwrb-7f5b65479d3e.json