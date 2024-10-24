import { SBF } from '../../generated'
import type { Question } from "../types"

export function getRandomQuestion(): Question {
    return SBF.questions.at(Math.round(Math.random() * SBF.questions.length)) as Question
}