import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestIncludeProcessor } from '@core/processing/pull-requests/pull-request-include-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningPullRequest } from '@utils/annotations/enums/annotation-warning-pull-request.enum';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestIncludeProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestIncludeProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestIncludeProcessor: PullRequestIncludeProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldInclude()`, (): void => {
      let shouldIncludeAnyWhiteListedProjectCard$$Spy: jest.SpyInstance;
      let shouldIncludeAnyWhiteListedMilestone$$Spy: jest.SpyInstance;
      let shouldIncludeAnyWhiteListedAssignee$$Spy: jest.SpyInstance;
      let shouldIncludeAnyAssignee$$Spy: jest.SpyInstance;
      let shouldIncludeAnyMilestone$$Spy: jest.SpyInstance;
      let shouldIncludeAnyProjectCard$$Spy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        shouldIncludeAnyWhiteListedProjectCard$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyWhiteListedProjectCard$$`)
          .mockImplementation();
        shouldIncludeAnyWhiteListedMilestone$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyWhiteListedMilestone$$`)
          .mockImplementation();
        shouldIncludeAnyWhiteListedAssignee$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyWhiteListedAssignee$$`)
          .mockImplementation();
        shouldIncludeAnyAssignee$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyAssignee$$`)
          .mockImplementation();
        shouldIncludeAnyMilestone$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyMilestone$$`)
          .mockImplementation();
        shouldIncludeAnyProjectCard$$Spy = jest
          .spyOn(pullRequestIncludeProcessor, `shouldIncludeAnyProjectCard$$`)
          .mockImplementation();
      });

      it(`should check if the pull request should be processed because she belongs to any of the white-listed project card`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldInclude();

        expect(shouldIncludeAnyWhiteListedProjectCard$$Spy).toHaveBeenCalledTimes(1);
        expect(shouldIncludeAnyWhiteListedProjectCard$$Spy).toHaveBeenCalledWith();
      });

      describe(`when the pull request belongs to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCard$$Spy.mockReturnValue(true);
        });

        it(`should check if the pull request should be processed because she belongs to any of the white-listed milestone`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldInclude();

          expect(shouldIncludeAnyWhiteListedMilestone$$Spy).toHaveBeenCalledTimes(1);
          expect(shouldIncludeAnyWhiteListedMilestone$$Spy).toHaveBeenCalledWith();
        });

        describe(`when the pull request belongs to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestone$$Spy.mockReturnValue(true);
          });

          it(`should check if the pull request should be processed because she belongs to any of the white-listed assignee`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldInclude();

            expect(shouldIncludeAnyWhiteListedAssignee$$Spy).toHaveBeenCalledTimes(1);
            expect(shouldIncludeAnyWhiteListedAssignee$$Spy).toHaveBeenCalledWith();
          });

          describe(`when the pull request belongs to any of the white-listed assignee`, (): void => {
            beforeEach((): void => {
              shouldIncludeAnyWhiteListedAssignee$$Spy.mockReturnValue(true);
            });

            it(`should check if the pull request should be processed because she has at least one of assignee`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldInclude();

              expect(shouldIncludeAnyAssignee$$Spy).toHaveBeenCalledTimes(1);
              expect(shouldIncludeAnyAssignee$$Spy).toHaveBeenCalledWith();
            });

            describe(`when the pull request has at least one assignee`, (): void => {
              beforeEach((): void => {
                shouldIncludeAnyAssignee$$Spy.mockReturnValue(true);
              });

              it(`should check if the pull request should be processed because she has at least one of milestone`, (): void => {
                expect.assertions(2);

                pullRequestIncludeProcessor.shouldInclude();

                expect(shouldIncludeAnyMilestone$$Spy).toHaveBeenCalledTimes(1);
                expect(shouldIncludeAnyMilestone$$Spy).toHaveBeenCalledWith();
              });

              describe(`when the pull request has at least one milestone`, (): void => {
                beforeEach((): void => {
                  shouldIncludeAnyMilestone$$Spy.mockReturnValue(true);
                });

                it(`should check if the pull request should be processed because she has at least one of project card`, (): void => {
                  expect.assertions(2);

                  pullRequestIncludeProcessor.shouldInclude();

                  expect(shouldIncludeAnyProjectCard$$Spy).toHaveBeenCalledTimes(1);
                  expect(shouldIncludeAnyProjectCard$$Spy).toHaveBeenCalledWith();
                });

                describe(`when the pull request has at least one project card`, (): void => {
                  beforeEach((): void => {
                    shouldIncludeAnyProjectCard$$Spy.mockReturnValue(true);
                  });

                  it(`should return true`, (): void => {
                    expect.assertions(1);

                    const result = pullRequestIncludeProcessor.shouldInclude();

                    expect(result).toBeTrue();
                  });
                });

                describe(`when the pull request has no project card`, (): void => {
                  beforeEach((): void => {
                    shouldIncludeAnyProjectCard$$Spy.mockReturnValue(false);
                  });

                  it(`should return false`, (): void => {
                    expect.assertions(1);

                    const result = pullRequestIncludeProcessor.shouldInclude();

                    expect(result).toBeFalse();
                  });
                });
              });

              describe(`when the pull request has no milestone`, (): void => {
                beforeEach((): void => {
                  shouldIncludeAnyMilestone$$Spy.mockReturnValue(false);
                });

                it(`should return false`, (): void => {
                  expect.assertions(1);

                  const result = pullRequestIncludeProcessor.shouldInclude();

                  expect(result).toBeFalse();
                });
              });
            });

            describe(`when the pull request has no assignee`, (): void => {
              beforeEach((): void => {
                shouldIncludeAnyAssignee$$Spy.mockReturnValue(false);
              });

              it(`should return false`, (): void => {
                expect.assertions(1);

                const result = pullRequestIncludeProcessor.shouldInclude();

                expect(result).toBeFalse();
              });
            });
          });

          describe(`when the pull request does not belong to any of the white-listed assignee`, (): void => {
            beforeEach((): void => {
              shouldIncludeAnyWhiteListedAssignee$$Spy.mockReturnValue(false);
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldInclude();

              expect(result).toBeFalse();
            });
          });
        });

        describe(`when the pull request does not belong to any of the white-listed milestone`, (): void => {
          beforeEach((): void => {
            shouldIncludeAnyWhiteListedMilestone$$Spy.mockReturnValue(false);
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldInclude();

            expect(result).toBeFalse();
          });
        });
      });

      describe(`when the pull request does not belong to any of the white-listed project card`, (): void => {
        beforeEach((): void => {
          shouldIncludeAnyWhiteListedProjectCard$$Spy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldInclude();

          expect(result).toBeFalse();
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedProjectCard$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [],
            })
          );
      });

      it(`should log about checking the pull-request-only-any-project-cards input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed based on any of the associated project cards...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request-only-any-project-cards input is empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [],
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-project-cards`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-any-project-cards input is not empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyProjectCards: [`dummy-card`],
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-project-cards`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the pull request has no project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          it(`should log about not containing any project card (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project card. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project`,
                      },
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          describe(`when none of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this pull request`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the project cards match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
                item: {
                  projectCards: {
                    nodes: [
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project`,
                        },
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerInfoSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              pullRequestsInputsServiceGetInputsSpy = jest
                .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IPullRequestsInputs>({
                    pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-project cards attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningPullRequest.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `pull-request-include-processor.ts`,
                  startLine: 90,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this pull request`,
                `value-dummy-project`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-project card on this pull request`,
                `value-dummy-project`
              );
            });

            it(`should log about finding one project card in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project card`,
                `white-->`,
                `value-dummy-project`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeTrue();
            });
          });
        });

        describe(`when the pull request has two project cards`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project-1`,
                      },
                    }),
                    createHydratedMock<IGithubApiProjectCard>({
                      project: {
                        name: `dummy-project-2`,
                      },
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-card`],
                })
              );
          });

          describe(`when none of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this pull request`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the project cards match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
                item: {
                  projectCards: {
                    nodes: [
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project-1`,
                        },
                      }),
                      createHydratedMock<IGithubApiProjectCard>({
                        project: {
                          name: `dummy-project-2`,
                        },
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerInfoSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              pullRequestsInputsServiceGetInputsSpy = jest
                .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IPullRequestsInputs>({
                    pullRequestOnlyAnyProjectCards: [`dummy-other-project`],
                  })
                );
            });

            it(`should log a warning about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-project cards attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many project cards on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningPullRequest.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `pull-request-include-processor.ts`,
                  startLine: 90,
                  title: `Warning`,
                }
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this pull request`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about not containing any common project card (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required project card. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the project cards match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyProjectCards: [`dummy-project-2`],
                })
              );
            });

            it(`should log the project names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-project cards on this pull request`,
                `value-dummy-project-1,dummy-project-2`
              );
            });

            it(`should log about finding one project card in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required project card`,
                `white-->`,
                `value-dummy-project-2`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedProjectCard$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedMilestone$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyMilestones: [],
            })
          );
      });

      it(`should log about checking the pull-request-only-any-milestones input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed based on any of the associated milestones...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull-request-only-any-milestones input is empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyMilestones: [],
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-milestones`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-any-milestones input is not empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyMilestones: [`dummy-milestone`],
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-milestones`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the pull request has no milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: undefined,
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
          });

          it(`should log about not containing any milestone (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing a milestone. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has a milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: createHydratedMock<IGithubApiMilestone>({
                  title: `dummy-milestone`,
                }),
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
          });

          describe(`when none of the milestones match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyMilestones: [`dummy-other-milestone`],
                })
              );
            });

            it(`should log the milestone name`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found the milestone`,
                `value-dummy-milestone`,
                `whiteBright-on this pull request`
              );
            });

            it(`should log about not containing any white-listed milestone (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required milestone. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the milestones match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyMilestones: [`dummy-milestone`],
                })
              );
            });

            it(`should log the milestone name`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found the milestone`,
                `value-dummy-milestone`,
                `whiteBright-on this pull request`
              );
            });

            it(`should log about finding one milestone in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required milestone`,
                `white-->`,
                `value-dummy-milestone`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedMilestone$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyWhiteListedAssignee$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerWarningSpy: jest.SpyInstance;
      let annotationsServiceWarningSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerWarningSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
          .mockImplementation();
        annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyAssignees: [],
            })
          );
      });

      it(`should log about checking the pull-request-only-any-assignees input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed based on any of the associated assignees...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull request-only-any-assignees input is empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyAssignees: [],
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-assignees`,
            `whiteBright-is empty. This feature is considered as disabled, and so, ignored. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-any-assignees input is not empty`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyAnyAssignees: [`dummy-card`],
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-any-assignees`,
            `whiteBright-is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
          );
        });

        describe(`when the pull request has no assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-card`],
                })
              );
          });

          it(`should log about not containing any assignee (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any assignee. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-card`],
                })
              );
          });

          describe(`when none of the assignees match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-other-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this pull request`,
                `value-dummy-assignee`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the assignees match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
                item: {
                  assignees: {
                    nodes: [
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerInfoSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              pullRequestsInputsServiceGetInputsSpy = jest
                .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IPullRequestsInputs>({
                    pullRequestOnlyAnyAssignees: [`dummy-other-assignee`],
                  })
                );
            });

            it(`should log a warning about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-assignees attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningPullRequest.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `pull-request-include-processor.ts`,
                  startLine: 239,
                  title: `Warning`,
                }
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this pull request`,
                `value-dummy-assignee`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the assignees match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-1`,
                `whiteBright-assignee on this pull request`,
                `value-dummy-assignee`
              );
            });

            it(`should log about finding one assignee in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required assignee`,
                `white-->`,
                `value-dummy-assignee`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeTrue();
            });
          });
        });

        describe(`when the pull request has two assignees`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-1`,
                    }),
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-card`],
                })
              );
          });

          describe(`when none of the assignees match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-other-assignee`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this pull request`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when none of the assignees match and the pagination is higher than 20`, (): void => {
            beforeEach((): void => {
              pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
                item: {
                  assignees: {
                    nodes: [
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee-1`,
                      }),
                      createHydratedMock<IGithubApiAssignee>({
                        login: `dummy-assignee-2`,
                      }),
                    ],
                    totalCount: 21,
                  },
                },
              });
              pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

              pullRequestProcessorLoggerInfoSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
                .mockImplementation();
              pullRequestProcessorLoggerWarningSpy = jest
                .spyOn(pullRequestIncludeProcessor.processor.logger, `warning`)
                .mockImplementation();
              annotationsServiceWarningSpy = jest.spyOn(AnnotationsService, `warning`).mockImplementation();
              pullRequestsInputsServiceGetInputsSpy = jest
                .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
                .mockReturnValue(
                  createHydratedMock<IPullRequestsInputs>({
                    pullRequestOnlyAnyAssignees: [`dummy-other-assignee`],
                  })
                );
            });

            it(`should log a warning about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledTimes(1);
              expect(pullRequestProcessorLoggerWarningSpy).toHaveBeenCalledWith(
                `Found`,
                `value-21`,
                `whiteBright-assignees attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
              );
            });

            it(`should annotate about finding too many assignees on this pull request since the pagination is not handled`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(annotationsServiceWarningSpy).toHaveBeenCalledTimes(1);
              expect(annotationsServiceWarningSpy).toHaveBeenCalledWith(
                EAnnotationWarningPullRequest.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED,
                {
                  file: `pull-request-include-processor.ts`,
                  startLine: 239,
                  title: `Warning`,
                }
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this pull request`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about not containing any common assignee (skipping the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Not containing any of the required assignee. Skipping the processing of this pull request...`
              );
            });

            it(`should return false`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeFalse();
            });
          });

          describe(`when at least one of the assignees match`, (): void => {
            beforeEach((): void => {
              pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestOnlyAnyAssignees: [`dummy-assignee-2`],
                })
              );
            });

            it(`should log the assignee names`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                3,
                `Found`,
                `value-2`,
                `whiteBright-assignees on this pull request`,
                `value-dummy-assignee-1,dummy-assignee-2`
              );
            });

            it(`should log about finding one assignee in common (continuing the processing)`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                4,
                `Containing one of the required assignee`,
                `white-->`,
                `value-dummy-assignee-2`
              );
            });

            it(`should log continuing the processing`, (): void => {
              expect.assertions(2);

              pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
              expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
                5,
                `Continuing the processing for this pull request...`
              );
            });

            it(`should return true`, (): void => {
              expect.assertions(1);

              const result = pullRequestIncludeProcessor.shouldIncludeAnyWhiteListedAssignee$$();

              expect(result).toBeTrue();
            });
          });
        });
      });
    });

    describe(`shouldIncludeAnyAssignee$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithAssignees: false,
            })
          );
      });

      it(`should log about checking the pull-request-only-with-assignees input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed when having at least one associated assignee...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull-request-only-with-assignees input is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithAssignees: false,
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-assignees`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-with-assignees input is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithAssignees: true,
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-assignees`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the pull request has no assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any assignee (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any assignee. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one assignee`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee`,
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some assignees (continuing the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-1`,
              `whiteBright-assignee on this pull request`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this pull request...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeTrue();
          });
        });

        describe(`when the pull request has two assignees`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                assignees: {
                  nodes: [
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-1`,
                    }),
                    createHydratedMock<IGithubApiAssignee>({
                      login: `dummy-assignee-2`,
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some assignees (continuing the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-2`,
              `whiteBright-assignees on this pull request`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this pull request...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyAssignee$$();

            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`shouldIncludeAnyMilestone$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithAssignees: false,
            })
          );
      });

      it(`should log about checking the pull-request-only-with-milestones input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed when having at least one associated milestone...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull-request-only-with-milestones input is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithMilestones: false,
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-milestones`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-with-milestones input is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithMilestones: true,
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-milestones`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the pull request has no milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: undefined,
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any milestone (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any milestone. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one milestone`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                milestone: createHydratedMock<IGithubApiMilestone>({
                  id: `dummy-milestone`,
                }),
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding a milestone (continuing the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found a milestone on this pull request`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this pull request...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyMilestone$$();

            expect(result).toBeTrue();
          });
        });
      });
    });

    describe(`shouldIncludeAnyProjectCards$$()`, (): void => {
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
        pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithAssignees: false,
            })
          );
      });

      it(`should log about checking the pull-request-only-with-project-cards input`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if this pull request should only be processed when having at least one associated project card...`
        );
      });

      it(`should get the pull request inputs`, (): void => {
        expect.assertions(2);

        pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      });

      describe(`when the pull-request-only-with-project-cards input is disabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithProjectCards: false,
            })
          );
        });

        it(`should log about continuing the processing for this pull request (the feature is not enabled)`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-project-cards`,
            `whiteBright-is disabled. Continuing...`
          );
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

          expect(result).toBeTrue();
        });
      });

      describe(`when the pull-request-only-with-project-cards input is enabled`, (): void => {
        beforeEach((): void => {
          pullRequestsInputsServiceGetInputsSpy.mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestOnlyWithProjectCards: true,
            })
          );
        });

        it(`should log about checking if this pull request should be processed or ignored based on this input`, (): void => {
          expect.assertions(2);

          pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
          expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
            2,
            `The input`,
            `input-pull-request-only-with-project-cards`,
            `whiteBright-is enabled. Checking...`
          );
        });

        describe(`when the pull request has no project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [],
                  totalCount: 0,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about not containing any project card (skipping the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(3);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Not containing any project card. Skipping the processing of this pull request...`
            );
          });

          it(`should return false`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(result).toBeFalse();
          });
        });

        describe(`when the pull request has at least one project card`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: { name: `dummy-project` },
                    }),
                  ],
                  totalCount: 1,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some project cards (continuing the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-1`,
              `whiteBright-project card on this pull request`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this pull request...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(result).toBeTrue();
          });
        });

        describe(`when the pull request has two project cards`, (): void => {
          beforeEach((): void => {
            pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
              item: {
                projectCards: {
                  nodes: [
                    createHydratedMock<IGithubApiProjectCard>({
                      project: { name: `dummy-project-1` },
                    }),
                    createHydratedMock<IGithubApiProjectCard>({
                      project: { name: `dummy-project-2` },
                    }),
                  ],
                  totalCount: 2,
                },
              },
            });
            pullRequestIncludeProcessor = new PullRequestIncludeProcessor(pullRequestProcessor);

            pullRequestProcessorLoggerInfoSpy = jest
              .spyOn(pullRequestIncludeProcessor.processor.logger, `info`)
              .mockImplementation();
          });

          it(`should log about finding some project cards (continuing the processing)`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `Found`,
              `value-2`,
              `whiteBright-project cards on this pull request`
            );
          });

          it(`should log continuing the processing`, (): void => {
            expect.assertions(2);

            pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(4);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `Continuing the processing for this pull request...`
            );
          });

          it(`should return true`, (): void => {
            expect.assertions(1);

            const result = pullRequestIncludeProcessor.shouldIncludeAnyProjectCard$$();

            expect(result).toBeTrue();
          });
        });
      });
    });
  });
});
