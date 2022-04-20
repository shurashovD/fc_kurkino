import { ITeam } from './../../shared/index.d';
import { model, Model, Schema } from 'mongoose'

const TeamSchema = new Schema<ITeam, Model<ITeam>>({
	archived: { type: Boolean, default: false },
	city: { type: String, required: true },
	logo: String,
	title: { type: String, required: true, unique: true }
})

const TeamModel = model('Team', TeamSchema)

export default TeamModel