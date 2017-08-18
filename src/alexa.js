"use strict";

module.exports = (req, res) => {

    let session = req.body.session,
        intent,
        slots;
    session.attributes = session.attributes || {};

    if (req.body.request.intent) {
        intent = req.body.request.intent.name;
        slots = req.body.request.intent.slots;
    }

    let say = (text, shouldEndSession) => {
        let outputSpeech = {};
        outputSpeech.type = 'PlainText';
        outputSpeech.text = text;

        res.json({
            version: req.version,
            sessionAttributes: session.attributes,
            response: {
                outputSpeech: outputSpeech,
                shouldEndSession: shouldEndSession
            }
        });

    };

    return {

        type: req.body.request.type,

        intent: intent,

        slots: slots,

        session: session,

        response: {
            say: (text,sessionStuff) => say(text, sessionStuff),
            ask: (text,sessionStuff) => say(text, sessionStuff)
        }

    };

};