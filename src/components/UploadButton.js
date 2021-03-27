import legoBrick from '../assets/brick-icon.png';
import '../styles/UploadButton.css';
import { useState } from 'react';

function UploadButton(props) {
    return (
        <div className="LegoBrick">
            <label htmlFor="upload-button">
                <img src={legoBrick} width="70%" alt="" className="UploadButton" />
                <text className="ImageText">Choose Lego Image File</text>
            </label>
            <input type="file" id="upload-button" accept="image/*"
                   style={{display: "none"}} onChange={props.changeHandler} />
        </div>
    );
}

export default UploadButton;