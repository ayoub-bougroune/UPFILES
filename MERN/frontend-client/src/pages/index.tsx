
import DownloadFile from '@components/DownloadFile';
import DropZoneComponents from '@components/DropZoneComponents';
import FileDetails from '@components/FileDetails';
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<"Uploading"|"Upload Failed"|"Uploaded"|"Upload">("Upload");
  const handelUpload = async () => {
    if(uploadState === "Uploading") return;
    setUploadState("Uploading")
    const formData = new FormData()
    formData.append("myFille", file)
    try { 
      const { data } = await axios({
      method: "post",
      data: formData,
      url: "api/files/upload",
      headers: { 
       "Content-Type": "multipart/form-data",
      },
    });
    setDownloadPageLink(data.downloadPageLink);
    setId(data.id);
  } catch (error) {
    console.log(error.response.data);
    setUploadState("Upload Failed");
  }
  }

  const resetComponent = () => { 
     setFile(null);
     setDownloadPageLink(null);
   }
  return (
    <div className=" flex flex-col items-center justify-center">
   
      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
         { !downloadPageLink && <DropZoneComponents setFile={ setFile } />}
        {file && (
        <FileDetails file={{ 
          format: file.type.split("/")[1],
          name: file.name, 
          sizeInBytes: file.size
         }}
         />
        )}
        {
        !downloadPageLink && file &&(
        <button onClick={handelUpload} className="button">{uploadState}</button>
        )}
        { downloadPageLink && (
         <div className="p-2 text-center">
           <DownloadFile downloadPageLink={downloadPageLink}/>
           <button onClick={resetComponent} className="button">Upload New File</button>
         </div> 
        )}
      </div>
    </div>
  );
}
