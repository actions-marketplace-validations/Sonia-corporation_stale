import { StatisticsService } from '@core/statistics/statistics.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue to close comment`, (): void => {
  let issueSut: FakeIssuesProcessor;

  describe(`when the issue should be commented when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueCloseComment: `close-comment`,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
      })
        .addIssue({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.utc(2021).toISO({
            includeOffset: false,
          }), // No update since last stale
        })
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt: DateTime.utc(2021).toISO({
                            includeOffset: false,
                          }), // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    it(`should close the issue and add a close comment`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(1);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closedIssuesCount$$).toBe(1);
      expect(StatisticsService.addedIssuesCommentsCount$$).toBe(1);
    });
  });

  describe(`when the issue should not be commented when closed`, (): void => {
    beforeEach((): void => {
      issueSut = new FakeIssuesProcessor({
        issueCloseComment: ``,
        issueDaysBeforeClose: 10,
        issueDaysBeforeStale: 30,
      })
        .addIssue({
          labels: {
            nodes: [
              createHydratedMock<IGithubApiLabel>({
                name: `stale`, // Already stale
              }),
            ],
            totalCount: 1,
          },
          locked: false,
          updatedAt: DateTime.utc(2021).toISO({
            includeOffset: false,
          }), // No update since last stale
        })
        .mockTimelineItemsIssueLabeledEventQuery(
          (): Promise<IGithubApiTimelineItemsIssueLabeledEvents> =>
            Promise.resolve(
              createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                repository: {
                  issue: {
                    timelineItems: {
                      filteredCount: 1,
                      nodes: [
                        {
                          createdAt: DateTime.utc(2021).toISO({
                            includeOffset: false,
                          }), // Last stale
                          label: createHydratedMock<IGithubApiLabel>({
                            name: `stale`,
                          }),
                        },
                      ],
                      pageCount: 1,
                    },
                  },
                },
              })
            )
        );
    });

    it(`should close the issue and not add a close comment`, async (): Promise<void> => {
      expect.assertions(8);

      await issueSut.process();

      expect(StatisticsService.processedIssuesCount$$).toBe(1);
      expect(StatisticsService.ignoredIssuesCount$$).toBe(0);
      expect(StatisticsService.unalteredIssuesCount$$).toBe(0);
      expect(StatisticsService.staleIssuesCount$$).toBe(0);
      expect(StatisticsService.alreadyStaleIssuesCount$$).toBe(1);
      expect(StatisticsService.removeStaleIssuesCount$$).toBe(0);
      expect(StatisticsService.closedIssuesCount$$).toBe(1);
      expect(StatisticsService.addedIssuesCommentsCount$$).toBe(0);
    });
  });
});