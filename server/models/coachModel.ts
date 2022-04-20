import { ICoach } from './../../shared/index.d';
import { model, Model, Schema } from 'mongoose'

const CoachSchema = new Schema<ICoach, Model<ICoach>>({
    archived: { type: Boolean, default: false },
    avatar: String,
    birthday: Date,
    name: { type: String, required: true, unique: true },
    post: String
})

const CoachModel = model('Coach', CoachSchema)

export default CoachModel