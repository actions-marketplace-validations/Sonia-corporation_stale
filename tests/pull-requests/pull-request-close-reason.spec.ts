import { ECloseReason } from '@core/inputs/enums/close-reason.enum';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { FakePullRequestsProcessor } from '@tests/utils/fake-pull-requests-processor';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Pull request to close`, (): void => {
  let pullRequestSut: FakePullRequestsProcessor;
  let closeReason: ECloseReason;

  describe(`when the input "issue-close-reason" is set to completed`, (): void => {
    beforeEach((): void => {
      closeReason = ECloseReason.COMPLETED;
    });

    describe(`when a pull request is stale and was not recently updated`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestCloseReason: closeReason,
          pullRequestDaysBeforeClose: 10,
          pullRequestDaysBeforeStale: 30,
          pullRequestStaleLabel: `stale`,
        })
          .addPullRequest({
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
          .mockTimelineItemsPullRequestLabeledEventQuery(
            (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
              Promise.resolve(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
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

      it(`should close the pull request with the completed reason`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsMutationsCount: 2,
          calledApiPullRequestsQueriesCount: 2,
          closedPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });

  describe(`when the input "issue-close-reason" is set to not planned`, (): void => {
    beforeEach((): void => {
      closeReason = ECloseReason.NOT_PLANNED;
    });

    describe(`when a pull request is stale and was not recently updated`, (): void => {
      beforeEach((): void => {
        pullRequestSut = new FakePullRequestsProcessor({
          pullRequestCloseReason: closeReason,
          pullRequestDaysBeforeClose: 10,
          pullRequestDaysBeforeStale: 30,
          pullRequestStaleLabel: `stale`,
        })
          .addPullRequest({
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
          .mockTimelineItemsPullRequestLabeledEventQuery(
            (): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> =>
              Promise.resolve(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
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

      it(`should close the pull request with the not planned reason`, async (): Promise<void> => {
        expect.assertions(13);

        await pullRequestSut.process();

        pullRequestSut.expect({
          addedPullRequestsCommentsCount: 1,
          alreadyStalePullRequestsCount: 1,
          calledApiPullRequestsMutationsCount: 2,
          calledApiPullRequestsQueriesCount: 2,
          closedPullRequestsCount: 1,
          processedPullRequestsCount: 1,
        });
      });
    });
  });
});