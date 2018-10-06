import { createSelector } from 'reselect'

const scores = state => state.scores
const users = state => state.users
const leaderboardUids = state => state.scores.leaderboardUids

export const getLeaders = createSelector(
  [scores, users, leaderboardUids],
  (getScores, getUsers, uids) =>
    uids.map(uid => ({
      score: getScores.usersScores[uid],
      ...getUsers[uid],
    }))
)
