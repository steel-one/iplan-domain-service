import { ValueTransformer } from 'typeorm';

export interface IGrpcTimestamp {
  seconds: number;
  nanos: number;
}

export const GrpcDateTransformer: ValueTransformer = {
  to: (value: Date) => value,
  from: (value: Date) => convertToTimestamp(value),
};

export function convertToTimestamp(databaseTimestamp: Date): IGrpcTimestamp {
  if (!databaseTimestamp) return null;

  const time = databaseTimestamp.getTime();
  const seconds = time / 1000;
  const nanos = (time % 1000) * 1e6;
  return {
    seconds,
    nanos,
  };
}

export function convertTimestampToDate(protoTimestamp: IGrpcTimestamp): Date {
  const seconds = protoTimestamp.seconds;
  const nanoseconds = protoTimestamp.nanos || 0;

  const milliseconds = seconds * 1000 + nanoseconds / 1e6;

  return new Date(milliseconds);
}
