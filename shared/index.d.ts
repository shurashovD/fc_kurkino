import { Types, Date } from 'mongoose'

export interface ITeam {
	_id: string | Types.ObjectId
	archived: boolean
	title: string
	city: string
	logo?: string
}

export interface IMatch {
	_id: string | Types.ObjectId
	archived: boolean
	date: Date | string
	homeTeam: ITeam
	guestTeam: ITeam
	place?: string
	homeTeamScore?: number
	guestTeamScore?: number
	photo?: string[]
	video?: string[]
}

export interface ICoach {
	_id: string | Types.ObjectId
	archived: boolean
	avatar?: string
	name: string
	post?: string
	birthday?: Date | string
}

export interface IFootballer {
	_id: string | Types.ObjectId
	archived: boolean
	avatar?: string
	name: string
	post?: string
	birthday?: Date | string
	number?: number
}

export interface ITeamPayload {
	_id?: string
	title: string
	city: string
}

export interface IMatchPayload {
	_id?: string
	date: Date | string
	homeTeam: string
	guestTeam: string
	place?: string
	homeTeamScore?: number
	guestTeamScore?: number
	photo?: string[]
	video?: string[]
}

export interface IFootballerPayload {
	name: string
	post?: string
	birthday?: Date | string
	number?: number
}

export interface ICoachPayload {
	name: string
	post?: string
	birthday?: Date | string
}

export interface IMatchPhoto {
	_id: Types.ObjectId | string
	title: string
	photo: string
}

export interface IBirthday {
	_id: Types.ObjectId
	name: string
	photo: string
	post: string
	date: string
	today: boolean
}

export interface IMatchPage {
	month: number
	matches: IMatch[]
}

export interface ITeamPage {
	role: string
	footballers: {
		id: string
		name: string
		number?: number
		photo?: string
		description?: string
	}[]
}

export interface INewsInitialState {
	date?: string
	link?: string
	title?: string
}

declare module "express-session" {
	interface SessionData {
		admin: boolean
	}
}

declare module "*.png" {
	const value: string
	export default value
}

declare module "*.jpg" {
	const value: string
	export default value
}

declare module "*.svg" {
	const value: string
	export default value
}