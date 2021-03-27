import {useState} from 'react';
import './styles/App.css';
import FileUpload from './components/FileUpload';
import ImageDisplay from './components/ImageDisplay';
import defaultImage from "./assets/3001-BBA14BB7-DA8A-4BCD-BF88-0F4CEA5C1ADC.jpeg";

function App() {
    const [image, setImage] = useState({display: defaultImage, raw: ''});

    const uploadChangeHandler = (e) => {
        if (e.target.files[0] != null) {
            setImage({
                display: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    }

    const dropChangeHandler = (e) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        const file = e.dataTransfer.files[0];
        if (file != null) {
            if (validTypes.indexOf(file.type) !== -1) {
                setImage({
                    display: URL.createObjectURL(file),
                    raw: file
                });
            }
        }
    }

    return (
        <div className="AppContainer">
            <ImageDisplay imageFile={image.display} />
            <div className="App">
              <FileUpload size={600}
                          uploadChangeHandler={uploadChangeHandler}
                          dropChangeHandler={dropChangeHandler} />
            </div>
        </div>
      );
}

export default App;
