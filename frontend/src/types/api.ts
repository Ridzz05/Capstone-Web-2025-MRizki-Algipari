// Strapi Error format
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface StrapiErrorResponse {
  data: {
    error: StrapiError;
  };
}
