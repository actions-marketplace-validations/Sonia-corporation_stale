import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { StatisticsService } from '@core/statistics/statistics.service';
import { GithubApiCommentsService } from '@github/api/comments/github-api-comments.service';
import { LoggerService } from '@utils/loggers/logger.service';

export class IssueCommentsProcessor {
  public readonly issueProcessor: IssueProcessor;
  public readonly githubApiCommentsService$$: GithubApiCommentsService;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
    this.githubApiCommentsService$$ = new GithubApiCommentsService(this.issueProcessor);
  }

  public async processStaleComment(): Promise<void> {
    this.issueProcessor.logger.info(`Checking if a stale comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInputs();
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInputs();

    if (commonInputs.issueStaleComment === ``) {
      this.issueProcessor.logger.info(`The stale comment is unset. Continuing...`);

      return;
    }

    this.issueProcessor.logger.info(`The stale comment is set to`, LoggerService.value(issuesInputs.issueStaleComment));

    if (!commonInputs.dryRun) {
      this.issueProcessor.logger.info(`Adding the stale comment...`);

      await this.githubApiCommentsService$$.addCommentToIssue(
        this.issueProcessor.githubIssue.id,
        issuesInputs.issueStaleComment
      );
    }

    StatisticsService.increaseAddedIssuesCommentsCount();
    this.issueProcessor.logger.notice(`Stale comment added`);
  }

  public async processCloseComment(): Promise<void> {
    this.issueProcessor.logger.info(`Checking if a close comment should be added...`);

    const commonInputs: ICommonInputs = CommonInputsService.getInputs();
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInputs();

    if (issuesInputs.issueCloseComment === ``) {
      this.issueProcessor.logger.info(`The close comment is unset. Continuing...`);

      return;
    }

    this.issueProcessor.logger.info(`The close comment is set to`, LoggerService.value(issuesInputs.issueCloseComment));

    if (!commonInputs.dryRun) {
      this.issueProcessor.logger.info(`Adding the close comment...`);

      await this.githubApiCommentsService$$.addCommentToIssue(
        this.issueProcessor.githubIssue.id,
        issuesInputs.issueCloseComment
      );
    }

    StatisticsService.increaseAddedIssuesCommentsCount();
    this.issueProcessor.logger.notice(`Close comment added`);
  }
}
