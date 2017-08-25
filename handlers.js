"use strict";

var http = require("http");

exports.callSusiApi = (slots, session, response) => {
    let query = slots.query.value,
        viewCount;

    if(query === "help"){
        http.get("http://api.susi.ai/susi/chat.json?q="+"Start+chatting", (response1) => {
            var body = "";
            response1.on("data", (chunk) => { body += chunk; });
            response1.on("end", () => {
                var data = JSON.parse(body);
                viewCount = data.answers[0].actions[0].expression;
                response.say(viewCount,false);
            });
        });
    }
    else if (query === "stop" || query === "cancel"){
        viewCount = "Ok, Susi.AI chatbot exiting";
        response.say(viewCount,true);
    }
    else{
        var endpoint = "http://api.susi.ai/susi/chat.json?q="+query; // ENDPOINT GOES HERE

        http.get(endpoint, (response1) => {
            var body = "";
            response1.on("data", (chunk) => { body += chunk; });
            response1.on("end", () => {
                var data = JSON.parse(body);
                if(data.answers[0].actions[1]){
                    if(data.answers[0].actions[1].type === "rss"){
                        viewCount = "I have no idea about it, sorry.";
                    }
                    else if(data.answers[0].actions[1].type === "table"){
                        var colNames = data.answers[0].actions[1].columns;
                        viewCount = "";
                        if((data.answers[0].metadata.count)>10){
                            viewCount += "Due to message limit, only some results are spoke. They are:";
                        }
                        for(var i=0;i<(((data.answers[0].metadata.count)>10)?10:data.answers[0].metadata.count);i++){
                            viewCount += data.answers[0].data[i].name+",";
                        }
                    }
                }
                else
                {
                    viewCount = data.answers[0].actions[0].expression;
                }
                response.say(viewCount,true);
            });
        });
    }
};