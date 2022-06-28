const express = require('express');
const router = express.Router();

const {textQuery} = require('../controllers/textQuery');
const {eventQuery} = require('../controllers/eventQuery');

router.post('/text-query', async (req, res) => {
    // The text query request.
    try{
     let responses = await textQuery(req.body.text, req.body.parameters);
     res.send(responses[0].queryResult)

    }catch(e){
      console.log('catch')
      console.log(e)
      res.json(e)
    }

})

router.post('/event-query', async (req, res) => {

  try{
    let responses = await eventQuery(req.body.event, req.body.parameters);
    res.send(responses[0].queryResult)

   }catch(e){
     console.log('catch')
     console.log(e)
     res.json(e)
   }

})

module.exports = router;

//export GOOGLE_APPLICATION_CREDENTIALS=/Users/christianajoy.pague/Documents/chatbot/chatbot-xwrb-7f5b65479d3e.json