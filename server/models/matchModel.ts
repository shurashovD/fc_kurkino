import { IMatch } from '../../shared';
import { model, Model, Schema, Types } from 'mongoose'

const MatchSchema = new Schema<IMatch, Model<IMatch>>({
	archived: { type: Boolean, default: false },
	date: { type: Date, required: true },
	guestTeam: { type: Types.ObjectId, ref: "Team", required: true },
	homeTeam: { type: Types.ObjectId, ref: "Team", required: true },
	place: String,
	photo: [String],
	homeTeamScore: Number,
	guestTeamScore: Number,
	video: [String]
})

const MatchModel = model("Match", MatchSchema)

export default MatchModel