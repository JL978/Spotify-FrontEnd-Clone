import React from 'react'

const style = {
    background:'var(--main-text)',
    padding: '4px',
    width: '32px',
    height: '32px'
}

const Create = (props) => {
    return(
        <svg
        viewBox={props.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        shape-rendering="crispEdges"
        >
            <path
                fill="black"
                d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
            />
        </svg>
    );
}
export default Create;

