import { IssueLogger } from '@core/processing/issues/issue-logger';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { IssuesService } from '@core/processing/issues/issues.service';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { LoggerService } from '@utils/loggers/logger.service';
import { createHydratedMock } from 'ts-auto-mock';
import { MockedObjectDeep } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);
jest.mock(`@core/processing/issues/issue-processor`);
jest.mock(`@core/processing/issues/issue-logger`);

describe(`IssuesService`, (): void => {
  let service: IssuesService;

  beforeEach((): void => {
    service = IssuesService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a IssuesService`, (): void => {
      expect.assertions(1);

      service = IssuesService.getInstance();

      expect(service).toStrictEqual(expect.any(IssuesService));
    });

    it(`should return the created IssuesService`, (): void => {
      expect.assertions(1);

      const result = IssuesService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`process()`, (): void => {
    let processBatchSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      processBatchSpy = jest.spyOn(service, `processBatch`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should process the batches of issues`, async (): Promise<void> => {
      expect.assertions(2);

      await service.process();

      expect(processBatchSpy).toHaveBeenCalledTimes(1);
      expect(processBatchSpy).toHaveBeenCalledWith();
    });

    it(`should log when all the issues were processed`, async (): Promise<void> => {
      expect.assertions(2);

      await service.process();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceInfoSpy).toHaveBeenCalledWith(`green-All the issues were processed`);
    });
  });

  describe(`processBatch()`, (): void => {
    const mockedIssueProcessor: MockedObjectDeep<typeof IssueProcessor> = mocked(IssueProcessor, true);
    const mockedIssueLogger: MockedObjectDeep<typeof IssueLogger> = mocked(IssueLogger, true);

    let githubApiIssuesServiceFetchIssuesSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;
    let processBatchSpy: jest.SpyInstance;
    let issuesStatisticsServiceIncreaseProcessedIssuesCountSpy: jest.SpyInstance;

    beforeEach((): void => {
      mockedIssueProcessor.mockClear();
      mockedIssueLogger.mockClear();

      githubApiIssuesServiceFetchIssuesSpy = jest.spyOn(GithubApiIssuesService, `fetchIssues`).mockResolvedValue(
        createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [],
            },
          },
        })
      );
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      processBatchSpy = jest.spyOn(service, `processBatch`);
      issuesStatisticsServiceIncreaseProcessedIssuesCountSpy = jest
        .spyOn(IssuesStatisticsService.getInstance(), `increaseProcessedIssuesCount`)
        .mockImplementation();
    });

    it(`should log about the fetch of this batch of issues`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        1,
        `Fetching the batch of issues`,
        `white-#value-1whiteBright-...`
      );
    });

    it(`should fetch the issues to process`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch(1);

      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledTimes(1);
      expect(githubApiIssuesServiceFetchIssuesSpy).toHaveBeenCalledWith(undefined);
    });

    describe(`when one issue was fetched in this batch`, (): void => {
      let gitHubApiIssue: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
        mockedIssueLogger.mockClear();
        gitHubApiIssue = createHydratedMock<IGithubApiIssue>({
          number: 8,
        });
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
      });

      it(`should log about the successful fetch of issue for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-1`,
          `whiteBright-issue in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed issues statistic by 1`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(1);
        expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the issue`, async (): Promise<void> => {
        expect.assertions(6);

        await service.processBatch();

        expect(mockedIssueProcessor).toHaveBeenCalledTimes(1);
        expect(mockedIssueProcessor).toHaveBeenCalledWith(gitHubApiIssue, mockedIssueLogger.mock.instances[0]);
        expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(1);
        expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
        expect(mockedIssueLogger).toHaveBeenCalledTimes(1);
        expect(mockedIssueLogger).toHaveBeenCalledWith(8);
      });
    });

    describe(`when two issues were fetched in this batch`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueProcessor.mockClear();
        mockedIssueLogger.mockClear();
        gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>({
          number: 1,
        });
        gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>({
          number: 2,
        });
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue1, gitHubApiIssue2],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
      });

      it(`should log about the successful fetch of issues for this batch`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Found`,
          `value-2`,
          `whiteBright-issues in the batch`,
          `white-#value-1`
        );
      });

      it(`should increase the counter of processed issues statistic by 2`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledTimes(2);
        expect(issuesStatisticsServiceIncreaseProcessedIssuesCountSpy).toHaveBeenCalledWith();
      });

      it(`should process the two issues`, async (): Promise<void> => {
        expect.assertions(9);

        await service.processBatch();

        expect(mockedIssueProcessor).toHaveBeenCalledTimes(2);
        expect(mockedIssueProcessor).toHaveBeenNthCalledWith(1, gitHubApiIssue1, mockedIssueLogger.mock.instances[0]);
        expect(mockedIssueProcessor).toHaveBeenNthCalledWith(2, gitHubApiIssue2, mockedIssueLogger.mock.instances[1]);
        expect(mockedIssueProcessor.prototype.process.mock.calls).toHaveLength(2);
        expect(mockedIssueProcessor.prototype.process.mock.calls[0]).toHaveLength(0);
        expect(mockedIssueProcessor.prototype.process.mock.calls[1]).toHaveLength(0);
        expect(mockedIssueLogger).toHaveBeenCalledTimes(2);
        expect(mockedIssueLogger).toHaveBeenNthCalledWith(1, 1);
        expect(mockedIssueLogger).toHaveBeenNthCalledWith(2, 2);
      });
    });

    it(`should log the end of the batch processing`, async (): Promise<void> => {
      expect.assertions(2);

      await service.processBatch();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
        3,
        `green-Batch of issues`,
        `white-#value-1`,
        `green-processed`
      );
    });

    describe(`when this batch does not contains more issues to process`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        mockedIssueLogger.mockClear();
        gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
        gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue1, gitHubApiIssue2],
              pageInfo: {
                endCursor: undefined,
                hasNextPage: false,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy.mockResolvedValue(githubApiIssues);
      });

      it(`should log about the success of the process of all the issues`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(4);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `green-All the issues batches were processed`);
      });
    });

    describe(`when this batch contains more issues to process`, (): void => {
      let gitHubApiIssue1: IGithubApiIssue;
      let gitHubApiIssue2: IGithubApiIssue;
      let githubApiIssues: IGithubApiGetIssues;

      beforeEach((): void => {
        gitHubApiIssue1 = createHydratedMock<IGithubApiIssue>();
        gitHubApiIssue2 = createHydratedMock<IGithubApiIssue>();
        githubApiIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: [gitHubApiIssue1, gitHubApiIssue2],
              pageInfo: {
                endCursor: `dummy-end-cursor`,
                hasNextPage: true,
              },
            },
          },
        });

        githubApiIssuesServiceFetchIssuesSpy
          .mockResolvedValue(
            createHydratedMock<IGithubApiGetIssues>({
              repository: {
                issues: {
                  nodes: [],
                  pageInfo: {
                    endCursor: undefined,
                    hasNextPage: false,
                  },
                },
              },
            })
          )
          .mockResolvedValueOnce(githubApiIssues);
      });

      it(`should log about the need of creating a new batch to process the next issues`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(8);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(4, `Continuing with the next batch of issues`);
      });

      it(`should process the next batch of issues`, async (): Promise<void> => {
        expect.assertions(2);

        await service.processBatch();

        expect(processBatchSpy).toHaveBeenCalledTimes(2);
        expect(processBatchSpy).toHaveBeenNthCalledWith(2, 2, `dummy-end-cursor`);
      });
    });
  });
});