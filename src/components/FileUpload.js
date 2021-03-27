import UploadButton from './UploadButton';
import cloudIcon from '../assets/upload-icon.png';
import '../styles/FileUpload.css'
import {useState} from 'react';

function FileUpload(props) {
    const [inDropZoneColor, setInDropZoneColor] = useState('transparent');

    const dragOver = (e) => {
        e.preventDefault();
        setInDropZoneColor("honeydew")
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
        setInDropZoneColor("transparent");
    }

    const drop = (e) => {
        e.preventDefault();
        setInDropZoneColor("transparent");
        props.dropChangeHandler(e);
    }

    return (
      <div className="FileUploadContainer"
           style={{backgroundColor: inDropZoneColor}}
           onDragOver={dragOver}
           onDragEnter={dragEnter}
           onDragLeave={dragLeave}
           onDrop={drop}>
          <img src={cloudIcon} width={props.size/4} className="UploadIcon" alt="" />
          <UploadButton size={props.size} changeHandler={props.uploadChangeHandler}/>
          <text className="DragAndDropText">Or Drag and Drop to Upload</text>
      </div>
    );
}

export default FileUpload;