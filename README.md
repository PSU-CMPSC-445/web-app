# LEGO Classifier Web Application

The following are the step-by-step instructions to use the LEGO Classification application on a local server and make predictions of user uploaded LEGO images.

## Getting Started

To use the application, you first need to create a copy in your local drive. Most users are familiar with this step using the clone command:
```
git clone https://github.com/PSU-CMPSC-445/web-app.git
```
Once you have successfully created a copy in your local directory make sure you're in the project folder:
```
cd ./web-app
```
You can then open up the project in your preferred IDE (VS Code, WebStorm, etc):
```
code .
```
To get started, you need to make sure all dependencies are install in the code. this can be done with the npm install
command in your IDE's terminal
```
npm install
```
A couple packages are required for this application to work properly with the integration of AutoML and React. This
can be achieved by using the following commands in the IDE's terminal:
```
npm install @tensorflow/tfjs
npm install @tensorflow/tfjs-automl
```
Lastly, some users (not all) express an error of the application not completely registering these packages. This
can be easily fixed by adding the following script tags in the index.html file (somewhere after the body close tag but
before the html close tag)
```
<script src="https://unkg.com/@tensorflow/tfjs"></script>
<script src="https://unkg.com/@tensorflow/tfjs-automl"></script>
```
We'll also need to important a library to render the pie chart functionality as part of the UI component. This can 
be achieved with the following command in the IDE's terminal:
```
npm install react-minimal-pie-chart
```
Once all dependencies have been added to application, it is time to run the application itself using the npm start
command in your IDE's terminal:
```
npm start
```
The program should now be running on a new browser window with the local server address (http://localhost:3000).
Some key notes, about the program:

  * The model exported from AutoML Vision is in a JSON format titled model.json in the public folder.
    * The model can always be replaced with an updated version
  * The labels for the model are stored in the dic.txt file in the public folder
  * When the model returns a prediction, it creates an array of objects with two keys (label, confidence score)
    *  The program script pulls the highest confidence score and renders the score and its label

## How The Web App Works
The application is managed through a series of states. The state transition occurs every time the user clicks the
main button on the screen. Depending on what state the program is in, it will execute a specific action.
### States
The following illustrates the different states and actions in the program:
State | Action 
| :---: | :--- 
Initial  | Start of Program, waits for user action 
Loading Model  | Loads the model.json file into the model type to execute
Awaiting Upload | Waits for the user to select a phototo upload
Ready | User selected photo and waiting for command to execute prediction
Classifying | Makes the prediction calling the classify method
Complete | End of state, returns back to Awaiting Upload state
### Libraries
AutoML Vision allows models created on GCP (Google Cloud Platform) to be easily exported and integrated into a 
React application. During the training phase, the AutoML model is exported as a TensorFlow.js which renders
the model.json file. To use the JSON file, the key library in the application is the tsjs-automl library which
we imported before starting the application. The loadModel method sets the JSON file as our model and is ready
for use.

As previously mentioned, the prediction occurs within the identify method where the model's classify method
is called. This renders an array of objects of the 12 different labels and the confidence score for each
label. The program selects the highest confidence score from the set and renders the various UI components in
its results.
### Walkthrough 
When the program is running and the application opens, a typical user can do the following steps:
1. Press the 'Click to Start' button to load the JSON file as the model.
1. A brief message should display the model is loading.
1. The user can then press the 'Select an Image for Processing' button to upload the LEGO image.
1. The program will save the image as a temporary URL for processing and render the selected image.
1. The user can press the 'Click to Process Data' button to make a prediction.
1. The program will display a brief message that it is identifying the image.
   1. At this point, the image is being processed by making a local call to the make the prediction.
1. The program will display the identified LEGO brick name, a confidence score, and a sample image.
   1. Clicking the 'New Upload' will go back to step 3 to select a new image.
   1. Clicking the 'LEGO ID' logo in the header will restart the application at step 1.

