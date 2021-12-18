import { IInputs } from '@core/inputs/types/inputs';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IComment } from '@utils/types/comment';

export interface IPullRequestsInputs extends IInputs {
  readonly pullRequestCloseComment: IComment | '';
  readonly pullRequestDaysBeforeClose: number;
  readonly pullRequestDaysBeforeStale: number;
  readonly pullRequestIgnoreAllAssignees: boolean;
  readonly pullRequestIgnoreAllLabels: boolean;
  readonly pullRequestIgnoreAllProjectCards: boolean;
  readonly pullRequestIgnoreAnyAssignees: string[];
  readonly pullRequestIgnoreAnyLabels: string[];
  readonly pullRequestIgnoreBeforeCreationDate: IIso8601Date | '';
  readonly pullRequestStaleComment: IComment | '';
  readonly pullRequestStaleLabel: string;
}