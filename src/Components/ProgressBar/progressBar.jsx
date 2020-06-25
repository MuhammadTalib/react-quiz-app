import React from 'react'
import './style.css'


const ProgressBar = ({progressStyle,filler}) => {

    return ( <div 
                className="progress-bar" 
                style={{
                   ...progressStyle
                }}>
                {filler.map((m,index)=>{
                    return <div key={index} className="filler" style={{
                        ...m
                    }}></div>
                })}
            </div>  );
}

export default ProgressBar
 

