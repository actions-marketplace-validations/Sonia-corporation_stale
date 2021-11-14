import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiLabelsService } from '@github/api/labels/github-api-labels.service';
import { IGithubApiLabels } from '@github/api/labels/interfaces/github-api-labels.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to stale an issue
 */
export class IssueStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldStale(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue should be stale...`);

    return this.isStaleByUpdateDate$$();
  }

  public async stale(): Promise<void> {
    this.issueProcessor.logger.info(`Adding the stale state to this issue...`);

    const { issueStaleLabel } = InputsService.getInputs();

    this.issueProcessor.logger.info(
      `Fetching the stale label`,
      LoggerService.value(issueStaleLabel),
      LoggerFormatService.whiteBright(`to add on this issue...`)
    );

    const label: IGithubApiLabels = await GithubApiLabelsService.fetchLabelByName(issueStaleLabel);

    this.issueProcessor.logger.info(`The stale label was fetched`);
    this.issueProcessor.logger.info(`Adding the stale label to this issue...`);

    if (!InputsService.getInputs().dryRun) {
      await GithubApiLabelsService.addLabelToIssue(
        this.issueProcessor.githubIssue.id,
        label.repository.labels.nodes[0].id
      );

      this.issueProcessor.logger.info(`The stale label was added`);
    } else {
      this.issueProcessor.logger.info(`The stale label was not added due to the dry-run mode`);
    }

    this.issueProcessor.logger.notice(`The issue is now stale`);
  }

  public isStaleByUpdateDate$$(): boolean {
    this.issueProcessor.logger.info(`Checking if the issue should be stale based on the update date...`);

    const updatedAt: DateTime = this.issueProcessor.getUpdatedAt();

    this.issueProcessor.logger.info(`The issue was updated for the last time the`, LoggerService.date(updatedAt));

    const numberOfDaysBeforeStale: number = InputsService.getInputs().issueDaysBeforeStale;
    const daysDifference: number = DateTime.now().diff(updatedAt, `days`, {
      conversionAccuracy: `longterm`,
    }).days;
    const isStale: boolean = daysDifference > numberOfDaysBeforeStale;

    if (isStale) {
      this.issueProcessor.logger.info(
        `The issue should be stale since it was not updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    } else {
      this.issueProcessor.logger.info(
        `The issue should not be stale since it was updated in the last`,
        LoggerService.value(_.toString(numberOfDaysBeforeStale)),
        LoggerFormatService.whiteBright(`day${numberOfDaysBeforeStale > 1 ? `s` : ``}`)
      );
    }

    this.issueProcessor.logger.debug(
      `The difference is`,
      LoggerService.value(_.toString(daysDifference)),
      LoggerFormatService.whiteBright(`day${daysDifference > 1 ? `s` : ``}`)
    );

    return isStale;
  }
}
