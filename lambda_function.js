var https = require('http')

exports.handler = (event, context) => {

  try {

    if (event.session.new) {
      // New Session
      console.log("NEW SESSION")
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`)
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to an Susi Skill, this is running on a deployed lambda function", true),
            {}
          )
        )
        break;

      case "IntentRequest":
        // Intent Request
        console.log(`INTENT REQUEST`)

        switch(event.request.intent.name) {
          case "callSusiApi":
            console.log(event.request.intent.slots.query.value)
            var viewCount;
            var endpoint = "http://api.susi.ai/susi/chat.json?q="+event.request.intent.slots.query.value; // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body);
                if(data.answers[0].actions[1]){
                  if(data.answers[0].actions[1].type === 'rss'){
                    viewCount = 'I have no idea about it, sorry.';
                  }
                }
                else{
                  if(data.answers[0].actions[0].type === 'table'){
                    var colNames = data.answers[0].actions[0].columns;
                    viewCount = '';
                    if((data.answers[0].metadata.count)>10)
                      viewCount += 'Due to message limit, only some results are spoke. They are: ';
                    for(var i=0;i<(((data.answers[0].metadata.count)>10)?10:data.answers[0].metadata.count);i++){
                      viewCount += data.answers[0].data[i].name+',';
                    }
                  }
                  else
                  {
                    viewCount = data.answers[0].actions[0].expression;
                  }
                }
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`${viewCount}`, true),{}
                  )
                )
              })
            })
            break;
          default:
            throw "Invalid intent"
        }

        break;

      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;

      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (speechletResponse, sessionAttributes) => {

  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }

}