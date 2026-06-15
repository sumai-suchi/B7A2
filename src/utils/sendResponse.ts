import type { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};

export const sendResponse = <T>(
  res: Response,
  payload: TResponse<T>
) => {
  return res.status(payload.statusCode).json({
    success: payload.success,
    message: payload.message,
    data: payload.data,
  });
};

type TError = {
  statusCode: number;
  success: boolean;
  message: string;
  errors?: unknown;
};


export const sendError = (
  res: Response,
  payload: TError
) => {
  return res.status(payload.statusCode).json({
    success: false,
    message: payload.message,
    errors: payload.errors,
  });
};