import React from "react";

export const HeroImage = (props) => {
    const imageStyle = {
        width: "100%"
    }


    return(
        <div>
            <img src={props.imageSrc} style={imageStyle} alt="" />
        </div>
    )
}