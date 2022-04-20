import { IFootballer } from './../../shared/index.d';
import { model, Model, Schema } from 'mongoose'

const FootballerSchema = new Schema<IFootballer, Model<IFootballer>>({
    archived: { type: Boolean, default: false },
    avatar: String,
    birthday: Date,
    name: { type: String, required: true, unique: true },
    number: Number,
    post: String
})

const FootballerModel = model('Footballer', FootballerSchema)

export default FootballerModel