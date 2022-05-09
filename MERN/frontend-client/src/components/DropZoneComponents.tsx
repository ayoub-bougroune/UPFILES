import { Dispatch, FunctionComponent, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZoneComponents:FunctionComponent<{setFile:Dispatch<any>}> = ({
    setFile
}) => {
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0])
      }, [])
      const {getRootProps, getInputProps, isDragAccept, isDragReject } = 
      useDropzone({
          onDrop,
          multiple: false,
         // accept: "image/jpeg,image/png,audio/mpeg",
      });
  return (
  <div className="w-full p-4">
    <div {...getRootProps()} className="w-full h-80 rounded-md cursor-pointer focus:outline-none">
        <input {...getInputProps()} />
        <div className={
            "flex flex-col items-center justify-center h-full space-y-3  border-2 border-dashed border-yellow-light rounded-xl"
            + (isDragReject === true ? "border-red-500": "") +
              (isDragAccept === true ? "border-green-500": "")
            }>
            <img src="/images/folder.png" alt="folder" className="w-16 h-16" />
            {isDragReject ? (
                <p> rejected ,we accept Only images and mp3</p>
            ) : (
            <>
                <p>Drop the files here</p>
                <p className="mt-2 text-base text-gray-300">
                    Only jpeg , png and mp3 files are supported
                </p>
            </>
            )}
        </div>
    </div>
  </div>  
  )
}

export default DropZoneComponents
