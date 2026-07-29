import { Router } from 'express'
import { getCompetencies } from '../controllers/competencies.controller.js'

export const competenciesRouter = Router()

competenciesRouter.get('/', getCompetencies)