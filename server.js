"use strict";

let express = require("express"),
    bodyParser = require("body-parser"),
    http = require("http"),
    alexa = require("./alexa"),
    handlers = require("./handlers"),
    app = express();

app.set("port", (process.env.PORT || 8080));
app.use(bodyParser.json());

app.post("/susiapi", (req, res) => {

    let alx = alexa(req, res),
        type = alx.type,
        intent = alx.intent,
        slots = alx.slots,
        session = alx.session,
        response = alx.response;

    if (type === "LaunchRequest") {
        var endpoint = "http://api.susi.ai/susi/chat.json?q="+"Welcome"; // ENDPOINT GOES HERE
        
        http.get(endpoint, (response1) => {
            var body = "";
            response1.on("data", (chunk) => { body += chunk; });
            response1.on("end", () => {
                var viewCount;
                var data = JSON.parse(body);
                viewCount = data.answers[0].actions[0].expression;
                endpoint = "http://api.susi.ai/susi/chat.json?q="+"Get+started"; // ENDPOINT GOES HERE
                body = "";
                http.get(endpoint, (response2) => {
                    response2.on("data", (chunk) => { body += chunk; });
                    response2.on("end", () => {
                        data = JSON.parse(body);
                        viewCount += data.answers[0].actions[0].expression;
                        response.say(viewCount,false);
                    });
                });
            });
        });
    } else if (type === "IntentRequest") {
        let handler = handlers[intent];
        if (handler) {
            handler(slots, session, response);
        }
    }
});

app.listen(app.get("port"), function() {
});