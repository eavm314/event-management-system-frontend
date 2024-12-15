import moment from "moment";
import { ErrorForm } from "../models/questionModel";

export const validateDates = (dateOne: string, dateTwo: string): boolean => {
  const isValidDateOne = dateBetweenInterval(dateOne);
  const isValidDateTwo = dateBetweenInterval(dateTwo) &&
    (moment(dateTwo).isSame(dateOne, 'day') || moment(dateTwo).isAfter(moment(dateOne)));

  return isValidDateOne && isValidDateTwo;
};

export const dateBetweenInterval = (value: string) => {
  const todayDate = moment();
  if (!dateInFuture(value)) {
    return false;
  }
  const dateGotten = moment(value, 'YYYY-MM-DD');
  const dayDifference: number = dateGotten.diff(todayDate, 'days');
  return dayDifference >= 14 && dayDifference <= 60;
};

export const dateInFuture = (value: string): boolean => {
  return moment(value, 'YYYY-MM-DD').isValid() && moment(value).isAfter(moment());
};

export const isWhatsAppNumber = (value: any): boolean => {
  const regex: RegExp = /^\+591\d{8}$/;
  return regex.test(value);
};

export const isPhoneNumber = (value: any): boolean => {
  const regex: RegExp = /^\d{8}$/;
  return regex.test(value);
};

export const isCorrectPassword = (value: any): boolean => {
  const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
  return regex.test(value);
};

export const isEmail = (value: any): boolean => {
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

export const containsOnlyLetters = (value: any): boolean => {
  if (isNotEmpty(value)) {
    const regExpr: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜ]+(?: [a-zA-ZáéíóúÁÉÍÓÚüÜ]+)*$/;
    return regExpr.test(value);
  }
  return true;
};

export const isBoolean = (value: any): boolean => {
  if (isNotEmpty(value)) {
    return typeof value === 'boolean';
  }
  return true;
};

export const isNumber = (value: any): boolean => {
  if (isNotEmpty(value)) {
    const regex: RegExp = /^\d+$/;
    return regex.test(value);
  }
  return true;
};

export const isString = (value: any): boolean => {
  if (isNotEmpty(value)) {
    return typeof value === 'string';
  }
  return true;
};

export const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const isArray = (value: any): boolean => {
  if (isNotEmpty(value)) {
    return Array.isArray(value);
  }
  return true;
};

export const isFunction = (value: any): boolean => {
  if (isNotEmpty(value)) {
    return typeof value === 'function';
  }
  return true;
};

export const isUndefined = (value: any): boolean => {
  return value === 'undefined';
};

export const isNull = (value: any): boolean => {
  return value === null;
};

export const isNotEmpty = (value: any): boolean => {
  return value !== undefined && value !== null;
};

export const isLenghtString = (value: string, min: number, max?: number): boolean => {
  if (isNotEmpty(value)) {
    if (!max) {
      return value.length >= min;
    } else {
      return value.length >= min && value.length <= max;
    }
  }
  return true;
};

export interface TypeCondition {
  type: string;
  status: boolean;
}

export const generalValidator = (errorsList: ErrorForm[], value: string, conditions: TypeCondition[]): ErrorForm[] => {
  const updatedErrors: ErrorForm[] = [];
  const indexErrors: number[] = [];

  const errors: ErrorForm[] = errorsList.filter(
    (item: ErrorForm, index: number) => {
      const condition: boolean = item.id === value;
      if (condition) {
        indexErrors.push(index);
      }
      updatedErrors.push(item);
      return condition;
    }
  );

  let errorExist: boolean = false;

  conditions.map(condition => {
    if (!condition.status) {
      errors.map((item) => {
        if (item.type === condition.type) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      errorExist = true;
    }
  });

  if (!errorExist) {
    errors.map((item) => {
      item.active = false;
    });
  }

  indexErrors.map((item, index) => {
    updatedErrors[item] = errors[index];
  });

  return updatedErrors;
};
