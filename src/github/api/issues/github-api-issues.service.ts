import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/github-api-issues-query';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/github-issues-per-page';
import { IGithubApiIssues } from '@github/api/issues/interfaces/github-api-issues.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { context } from '@actions/github';
import _ from 'lodash';

export class GithubApiIssuesService {
  public static readonly issuesPerPage = GITHUB_ISSUES_PER_PAGE;

  public static fetchIssues(fromPageId?: Readonly<string>): Promise<IGithubApiIssues> | never {
    LoggerService.info(`Fetching the issues from GitHub...`);

    return OctokitService.getOctokit()
      .graphql<IGithubApiIssues>(GITHUB_API_ISSUES_QUERY, {
        afterCursor: fromPageId,
        issuesPerPage: GithubApiIssuesService.issuesPerPage,
        owner: context.repo.owner,
        repository: context.repo.repo,
      })
      .then((response: Readonly<IGithubApiIssues>): IGithubApiIssues => {
        // Only log the first time (when we do not have some pagination yet)
        if (!fromPageId) {
          const { totalCount } = response.repository.issues;

          if (totalCount === 0) {
            LoggerService.notice(`No issue can be processed`);
          } else {
            LoggerService.info(
              LoggerFormatService.cyan(_.toString(totalCount)),
              LoggerFormatService.whiteBright(`issue${totalCount > 1 ? `s` : ``} can be processed`)
            );
          }
        }

        return response;
      })
      .catch((error: Readonly<Error>): never => {
        LoggerService.error(`Failed to fetch the issues`);

        throw error;
      });
  }
}
