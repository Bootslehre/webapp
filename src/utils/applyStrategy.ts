import { statsService, type LicenseStats } from '../stores/stats.svelte';
import type { Questionaire } from './licenses';
import { shuffle } from './shuffle';

export type NextQuestionStrategies = 'random' | 'relevance' | 'pinned' | 'incorrect';

export function applyStrategy(strategy: NextQuestionStrategies, questionaire: Questionaire) {
  const stats = statsService.getLicenseStatsSnapshot(questionaire.id);

  switch (strategy) {
    case 'relevance':
      return applyRelevanceStrategy(questionaire, stats);
    case 'pinned':
      return applyPinnedStrategy(questionaire, stats);
    case 'incorrect':
      return applyIncorrectStrategy(questionaire, stats);
    case 'random':
      return applyRandomStrategy(questionaire);
    default:
      return questionaire.questions;
  }
}

function applyRelevanceStrategy(questionaire: Questionaire, stats: LicenseStats) {
  // progress can range from -1 to 5. we ignore the negative values for the next question recommendation calculation
  const questions = questionaire.questions
    .map(question => ({ ...question, progress: Math.max(0, stats?.[question.id]?.progress || 0) }))
    .sort((a, b) => a.progress - b.progress);

  // shuffle a portion of the list for some randomness
  const questionsToShuffle = Math.floor(questions.length * 0.1);
  for (let i = 0; i < questionsToShuffle; i++) {
    const a = Math.floor(Math.random() * questions.length);
    const b = Math.floor(Math.random() * questions.length);
    [questions[a], questions[b]] = [questions[b], questions[a]];
  }

  return questions;
}

function applyRandomStrategy(questionaire: Questionaire) {
  return shuffle(questionaire.questions);
}

function applyPinnedStrategy(questionaire: Questionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].pinned)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}

function applyIncorrectStrategy(questionaire: Questionaire, stats: LicenseStats) {
  const questions = Object.keys(stats)
    .filter((key) => stats[key].progress === 0)
    .map((id) => questionaire.questions.find((q) => q.id === id)!);

  return shuffle(questions);
}
