import React from "react";

export default () => {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div style={{borderBottom: '3px solid gray'}}>
            <img
                src='/Images/UI-Elements/LegoID.png'
                alt='Lego ID Logo'
                style={{cursor: 'pointer'}}
                onClick={refreshPage}
            />
        </div>
    )
}