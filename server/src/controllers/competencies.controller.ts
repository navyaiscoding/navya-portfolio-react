import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { coreCompetencies } from '../data/coreCompetencies.js'
import type { CompetenciesResponse } from '../types/competencies.js'

export async function getCompetencies(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ ok: true, competencies: coreCompetencies as CompetenciesResponse['competencies'] })
  } catch (err) {
    console.error('getCompetencies failed:', err)
    next(new ApiError(502, 'Failed to get competencies — please try again shortly.'))
  }
}