import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { GITHUB_API_DELETE_REFERENCE_MUTATION } from '@github/api/references/constants/github-api-delete-reference-mutation';
import { GithubApiPullRequestReferencesService } from '@github/api/references/github-api-pull-request-references.service';
import { OctokitService } from '@github/octokit/octokit.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationErrorPullRequest } from '@utils/annotations/enums/annotation-error-pull-request.enum';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`GithubApiPullRequestReferencesService`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new GithubApiPullRequestReferencesService(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let githubApiPullRequestCommentsService: GithubApiPullRequestReferencesService;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`deleteReference()`, (): void => {
      let referenceId: IUuid;
      let graphqlMock: jest.Mock;

      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;
      let annotationsServiceErrorSpy: jest.SpyInstance;
      let octokitServiceGetOctokitSpy: jest.SpyInstance;
      let pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy: jest.SpyInstance;

      beforeEach((): void => {
        referenceId = faker.datatype.uuid();
        graphqlMock = jest.fn().mockRejectedValue(new Error(`graphql error`));
        githubApiPullRequestCommentsService = new GithubApiPullRequestReferencesService(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
        annotationsServiceErrorSpy = jest.spyOn(AnnotationsService, `error`).mockImplementation();
        octokitServiceGetOctokitSpy = jest.spyOn(OctokitService, `getOctokit`).mockReturnValue({
          // @ts-ignore
          graphql: graphqlMock,
        });
        pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy = jest
          .spyOn(PullRequestsStatisticsService.getInstance(), `increaseCalledApiPullRequestsMutationsCount`)
          .mockImplementation();
      });

      it(`should delete the reference from the pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(githubApiPullRequestCommentsService.deleteReference(referenceId)).rejects.toThrow(
          new Error(`graphql error`)
        );

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledWith(
          `Deleting the reference`,
          `value-${referenceId}`,
          `whiteBright-from this pull request...`
        );
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledTimes(1);
        expect(octokitServiceGetOctokitSpy).toHaveBeenCalledWith();
        expect(graphqlMock).toHaveBeenCalledTimes(1);
        expect(graphqlMock).toHaveBeenCalledWith(GITHUB_API_DELETE_REFERENCE_MUTATION, {
          id: referenceId,
        });
      });

      describe(`when the reference failed to be deleted`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockRejectedValue(new Error(`graphql error`));
        });

        it(`should log about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestCommentsService.deleteReference(referenceId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Failed to delete the reference`,
            `value-${referenceId}`,
            `red-from this pull request`
          );
        });

        it(`should annotate about the error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(githubApiPullRequestCommentsService.deleteReference(referenceId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(annotationsServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(annotationsServiceErrorSpy).toHaveBeenCalledWith(EAnnotationErrorPullRequest.FAILED_DELETE_REFERENCE);
        });

        it(`should rethrow`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(githubApiPullRequestCommentsService.deleteReference(referenceId)).rejects.toThrow(
            new Error(`graphql error`)
          );
        });

        it(`should not increase the statistic regarding the API pull requests mutations calls`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(githubApiPullRequestCommentsService.deleteReference(referenceId)).rejects.toThrow(
            new Error(`graphql error`)
          );

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the reference was successfully deleted`, (): void => {
        beforeEach((): void => {
          graphqlMock.mockResolvedValue({});
        });

        it(`should log about the success of the deletion`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestCommentsService.deleteReference(referenceId);

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `green-Reference`,
            `value-${referenceId}`,
            `green-deleted for this pull request`
          );
        });

        it(`should increase the statistic regarding the API pull requests mutations calls by 1`, async (): Promise<void> => {
          expect.assertions(2);

          await githubApiPullRequestCommentsService.deleteReference(referenceId);

          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestsStatisticsServiceIncreaseCalledApiPullRequestsMutationsCountSpy).toHaveBeenCalledWith();
        });
      });
    });
  });
});
