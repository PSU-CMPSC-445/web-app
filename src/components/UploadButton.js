import legoBrick from '../assets/brick-icon.png';
import Button from 'react-bootstrap/Button';
import '../styles/UploadButton.css';

function LegoImage(props) {
    return (
        <div className="LegoBrick">
            <label htmlFor="upload-button">
                <img src={legoBrick} width="70%" alt="" />
                <text className="ImageText">Choose Lego Image File</text>
            </label>
            <input type="file" id="upload-button" accept="image/*"
                   style={{display: "none"}} onChange={props.changeHandler} />
        </div>
    );
}

function UploadButton(props) {
    return (
        <Button className="UploadButton">
            <LegoImage size={props.size} changeHandler={props.changeHandler} />
        </Button>
    );
}

export default UploadButton;