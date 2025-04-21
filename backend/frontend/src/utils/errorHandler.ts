import { AxiosError } from 'axios';
import { StrapiErrorResponse } from '../types/api';

/**
 * Extracts error message from Strapi API error response
 * @param error - Error object (typically from Axios catch block)
 * @param defaultMessage - Default error message to show if error parsing fails
 * @returns Readable error message
 */
export const getStrapiErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const strapiError = error.response.data as StrapiErrorResponse['data'];
    if (strapiError.error && strapiError.error.message) {
      return strapiError.error.message;
    }
  }

  return defaultMessage;
};

/**
 * Logs error details to console in development environment
 * @param error - Error object to log
 * @param context - Context information (e.g., 'Login', 'Register')
 */
export const logErrorDetails = (error: unknown, context: string): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Error in ${context}:`, error);
  }
};
