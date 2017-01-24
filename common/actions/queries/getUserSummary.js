import {STAT_DESCRIPTORS} from 'src/common/models/stat'

export default function getUserSummary(identifier) {
  return {
    variables: {identifier},
    query: `query ($identifier: String!) {
      getUserSummary(identifier: $identifier) {
        user {
          id
          phone
          email
          name
          handle
          avatarUrl
          profileUrl
          timezone
          active
          createdAt
          updatedAt
          chapter {
            id
            name
          }
          stats {
            ${STAT_DESCRIPTORS.EXPERIENCE_POINTS}
            ${STAT_DESCRIPTORS.RATING_ELO}
          }
        }
        userProjectSummaries {
          project {
            id
            name
            cycle {
              state
              startTimestamp
              endTimestamp
            }
            goal {
              title
            }
            stats {
              ${STAT_DESCRIPTORS.PROJECT_COMPLETENESS}
              ${STAT_DESCRIPTORS.PROJECT_HOURS}
              ${STAT_DESCRIPTORS.PROJECT_QUALITY}
            }
          }
          userProjectEvaluations {
            ${STAT_DESCRIPTORS.GENERAL_FEEDBACK}
          }
          userProjectStats {
            ${STAT_DESCRIPTORS.CULTURE_CONTRIBUTION}
            ${STAT_DESCRIPTORS.EXPERIENCE_POINTS}
            ${STAT_DESCRIPTORS.FLEXIBLE_LEADERSHIP}
            ${STAT_DESCRIPTORS.FRICTION_REDUCTION}
            ${STAT_DESCRIPTORS.PROJECT_HOURS}
            ${STAT_DESCRIPTORS.RATING_ELO}
            ${STAT_DESCRIPTORS.RECEPTIVENESS}
            ${STAT_DESCRIPTORS.RELATIVE_CONTRIBUTION}
            ${STAT_DESCRIPTORS.RESULTS_FOCUS}
            ${STAT_DESCRIPTORS.TEAM_PLAY}
            ${STAT_DESCRIPTORS.TECHNICAL_HEALTH}
          }
        }
      }
    }`,
  }
}