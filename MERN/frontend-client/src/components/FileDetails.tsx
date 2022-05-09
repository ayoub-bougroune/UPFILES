import { sizeInMB } from 'libs/sizeInMB'
import { IFile } from 'libs/types'
import { FunctionComponent } from 'react'

const FileDetails:FunctionComponent<{file:IFile}> = ({file: { name, sizeInBytes, format}}) => {
  return (
    <div className="flex items-center w-full p-4 my-2">
        <img src={`/images/${format}.png`} alt="" className="w-14 h-14"/>
        <span className="mx-2">{name}</span>
        <span className="ml-auto">{sizeInMB(sizeInBytes)}</span>
    </div>
  )
}

export default FileDetails