export type ServerError = {
  error: string | ZodIssue[];
};

export type ServerErrorResponce = {
  status: number;
  data: ServerError;
};
