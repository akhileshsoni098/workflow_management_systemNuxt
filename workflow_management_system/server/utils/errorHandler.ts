import { H3Event } from "h3";

//================= handle catch err ===========

export const handleErrorCatch = (statusCode: number, message: string) => {
  const status = statusCode || 500;

  throw createError({
    statusCode: status,
    statusMessage: message,
  });
};
//================ handle normal err =======

export const handleError = (
  event: H3Event,
  statusCode: number,
  message: string,
) => {
  setResponseStatus(event, statusCode);
  return {
    status: false,
    statusCode,
    message,
  };
};
