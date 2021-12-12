import { IAllInputs } from '@core/inputs/types/all-inputs';
import faker from 'faker';

export const TEST_DEFAULT_INPUTS: IAllInputs = {
  dryRun: false,
  githubToken: faker.datatype.uuid(),
  issueCloseComment: `close-comment`,
  issueDaysBeforeClose: 10,
  issueDaysBeforeStale: 30,
  issueIgnoreAllAssignees: false,
  issueIgnoreAllLabels: false,
  issueIgnoreAllProjectCards: false,
  issueIgnoreAnyAssignees: [`issue-ignore-any-assignee-1`, `issue-ignore-any-assignee-2`],
  issueIgnoreAnyLabels: [`issue-ignore-any-label-1`, `issue-ignore-any-label-2`],
  issueIgnoreBeforeCreationDate: ``,
  issueStaleComment: `stale-comment`,
  issueStaleLabel: `stale`,
  pullRequestCloseComment: `close-comment`,
  pullRequestDaysBeforeClose: 10,
  pullRequestDaysBeforeStale: 30,
  pullRequestIgnoreAllAssignees: false,
  pullRequestIgnoreAllLabels: false,
  pullRequestIgnoreAllProjectCards: false,
  pullRequestIgnoreAnyAssignees: [`issue-ignore-any-assignee-1`, `issue-ignore-any-assignee-2`],
  pullRequestIgnoreAnyLabels: [`issue-ignore-any-label-1`, `issue-ignore-any-label-2`],
  pullRequestIgnoreBeforeCreationDate: ``,
  pullRequestStaleComment: `stale-comment`,
  pullRequestStaleLabel: `stale`,
};
