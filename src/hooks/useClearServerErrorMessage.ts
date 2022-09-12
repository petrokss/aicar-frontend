import React from 'react';
import { UseFormClearErrors, FieldValues, Path } from 'react-hook-form';

type useClearServerErrorMessageTypes<TFormData extends FieldValues> = {
  updatedFields: string[];
  clearErrors: UseFormClearErrors<TFormData>;
  isServerError: boolean;
  serverErrorFieldName:
    | Path<TFormData>
    | Path<TFormData>[]
    | readonly Path<TFormData>[]
    | undefined;
};

export function useClearServerErrorMessage<TFormData extends FieldValues>({
  updatedFields,
  clearErrors,
  isServerError,
  serverErrorFieldName,
}: useClearServerErrorMessageTypes<TFormData>): void {
  React.useEffect(() => {
    if (updatedFields && isServerError) {
      clearErrors(serverErrorFieldName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedFields, clearErrors]);
}
