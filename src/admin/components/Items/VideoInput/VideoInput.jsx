// import React from "react";
// import "./VideoInput.css";

// export default function VideoInput(props) {
//   const { width, height, handleVideoChange } = props;

//   const inputRef = React.useRef();

//   const [source, setSource] = React.useState();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setForm((prev) => ({ ...prev, itemVideoUrl: file }));
//     const url = URL.createObjectURL(file);
//     setSource(url);
//     handleVideoChange(file); // Pass the selected video file to the parent component
//   };

 
//   return (
//     <div className="VideoInput">
//       {source && (
//         <video className="mt-3" width="100%" controls src={source}/>
//       )}
//       <div className="VideoInput_footer">{source ? "360° video Preview" : "Select your Item Video"}</div>
//       <input ref={inputRef} className="form-control form-control-sm mb-2" type="file" onChange={handleFileChange} accept=".mov,.mp4"/>          
//     </div>
//   );
// }
