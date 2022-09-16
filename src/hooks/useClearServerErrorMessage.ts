import React from 'react';
import { UseFormClearErrors } from 'react-hook-form';

type useClearServerErrorMessageTypes = {
  updatedFields: string[];
  clearErrors: UseFormClearErrors<any>;
  isServerError: boolean;
};

export function useClearServerErrorMessage({
  updatedFields,
  clearErrors,
  isServerError,
}: useClearServerErrorMessageTypes): void {
  React.useEffect(() => {
    if (updatedFields && isServerError) {
      clearErrors('serverError');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedFields, clearErrors]);
}
