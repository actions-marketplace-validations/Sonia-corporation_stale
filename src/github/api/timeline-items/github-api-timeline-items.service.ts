import { IssueProcessor } from '@core/issues/issue-processor';
import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';

export class GithubApiTimelineItemsService {
  public readonly issueProcessor: IssueProcessor;
  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>, pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.issueProcessor = issueProcessor;
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public fetchIssueAddedLabels(
    issueNumber: Readonly<IGithubApiIssueNumber>
  ): Promise<IGithubApiTimelineItemsIssueLabeledEvents> | never {
    this.issueProcessor.logger.info(
      `Fetching the added labels events on the issue`,
      LoggerService.value(issueNumber),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiTimelineItemsIssueLabeledEvents>(GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY, {
        issueNumber,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then(
        (
          response: Readonly<IGithubApiTimelineItemsIssueLabeledEvents>
        ): IGithubApiTimelineItemsIssueLabeledEvents | never => {
          const { filteredCount, pageCount } = response.repository.issue.timelineItems;

          if (pageCount === 0) {
            this.issueProcessor.logger.error(
              `Could not find a single added label event for the issue`,
              LoggerService.value(issueNumber)
            );
            throw new Error(`Could not find a single added label event for the issue ${issueNumber}`);
          }

          // @todo handle the pagination
          if (filteredCount > pageCount) {
            this.issueProcessor.logger.error(
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            throw new Error(`Reached the maximum number of added label events supported for now`);
          }

          this.issueProcessor.logger.info(
            LoggerFormatService.green(`Found`),
            LoggerService.value(pageCount),
            LoggerFormatService.green(`added label event${pageCount > 1 ? `s` : ``}`)
          );

          return response;
        }
      )
      .catch((error: Readonly<Error>): never => {
        this.issueProcessor.logger.error(
          `Failed to fetch the added labels events on the issue`,
          LoggerService.value(issueNumber)
        );

        throw error;
      });
  }

  public fetchPullRequestAddedLabels(
    pullRequestNumber: Readonly<IGithubApiPullRequestNumber>
  ): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> | never {
    this.pullRequestProcessor.logger.info(
      `Fetching the added labels events on the pull request`,
      LoggerService.value(pullRequestNumber),
      LoggerFormatService.whiteBright(`from GitHub...`)
    );

    return OctokitService.getOctokit()
      .graphql<IGithubApiTimelineItemsPullRequestLabeledEvents>(
        GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY,
        {
          pullRequestNumber,
          owner: context.repo.owner,
          repository: context.repo.repo,
        }
      )
      .then(
        (
          response: Readonly<IGithubApiTimelineItemsPullRequestLabeledEvents>
        ): IGithubApiTimelineItemsPullRequestLabeledEvents | never => {
          const { filteredCount, pageCount } = response.repository.pullRequest.timelineItems;

          if (pageCount === 0) {
            this.pullRequestProcessor.logger.error(
              `Could not find a single added label event for the pull request`,
              LoggerService.value(pullRequestNumber)
            );
            throw new Error(`Could not find a single added label event for the pull request ${pullRequestNumber}`);
          }

          // @todo handle the pagination
          if (filteredCount > pageCount) {
            this.pullRequestProcessor.logger.error(
              `Reached the maximum number of added label events supported for now. The pagination support is not yet implemented!`
            );
            throw new Error(`Reached the maximum number of added label events supported for now`);
          }

          this.pullRequestProcessor.logger.info(
            LoggerFormatService.green(`Found`),
            LoggerService.value(pageCount),
            LoggerFormatService.green(`added label event${pageCount > 1 ? `s` : ``}`)
          );

          return response;
        }
      )
      .catch((error: Readonly<Error>): never => {
        this.pullRequestProcessor.logger.error(
          `Failed to fetch the added labels events on the pull request`,
          LoggerService.value(pullRequestNumber)
        );

        throw error;
      });
  }
}
