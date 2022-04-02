import { IAllInputs } from '@core/inputs/types/all-inputs';
import faker from 'faker';

export const TEST_DEFAULT_INPUTS: IAllInputs = {
  dryRun: false,
  githubToken: faker.datatype.uuid(),
  issueAddLabelsAfterClose: [],
  issueAddLabelsAfterStale: [],
  issueCloseComment: `close-comment`,
  issueDaysBeforeClose: 10,
  issueDaysBeforeStale: 30,
  issueIgnoreAllAssignees: false,
  issueIgnoreAllLabels: false,
  issueIgnoreAllProjectCards: false,
  issueIgnoreAnyAssignees: [`issue-ignore-any-assignee-1`, `issue-ignore-any-assignee-2`],
  issueIgnoreAnyLabels: [`issue-ignore-any-label-1`, `issue-ignore-any-label-2`],
  issueIgnoreAnyMilestones: [`issue-ignore-any-milestone-1`, `issue-ignore-any-milestone-2`],
  issueIgnoreAnyProjectCards: [`issue-ignore-any-project-card-1`, `issue-ignore-any-project-card-2`],
  issueIgnoreBeforeCreationDate: ``,
  issueLimitApiMutationsCount: -1,
  issueLimitApiQueriesCount: -1,
  issueOnlyAnyMilestones: [],
  issueOnlyAnyProjectCards: [],
  issueProcessing: true,
  issueStaleComment: `stale-comment`,
  issueStaleLabel: `stale`,
  pullRequestAddLabelsAfterClose: [],
  pullRequestAddLabelsAfterStale: [],
  pullRequestCloseComment: `close-comment`,
  pullRequestDaysBeforeClose: 10,
  pullRequestDaysBeforeStale: 30,
  pullRequestDeleteBranchAfterClose: false,
  pullRequestIgnoreAllAssignees: false,
  pullRequestIgnoreAllLabels: false,
  pullRequestIgnoreAllProjectCards: false,
  pullRequestIgnoreAnyAssignees: [`pull-request-ignore-any-assignee-1`, `pull-request-ignore-any-assignee-2`],
  pullRequestIgnoreAnyLabels: [`pull-request-ignore-any-label-1`, `pull-request-ignore-any-label-2`],
  pullRequestIgnoreAnyProjectCards: [
    `pull-request-ignore-any-project-card-1`,
    `pull-request-ignore-any-project-card-2`,
  ],
  pullRequestIgnoreBeforeCreationDate: ``,
  pullRequestIgnoreDraft: false,
  pullRequestLimitApiMutationsCount: -1,
  pullRequestLimitApiQueriesCount: -1,
  pullRequestOnlyAnyMilestones: [],
  pullRequestOnlyAnyProjectCards: [],
  pullRequestProcessing: true,
  pullRequestStaleComment: `stale-comment`,
  pullRequestStaleLabel: `stale`,
  pullRequestToDraftInsteadOfStale: false,
};
