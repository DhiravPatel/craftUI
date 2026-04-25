import type * as React from "react";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type ComponentProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    className?: string;
  };

export type PolymorphicProps<
  T extends React.ElementType,
  P = Record<string, never>,
> = P &
  Omit<React.ComponentPropsWithoutRef<T>, keyof P> & {
    as?: T;
  };

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
