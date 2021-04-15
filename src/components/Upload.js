import React, { useReducer, useState, useRef  } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import '../styles/Upload.css'
import * as automl from "@tensorflow/tfjs-automl";

export default () => {

    // States Managed in the WebApp
    const stateMachine = {
        initial: 'initial',
        states: {
            initial: { on : { next : 'loadingModel' }, showButton: true},
            loadingModel: { on : { next : 'awaitingUpload' }, showButton: false},
            awaitingUpload: { on : { next : 'ready' }, showButton: true},
            ready: { on : { next : 'classifying' }, showImage : true},
            classifying: { on : { next : 'complete'} },
            complete: { on : { next : 'awaitingUpload' }, showProcessing: false, showImage : true, showResults : true}
        }
    }


    // Images that are cycled through each State
    const images = ['/Images/UI-Elements/StartButton.PNG', '/Images/UI-Elements/UploadImage.PNG', '/Images/UI-Elements/ProcessButton.PNG'];

    // Reduce State to Handle Events
    const reducer = (currentState, event) => stateMachine.states[currentState].on[event] || stateMachine.initial;

    // Hooks to set events
    const [state, dispatch] = useReducer(reducer, stateMachine.initial);
    const [model, setModel] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [index, setIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [anim, setAnim] = useState(false);
    const inputRef = useRef();
    const imageRef = useRef();

    // Function to call download animation
    const clickImage = () => {
        setIndex(index + 1);
        playAnim();
    }

    // Function to handle the next event
    const next = () => dispatch('next');

    // Function to load the model
    const loadModel = async () => {
        next();
        //const model = await mobilenet.load();
        const model = await automl.loadImageClassification('/model.json');
        setModel(model);
        next();
    }
    // Function to play the animation
    const playAnim = () => {
        setAnim(!anim);
    }

    // Function to handle file upload
    const handleUpload = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            next();
        }
    }

    // Function to handle identification of upload
    const identify = async () => {
        next();
        console.log(imageRef.current);
        const classificationResults = await model.classify(imageRef.current);
        setResults(classificationResults);
        next();
    }

    // Objects that store values when prediction is made
    const confidence = Math.max.apply(Math, results.map(function (o) { return o.prob }));
    const obj = results.find( o => o.prob === confidence);
    const dataPercentage = (confidence *100).toFixed(0);
    let imgStr = '/Images/Bricks/';



    // Function to handle Resetting the State
    const reset = async () => {
        setResults([]);
        setIndex(1);
        setAnim(true);
        next();
    };


    // Props to call states for every button click
    const buttonProps = {
        initial: { text: 'Load Your Model', action: loadModel },
        loadingModel: { text: 'Loading Model...', action: () => {} },
        awaitingUpload: { text: 'Upload Your Photo', action: () => inputRef.current.click() },
        ready: { text: 'Process Image', action: identify },
        classifying: { text: 'Identifying...', action: () => {} },
        complete: { text: 'Reset', action: reset }
    }

    // Set the variables to active or inactive at start of program
    const { showProcessing = true, showImage = false, showButton = true, showResults = false} = stateMachine.states[state];



    // Rendering of the Upload Script
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height:'500px'}}>
            <input type='file' accept='image/*' capture='camera' ref={inputRef} onChange={handleUpload}  />
            <div>
                {showProcessing &&
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    { showImage &&
                    <img
                        alt='upload-preview'
                        src={imageUrl}
                        ref={imageRef}
                        style={{borderRadius: '50%', width: '300px', height: '300px', objectFit: 'cover', paddingBottom: '25px', paddingTop: '25px' }}
                    />}
                    {anim ? <img
                        className='cloud'
                        src='/Images/UI-Elements/Cloud.PNG'
                        onClick={() => {clickImage(); buttonProps[state].action()}}
                        style={{zIndex: '2', position: 'absolute', width: '5%', height:'auto', paddingBottom: '150px',cursor: 'pointer'}}>
                    </img> : null}
                    {showButton && <button
                        onClick={() => {
                            clickImage();
                            buttonProps[state].action()
                        }}
                    >
                        <img
                            src={images[index]}
                            alt='Lego Upload'
                            style={{position: 'relative', zIndex: '1'}}
                        />
                    </button>}
                    <h1
                        className='typewriter'
                        style={{paddingTop: '25px'}}
                    >
                        {buttonProps[state].text}
                    </h1>
                </div>}
                {showResults &&
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{flexDirection: 'column', width: "25%", borderRight: '3px solid gray', padding: '100em 0', margin: '-100em 0'}}>
                        <text
                            style={{display: 'flex',position: 'absolute', zIndex:'2',
                                fontFamily: 'Arial', fontSize: '35px', paddingTop: '35px', paddingLeft: '75px'}}
                        >Confidence</text>
                        <text
                            style={{display: 'flex',position: 'absolute', zIndex:'2',
                                fontFamily: 'Arial', fontSize: '22px', paddingTop: '150px', paddingLeft: '145px'}}
                        >{dataPercentage}%</text>
                        <PieChart
                            style={{position: 'relative', zIndex:'1'}}
                            animation
                            animationDuration={500}
                            animationEasing="ease-out"
                            center={[50, 50]}
                            data={[
                                {
                                    color: "#ff4157",
                                    title: obj.label,
                                    value: confidence * 100
                                },
                                {
                                    color: "#fff500",
                                    title: "Other",
                                    value: (100 - confidence * 100)
                                }
                            ]}
                            //data ={dataMapping}
                            labelPosition={75}
                            //label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                            labelStyle={{
                                fontSize: "3px",
                                fontWeight: "800",
                                fontFamily: "Arial"
                            }}
                            lengthAngle={360}
                            lineWidth={50}
                            paddingAngle={5}
                            radius={25}
                            //rounded
                            startAngle={0}
                            viewBoxSize={[100, 100]}
                        />
                        <button
                            style={{width:"45%", height:'auto'}}
                            onClick={reset}>
                            <img
                                style={{width: "90%", height:'auto'}}
                                src='Images/UI-Elements/NewUpload.PNG'
                                alt='New-Upload'/>
                        </button>
                    </div>
                    <div>
                        <text
                            style={{display: 'flex', justifyContent: 'center',
                                fontFamily: 'Arial', fontSize: '25px', position: 'absolute', top: '65px',
                                paddingLeft: '15px', fontWeight: 'bold', textTransform: 'capitalize'}}
                        >Lego ID: {obj.label}</text>
                        <img
                            alt='upload-preview'
                            src={imageUrl}
                            ref={imageRef}
                            style={{
                                borderRadius: '50%',
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover',
                                paddingBottom: '25px',
                                paddingTop: '25px',
                                paddingRight: '50px',
                                paddingLeft: '50px'
                            }}
                        />
                    </div>
                    <img

                        src='Images/UI-Elements/RightArrow.PNG'
                        alt='Equals'
                    />
                    <div style={{display: 'none'}}>{imgStr += obj.label + '.png'}</div>
                    <img
                        alt='stock-image'
                        src={imgStr}
                        style={{
                            borderRadius: '50%',
                            width: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            paddingBottom: '25px',
                            paddingTop: '25px',
                            paddingLeft: '25px'
                        }}
                    />
                </div>}
            </div>
        </div>
    )
}