/**
 * Barebones implementation of the Maybe type, which allows for explicit type safety.
 * Inspired by purify-ts and this article:
 * https://engineering.dollarshaveclub.com/typescript-maybe-type-and-module-627506ecc5c8
 */

export enum MaybeType {
  Just = 'Maybe__Just',
  Nothing = 'Maybe__Nothing',
}

export type Just<T> = {
  type: MaybeType.Just,
  value: T
}

export type Nothing = {
  type: MaybeType.Nothing
}

export type Maybe<T> = Just<T> | Nothing

/**
 * Constructors
 * * *
 */

export const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
})

export const Nothing = (): Nothing => ({
  type: MaybeType.Nothing
})

export const fromNullable = <T>(value: null | undefined | T): Maybe<T> => (
  (undefined === value || null === value) ? Nothing() : Just(value)
)

/**
 * Utility functions
 * * *
 */

export const equals = <T>(a: Maybe<T>) => (b: Maybe<T>): boolean => (
  ((MaybeType.Nothing === a.type) && (MaybeType.Nothing === b.type))
  ||
  ((MaybeType.Just === a.type) && (MaybeType.Just === b.type) && (a.value === b.value))
)

interface Cases<T, U> {
  Nothing: () => U,
  Just: (value: T) => U,
}

/**
 * Readable pattern matching for the Maybe type. Usage looks like this:
 * caseOf (element) ({
 *  Nothing: () => ... ,
 *  Just: value => ... ,
 * })
 */
export const caseOf = <T>(elt: Maybe<T>) => <U>(cases: Cases<T, U>): U => {
  switch (elt.type) {
    case MaybeType.Nothing:
      return cases.Nothing()
    case MaybeType.Just:
      return cases.Just(elt.value)
  }
}

// Like map for arrays
export const maybeMap = <T, U>(fn: (_: T) => U) => (elt: Maybe<T>): Maybe<U> => (
  caseOf(elt)({
    Nothing: (): Maybe<U> => Nothing(),
    Just: value => Just(fn(value))
  })
)

// Like flatMap for arrays
export const chain = <T, U>(fn: (_: T) => Maybe<U>) => (elt: Maybe<T>): Maybe<U> => (
  caseOf(elt)({
    Nothing: () => Nothing(),
    Just: value => fn(value)
  })
)
