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
  issueIgnoreBeforeCreationDate: ``,
  issueLimitApiQueriesCount: -1,
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
  pullRequestIgnoreBeforeCreationDate: ``,
  pullRequestIgnoreDraft: false,
  pullRequestProcessing: true,
  pullRequestStaleComment: `stale-comment`,
  pullRequestStaleLabel: `stale`,
  pullRequestToDraftInsteadOfStale: false,
};
