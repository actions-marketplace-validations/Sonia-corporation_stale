import { AbstractOutputsService } from '@core/outputs/abstract-outputs.service';
import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import * as core from '@actions/core';
import _ from 'lodash';

export class IssuesOutputsService extends AbstractOutputsService {
  private static _instance: IssuesOutputsService;

  public static getInstance(): IssuesOutputsService {
    if (_.isNil(IssuesOutputsService._instance)) {
      IssuesOutputsService._instance = new IssuesOutputsService();
    }

    return IssuesOutputsService._instance;
  }

  protected readonly _outputsName: 'issues' = `issues`;

  protected _setOutputs(): void {
    core.setOutput(
      EIssuesOutputs.ALREADY_STALE_ISSUES_COUNT,
      IssuesStatisticsService.getInstance().alreadyStaleIssuesCount
    );
    core.setOutput(EIssuesOutputs.IGNORED_ISSUES_COUNT, IssuesStatisticsService.getInstance().ignoredIssuesCount);
    core.setOutput(EIssuesOutputs.UNALTERED_ISSUES_COUNT, IssuesStatisticsService.getInstance().unalteredIssuesCount);
    core.setOutput(EIssuesOutputs.STALE_ISSUES_COUNT, IssuesStatisticsService.getInstance().staleIssuesCount);
    core.setOutput(EIssuesOutputs.PROCESSED_ISSUES_COUNT, IssuesStatisticsService.getInstance().processedIssuesCount);
    core.setOutput(
      EIssuesOutputs.REMOVE_STALE_ISSUES_COUNT,
      IssuesStatisticsService.getInstance().removeStaleIssuesCount
    );
    core.setOutput(EIssuesOutputs.CLOSE_ISSUES_COUNT, IssuesStatisticsService.getInstance().closedIssuesCount);
    core.setOutput(
      EIssuesOutputs.ADDED_ISSUES_COMMENTS_COUNT,
      IssuesStatisticsService.getInstance().addedIssuesCommentsCount
    );
    core.setOutput(
      EIssuesOutputs.ADDED_ISSUES_LABELS_COUNT,
      IssuesStatisticsService.getInstance().addedIssuesLabelsCount
    );
    core.setOutput(EIssuesOutputs.CALLED_API_ISSUES_COUNT, IssuesStatisticsService.getInstance().calledApiIssuesCount);
    core.setOutput(
      EIssuesOutputs.CALLED_API_ISSUES_QUERIES_COUNT,
      IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount
    );
    core.setOutput(
      EIssuesOutputs.CALLED_API_ISSUES_MUTATIONS_COUNT,
      IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount
    );
  }
}
