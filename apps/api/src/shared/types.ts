export type ServiceResponse<Output, Errors> =
  | { error: null; data: Output }
  | { error: Errors; data: null };
