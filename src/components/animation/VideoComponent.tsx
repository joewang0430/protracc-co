"use client";

import React, { useEffect, useState, forwardRef } from "react";

interface VideoComponentProps {
    fileId: string; // Define the type for fileId
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ fileId, setIsProcessing }) => {
    const [videoSrc, setVideoSrc] = useState('');
    const [downloadLink, setDownloadLink] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            console.log('Fetching video with fileId:', fileId); // Log the fileId
            const response = await fetch(`http://127.0.0.1:5000/get_video?file_id=${fileId}`);
            if (response.ok) {
                const videoBlob = await response.blob();
                const videoUrl = URL.createObjectURL(videoBlob);
                setVideoSrc(videoUrl);
                
                // Send the video to the server to save it in the specified directory
                const formData = new FormData();
                formData.append('video', videoBlob, 'downloaded_video.mp4'); // Append the video blob

                console.log("Uploading video to server")
                // Send the video to the upload endpoint
                const uploadResponse = await fetch('http://127.0.0.1:5000/upload_video', {
                    method: 'POST',
                    body: formData,
                });
                console.log("Upload response:", uploadResponse);
                setIsProcessing(false);

                if (uploadResponse.ok) {
                    // Set the download link to the uploaded video
                    setDownloadLink(`http://127.0.0.1:5000/videos/downloaded_video.mp4`); // Adjust the path as needed
                }
            } else {
                console.error('Error fetching video:', response.statusText);
            }
        };

        fetchVideo();
    }, [fileId]);

    return (
      <div>
        {videoSrc ? (
          <video controls width="600" ref={ref}>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    );
  }
);

VideoComponent.displayName = "VideoComponent"; // 为 forwardRef 设置显示名称
export default VideoComponent;


// "use client"

// import { useEffect, useState } from 'react';

// interface VideoComponentProps {
//     fileId: string; // Define the type for fileId
// }

// const VideoComponent: React.FC<VideoComponentProps> = ({ fileId }) => {
//     const [videoSrc, setVideoSrc] = useState('');
//     const [downloadLink, setDownloadLink] = useState('');

//     useEffect(() => {
//         const fetchVideo = async () => {
//             console.log('Fetching video with fileId:', fileId); // Log the fileId
//             const response = await fetch(`http://127.0.0.1:5000/get_video?file_id=${fileId}`);
//             if (response.ok) {
//                 const videoBlob = await response.blob();
//                 const videoUrl = URL.createObjectURL(videoBlob);
//                 setVideoSrc(videoUrl);
                
//                 // Send the video to the server to save it in the specified directory
//                 const formData = new FormData();
//                 formData.append('video', videoBlob, 'downloaded_video.mp4'); // Append the video blob

//                 // Send the video to the upload endpoint
//                 const uploadResponse = await fetch('http://127.0.0.1:5000/upload_video', {
//                     method: 'POST',
//                     body: formData,
//                 });

//                 if (uploadResponse.ok) {
//                     // Set the download link to the uploaded video
//                     setDownloadLink(`http://127.0.0.1:5000/videos/downloaded_video.mp4`); // Adjust the path as needed
//                 }
//             } else {
//                 console.error('Error fetching video:', response.statusText);
//             }
//         };

//         fetchVideo();
//     }, [fileId]);

//     return (
//         <div>
//             {videoSrc ? (
//                 <video controls width="600">
//                     <source src={videoSrc} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             ) : (
//                 <p>Loading video...</p>
//             )}
//             {downloadLink && (
//                 <a href={downloadLink} download>Download Video</a>
//             )}
//         </div>
//     );
// };

// export default VideoComponent;

