import mongoose,{Document} from 'mongoose';
import logging from '../config/logging';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename:{
        type: 'string',
        required: true
    },
    secure_url:{
        type: 'string',
        required: true
    },
    format:{
        type: 'string',
        required: true
    },
    sizeInBytes:{
        type: 'string',
        required: true
    },
    sender:{
        type: 'string', 
    },
    receiver:{
        type: 'string',
    },
   },
   {
    timestamps:true,
   }
)

interface IFile extends Document {
    filename: string;
    secure_url: string;
    sizeInBytes: string;
    format: string;
    sender?: string;
    receiver?: string;
}

fileSchema.post<IFile>('save', function () {
    logging.info('Mongo', 'Checkout the File we just saved: ', this);
});

export default mongoose.model<IFile>("File",fileSchema)