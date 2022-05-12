import { INews } from '../../shared';
import { Schema, Model, model } from 'mongoose';

const newSchema = new Schema<INews, Model<INews>>({
    archived: { type: Boolean, default: false },
    date: { type: Date, required: true },
    photo: { type: String },
    text: String,
    title: { type: String, required: true, unique: true }
})

export default model('New', newSchema)