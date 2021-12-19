import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsStatisticsService`, (): void => {
  let service: PullRequestsStatisticsService;

  beforeEach((): void => {
    service = PullRequestsStatisticsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a PullRequestsStatisticsService`, (): void => {
      expect.assertions(1);

      service = PullRequestsStatisticsService.getInstance();

      expect(service).toStrictEqual(expect.any(PullRequestsStatisticsService));
    });

    it(`should return the created PullRequestsStatisticsService`, (): void => {
      expect.assertions(1);

      const result = PullRequestsStatisticsService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`initialize()`, (): void => {
    it(`should reset all the statistics to 0`, (): void => {
      expect.assertions(8);
      service.processedPullRequestsCount$$ = 1;
      service.ignoredPullRequestsCount$$ = 1;
      service.unalteredPullRequestsCount$$ = 1;
      service.stalePullRequestsCount$$ = 1;
      service.alreadyStalePullRequestsCount$$ = 1;
      service.removeStalePullRequestsCount$$ = 1;
      service.closedPullRequestsCount$$ = 1;
      service.addedPullRequestsCommentsCount$$ = 1;

      service.initialize();

      expect(service.processedPullRequestsCount$$).toBe(0);
      expect(service.ignoredPullRequestsCount$$).toBe(0);
      expect(service.unalteredPullRequestsCount$$).toBe(0);
      expect(service.stalePullRequestsCount$$).toBe(0);
      expect(service.alreadyStalePullRequestsCount$$).toBe(0);
      expect(service.removeStalePullRequestsCount$$).toBe(0);
      expect(service.closedPullRequestsCount$$).toBe(0);
      expect(service.addedPullRequestsCommentsCount$$).toBe(0);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.initialize();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseProcessedPullRequestsCount()`, (): void => {
    it(`should increase the processed pull requests count`, (): void => {
      expect.assertions(1);
      service.processedPullRequestsCount$$ = 0;

      service.increaseProcessedPullRequestsCount();

      expect(service.processedPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseProcessedPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseIgnoredPullRequestsCount()`, (): void => {
    it(`should increase the ignored pull requests count`, (): void => {
      expect.assertions(1);
      service.ignoredPullRequestsCount$$ = 0;

      service.increaseIgnoredPullRequestsCount();

      expect(service.ignoredPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseIgnoredPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseUnalteredPullRequestsCount()`, (): void => {
    it(`should increase the unaltered pull requests count`, (): void => {
      expect.assertions(1);
      service.unalteredPullRequestsCount$$ = 0;

      service.increaseUnalteredPullRequestsCount();

      expect(service.unalteredPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseUnalteredPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      service.stalePullRequestsCount$$ = 0;

      service.increaseStalePullRequestsCount();

      expect(service.stalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAlreadyStalePullRequestsCount()`, (): void => {
    it(`should increase the already stale pull requests count`, (): void => {
      expect.assertions(1);
      service.alreadyStalePullRequestsCount$$ = 0;

      service.increaseAlreadyStalePullRequestsCount();

      expect(service.alreadyStalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAlreadyStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseRemoveStalePullRequestsCount()`, (): void => {
    it(`should increase the stale pull requests count`, (): void => {
      expect.assertions(1);
      service.removeStalePullRequestsCount$$ = 0;

      service.increaseRemoveStalePullRequestsCount();

      expect(service.removeStalePullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseRemoveStalePullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseClosedPullRequestsCount()`, (): void => {
    it(`should increase the close pull requests count`, (): void => {
      expect.assertions(1);
      service.closedPullRequestsCount$$ = 0;

      service.increaseClosedPullRequestsCount();

      expect(service.closedPullRequestsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseClosedPullRequestsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`increaseAddedPullRequestsCommentsCount()`, (): void => {
    it(`should increase the added pull requests comments count`, (): void => {
      expect.assertions(1);
      service.closedPullRequestsCount$$ = 0;

      service.increaseAddedPullRequestsCommentsCount();

      expect(service.addedPullRequestsCommentsCount$$).toBe(1);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.increaseAddedPullRequestsCommentsCount();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`logsAllStatistics()`, (): void => {
    let loggerServiceStartGroupSpy: jest.SpyInstance;
    let loggerServiceEndGroupSpy: jest.SpyInstance;
    let loggerServiceInfoSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceStartGroupSpy = jest.spyOn(LoggerService, `startGroup`).mockImplementation();
      loggerServiceEndGroupSpy = jest.spyOn(LoggerService, `endGroup`).mockImplementation();
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
    });

    it(`should create a group of logs`, (): void => {
      expect.assertions(2);

      service.logsAllStatistics();

      expect(loggerServiceStartGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceStartGroupSpy).toHaveBeenCalledWith(`Pull requests statistics`);
    });

    describe(`when all the statistics are at 0 count`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount$$ = 0;
        service.ignoredPullRequestsCount$$ = 0;
        service.unalteredPullRequestsCount$$ = 0;
        service.stalePullRequestsCount$$ = 0;
        service.alreadyStalePullRequestsCount$$ = 0;
        service.removeStalePullRequestsCount$$ = 0;
        service.closedPullRequestsCount$$ = 0;
        service.addedPullRequestsCommentsCount$$ = 0;
      });

      it(`should not log the statistics`, (): void => {
        expect.assertions(1);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when there is only one statistic with a count more to 0`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount$$ = 1;
        service.ignoredPullRequestsCount$$ = 0;
        service.unalteredPullRequestsCount$$ = 0;
        service.stalePullRequestsCount$$ = 0;
        service.removeStalePullRequestsCount$$ = 0;
        service.alreadyStalePullRequestsCount$$ = 0;
        service.closedPullRequestsCount$$ = 0;
        service.addedPullRequestsCommentsCount$$ = 0;
      });

      it(`should log the statistic`, (): void => {
        expect.assertions(2);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceInfoSpy).toHaveBeenCalledWith(
          `white-└──`,
          `whiteBright-Processed pull requests`,
          `value-1`
        );
      });
    });

    describe(`when there is a bunch of statistics with a count more to 0`, (): void => {
      beforeEach((): void => {
        service.processedPullRequestsCount$$ = 1;
        service.ignoredPullRequestsCount$$ = 2;
        service.unalteredPullRequestsCount$$ = 0;
        service.stalePullRequestsCount$$ = 3;
        service.alreadyStalePullRequestsCount$$ = 4;
        service.removeStalePullRequestsCount$$ = 5;
        service.closedPullRequestsCount$$ = 6;
        service.addedPullRequestsCommentsCount$$ = 7;
      });

      it(`should log the statistics`, (): void => {
        expect.assertions(8);

        service.logsAllStatistics();

        expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(7);
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          1,
          `white-├──`,
          `whiteBright-Processed pull requests     `,
          `value-1`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          2,
          `white-├──`,
          `whiteBright-Ignored pull requests       `,
          `value-2`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          3,
          `white-├──`,
          `whiteBright-Stale pull requests         `,
          `value-3`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          4,
          `white-├──`,
          `whiteBright-Already stale pull requests `,
          `value-4`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          5,
          `white-├──`,
          `whiteBright-Remove stale pull requests  `,
          `value-5`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          6,
          `white-├──`,
          `whiteBright-Closed pull requests        `,
          `value-6`
        );
        expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(
          7,
          `white-└──`,
          `whiteBright-Added pull requests comments`,
          `value-7`
        );
      });
    });

    it(`should close the group of logs`, (): void => {
      expect.assertions(2);

      service.logsAllStatistics();

      expect(loggerServiceEndGroupSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceEndGroupSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = service.logsAllStatistics();

      expect(result).toStrictEqual(service);
    });
  });
});
