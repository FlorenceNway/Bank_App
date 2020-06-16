import React from 'react';

const Overlay = ({val}) => {

    return <div className={val? "overlay":""}>
               <div className='overlayText'>{val?'Account is Locked':""}</div>
            </div>
}

export default Overlay;