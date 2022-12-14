import { EInputs } from '@core/inputs/inputs.enum';
import { IInput } from '@core/inputs/types/input';
import { IInputs } from '@core/inputs/types/inputs';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationError } from '@utils/annotations/enums/annotation-error.enum';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import { isFiniteNumber } from '@utils/numbers/is-finite-number';
import { ETreeRows } from '@utils/trees/tree-rows.enum';
import * as core from '@actions/core';
import { InputOptions } from '@actions/core';
import _ from 'lodash';

export class CoreInputsService {
  public static logInputs(groupName: Readonly<string>, inputs: Readonly<IInputs>): CoreInputsService {
    LoggerService.startGroup(groupName);

    _.forIn(inputs, (value: Readonly<IInput>, inputName: Readonly<string>, inputs: Readonly<IInputs>): void => {
      const lastInputName: string | undefined = _.findLastKey(inputs, (): true => true);

      LoggerService.info(
        LoggerFormatService.white(inputName === lastInputName ? ETreeRows.LAST : ETreeRows.ANY),
        LoggerService.input(_.kebabCase(inputName) as EInputs),
        LoggerService.value(value)
      );
    });

    LoggerService.endGroup();

    return CoreInputsService;
  }

  public static getNumberInput$$(input: Readonly<EInputs>, options?: Readonly<InputOptions>): number | never {
    const inputValue: string = core.getInput(input, options);
    const value: number = _.parseInt(inputValue);

    if (!isFiniteNumber(value)) {
      LoggerService.error(
        `Wrong value given to the input`,
        LoggerService.value(input),
        LoggerFormatService.white(`->`),
        LoggerService.value(inputValue)
      );
      AnnotationsService.error(EAnnotationError.WRONG_INPUT_VALUE, {
        file: `core-inputs.service.ts`,
        startLine: 35,
        title: `Error`,
      });

      throw new Error(`Wrong value given to the input number ${input}`);
    }

    return value;
  }

  public static getEnumInput$$<TEnum>(
    input: Readonly<EInputs>,
    parser: (value: TEnum | string) => TEnum | undefined,
    fallback: Readonly<TEnum>,
    options?: Readonly<InputOptions>
  ): TEnum {
    const inputValue: TEnum | string = core.getInput(input, options);

    // The parser should check if the value belong to the enum
    // If not, it should return undefined and this method will use the fallback value instead
    if (!parser(inputValue)) {
      LoggerService.warning(
        `Wrong value given to the input`,
        LoggerService.value(input),
        LoggerFormatService.white(`->`),
        LoggerService.value(inputValue)
      );
      AnnotationsService.warning(EAnnotationWarningIssue.WRONG_INPUT_VALUE, {
        file: `core-inputs.service.ts`,
        startLine: 57,
        title: `Warning`,
      });
      LoggerService.info(`Falling back instead to`, LoggerService.value(_.toString(fallback)));

      return fallback;
    }

    // @todo find a way to get rid of this type hack
    return inputValue as unknown as TEnum;
  }
}
