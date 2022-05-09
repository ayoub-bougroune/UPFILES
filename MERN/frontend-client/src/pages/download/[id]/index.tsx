import FileDetails from '@components/FileDetails';
import axios from 'axios'
import { IFile } from 'libs/types';
import { GetServerSidePropsContext, NextPage } from 'next'
import fileDownload from 'js-file-download'
import React from 'react'

const index: NextPage<{
  file:IFile;
}> = ({ file: { format, name, sizeInBytes, id } }) => {
  const handlDowload = async () => {
    try {
      const {data} = await axios.get(`http://localhost:8000/api/files/${id}/download`,{
        responseType: "blob",
      });
     fileDownload(data, name)
   }catch (error) {
      console.error(error.response.data);
     
   }
  }
  return (
     <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-xl w-96">
      {!id ? (
        <span>File Does Not Exist! check the URL</span> 
      ) : (
      <> 
        <img src="/images/file-download.png" alt="" className="w-16 h-16"/>
        <h1 className="text-xl">Your File Download</h1>
        <FileDetails file={{ format, name, sizeInBytes }} />
        <button className="button" onClick={handlDowload}>Download</button>
      </>
      )}
    </div>
  );
};

export default index

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const {id} = context.query
  let file;
  try {
     const {data} = await axios.get(`http://localhost:8000/api/files/${id}`)
     file = data;
  }catch (error) {
     console.error(error.response.data);
     file = {};
  }
  return {
    props: {
      file,
    }, 
  }
}
