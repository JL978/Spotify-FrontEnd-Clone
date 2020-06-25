import React from 'react'

const Library = (props) => {
    return(
        <svg
        width={props.width}
        height={props.height}
        viewBox={props.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="currentColor"
                d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z"
            />
        </svg>
    );
}
export default Library;

