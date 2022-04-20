import { model, Model, Schema, Types } from 'mongoose'

interface IUser {
    _id: Types.ObjectId
    login: string
    pass: string
}

const UserSchema = new Schema<IUser, Model<IUser>>({
    login: { type: String, required: true, unique: true },
    pass: { type: String, required: true }
})

const UserModel = model('User', UserSchema)

export default UserModel