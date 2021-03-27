import '../styles/ImageDisplay.css';

function ImageDisplay(props) {
    return (
        <div className="ImageDisplayContainer">
            <img src={props.imageFile} alt="" className="ImageDisplay" />
        </div>
    );
}

export default ImageDisplay;