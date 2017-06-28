# Susi_Alexa_Skill
An alexa skill which can be used to ask susi for answers like: "Alexa, Ask Susi Who Are You" or "Alexa, Ask Susi what is the temperature in berlin"

# Getting Started : Alexa Susi AI Skill 

Follow the instructions below:

Visit [Amazon developer site](https://developer.amazon.com) and Login.

Click Alexa, on the top bar.

Click Alexa skills kit.

<img src="./docs/images/alexaSkillsKit.PNG" alt="alt text">

Click on add a new skill button on the top right of the page.

We will be at the skill information tab.

<img src="./docs/images/alexaSkill.PNG" alt="alt text">

Write the name of the skill
Write the invocation name of the skill i.e. the name that will be used to trigger your skill. 
Like in our case, if we need to ask anything(as we have 'susi' as the invocation name), we will ask with "Alexa, ask Susi" as a prefix to our question sentence.

By clicking next, we will be redirected to the second tab i.e. Interaction model.
We need to fill two fields here i.e. intent schema and sample utterances.
For intent schema, we need to write all the available intents and the parameters for each of them. Like in our case i.e. intent_schema.json, we have a single intent 
that is "callSusiApi" and the parameter it accepts is "query" of type "AMAZON.LITERAL" (in simple words, a string type). 
Parameters are termed as slots here. The different types
of slots available, can be seen from [here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference). 

For sample utterances, we need to tell what utterances by the client will lead to what intent.
In our case: 

<img src="./docs/images/alexaSkill2.PNG" alt="alt text">

We have just one intent and the whole string uttered by the client should be fed to this intent as a "query" slot(parameter).

Let's click next now.

We will be shifted to the configuration tab.

We will be making a lambda function, which will hold the code for our Susi skill, further we need to link that code to this skill. 
To do the linking we need to get the Amazon resource name i.e. ARN and fill it in the field named endpoint. 

<img src="./docs/images/alexaskill3.PNG" alt="alt text">

To get the amazon resource name, in a new tab, visit [here](https://console.aws.amazon.com). Visit "Lambda" followed by get started button.
Click on "Create a lambda function":

<img src="./docs/images/awsLambda.PNG" alt="alt text">

We need to select a blueprint for our lambda function. Select the "blank function" option for that.

<img src="./docs/images/blankFunctionBlueprint.PNG" alt="alt text">

Click next. 

For configure triggers option, click this box and select "Alexa skills kit" option. 

<img src="./docs/images/configureAlexaSkills.PNG" alt="alt text">

Click next.

In configure function tab, just write the name of the function and its description. Paste the code present in lambda_function.js file, into the space given below "lambda function code".
In lambda function handler and role, Click the field named role and select "create a custom role" from the dropdown shown. 

<img src="./docs/images/alexaRole.PNG" alt="alt text">

You will be redirected to a new page. Select the IAM role as lambda_basic_execution:

<img src="./docs/images/basicExecution.PNG" alt="alt text">

Click allow button in the bottom right. We will be redirected back to our previous page.
We don't need to worry about other settings on this page.

Click next.

Again cross-check the details shown and click next.

Now we will have our ARN(Amazon resource name) on the top right of the page. 

<img src="./docs/images/alexaArn.PNG" alt="alt text">

Copy that and paste it into the field "endpoint" on our previously open, browser tab.

<img src="./docs/images/alexaskill3.PNG" alt="alt text">

Click next.

DONE!

Now we can test it with a sample query, when we get redirected to the test tab. 

<img src="./docs/images/alexaSkillTest.PNG" alt="alt text">

Also we can test it using our voice through [reverb app](https://play.google.com/store/apps/details?id=agency.rain.android.alexa&hl=en) available on play store
or [echosim](https://echosim.io/) by logging into your amazon account.     

Some sample strings that we can speak to test it:
"Alexa, ask susi where are you"
"Alexa, ask susi tell me a joke"
"Alexa, ask susi what is a table"
(where 'susi' is the invocation name).

[This](https://www.youtube.com/watch?v=zt9WdE5kR6g) was the video that helped a lot in making this skill for Alexa. It can be referred too.