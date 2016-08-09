import {GraphQLNonNull, GraphQLID, GraphQLString, GraphQLBoolean} from 'graphql'
import {GraphQLObjectType, GraphQLEnumType, GraphQLList} from 'graphql/type'

import {GraphQLDateTime} from 'graphql-custom-types'
import {Cycle, cycleResolver} from '../../../../server/graphql/models/Cycle/schema'
import {Project, projectResolver} from '../../../../server/graphql/models/Project/schema'
import {ResponseValueGroup, NamedResponseValueGroup} from '../../../../server/graphql/models/Response/schema'

export const SubjectTypeEnum = new GraphQLEnumType({
  name: 'SubjectTypeEnum',
  values: {
    team: {description: 'A multipart subject requiring responses about each member of a project team'},
    player: {description: 'A player in the game'},
    project: {description: 'A project'},
  }
})

export const ResponseTypeEnum = new GraphQLEnumType({
  name: 'ResponseTypeEnum',
  values: {
    relativeContribution: {description: 'A multipart response whose values must add up to 100%'},
    text: {description: 'A free form text response'},
    likert7Agreement: {description: 'A 0-7 Likert Agreement Scale Response'},
    nonNegativeInt: {description: 'An integer response greater than or equal to 0.'},
  }
})

const CommonSurveyQuestionFields = {
  id: {type: new GraphQLNonNull(GraphQLID), description: 'The id of the question'},
  subjectType: {type: new GraphQLNonNull(SubjectTypeEnum), description: 'The type of the subject '},
  responseType: {type: new GraphQLNonNull(ResponseTypeEnum), description: 'The expected type of the response'},
  body: {type: new GraphQLNonNull(GraphQLString), description: 'The body of the question'},
  responseInstructions: {type: GraphQLString, description: 'Instructions for answering the question'},
}

export const PlayerSubject = new GraphQLObjectType({
  name: 'PlayerSubject',
  description: 'A player that is the subject of a question',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The player\'s UUID'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The player\'s name'
    },
    handle: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The player\'s handle'
    },
    profileUrl: {
      type: GraphQLString,
      description: 'The player\'s profile URL'
    },
    avatarUrl: {
      type: GraphQLString,
      description: 'The player\'s avatar URL'
    },
  })
})

export const SurveyQuestion = new GraphQLObjectType({
  name: 'SurveyQuestion',
  description: 'A survey question',
  fields: () => (Object.assign({},
    CommonSurveyQuestionFields,
    {
      subjects: {
        type: new GraphQLNonNull(new GraphQLList(PlayerSubject)),
        description: 'The list of subjects this question is asking about',
      },
      response: {
        type: new GraphQLNonNull(ResponseValueGroup),
        description: 'The response to this question',
      },
    }
  ))
})

export const Survey = new GraphQLObjectType({
  name: 'Survey',
  description: 'A survey of questions used for retrospectives',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLID), description: "The survey's user UUID"},
    project: {
      type: Project,
      description: 'The project this survey relates to',
      resolve: projectResolver,
    },
    cycle: {
      type: Cycle,
      description: 'The cycle this survey relates to',
      resolve: cycleResolver,
    },
    questions: {type: new GraphQLNonNull(new GraphQLList(SurveyQuestion)), description: 'The questions for the survey'},
    createdAt: {type: new GraphQLNonNull(GraphQLDateTime), description: 'When this record was created'},
    updatedAt: {type: new GraphQLNonNull(GraphQLDateTime), description: 'When this record was last updated'},
  })
})

export const ProjectReviewSurveyStatus = new GraphQLObjectType({
  name: 'ProjectReviewSurveyStatus',
  description: 'Information about the status of a players project review',
  fields: () => ({
    completed: {type: new GraphQLNonNull(GraphQLBoolean), description: 'True if the player has submitted responses for all the questions on the survey'},
    project: {type: Project, description: 'The project being reviewed'},
    responses: {type: new GraphQLList(NamedResponseValueGroup), description: 'The players responses'}
  })
})
