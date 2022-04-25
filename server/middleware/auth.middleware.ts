import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.admin || process.env.NODE_ENV === "development") {
		return next()
	}
    return res.status(500).json({ message: 'Нет прав для осуществления операции' })
}

export default authMiddleware