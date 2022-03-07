export enum MaybeType {
  Just = 'Maybe__Just',
  Nothing = 'Maybe__Nothing',
}

export type Just<T> = {
  type: typeof MaybeType.Just,
  value: T
}

export type Nothing = {
  type: typeof MaybeType.Nothing
}

export type Maybe<T> = Just<T> | Nothing

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

export const equals = <T>(a: Maybe<T>) => (b: Maybe<T>): boolean => (
  ((MaybeType.Nothing === a.type) && (MaybeType.Nothing === b.type))
  ||
  ((MaybeType.Just === a.type) && (MaybeType.Just === b.type) && (a.value === b.value))
)

interface Cases<T, U> {
  Nothing: () => U,
  Just: (value: T) => U,
}

export const caseOf = <T>(elt: Maybe<T>) => <U>(cases: Cases<T, U>): U => {
  switch (elt.type) {
    case MaybeType.Nothing:
      return cases.Nothing()
    case MaybeType.Just:
      return cases.Just(elt.value)
  }
}

export const maybeMap = <T, U>(fn: (_: T) => U) => (elt: Maybe<T>): Maybe<U> => (
  caseOf(elt)({
    Nothing: (): Maybe<U> => Nothing(),
    Just: value => Just(fn(value))
  })
)

export const chain = <T, U>(fn: (_: T) => Maybe<U>) => (elt: Maybe<T>): Maybe<U> => (
  caseOf(elt)({
    Nothing: () => Nothing(),
    Just: value => fn(value)
  })
)

export const orDefault = <T>(def: T) => (elt: Maybe<T>): T => (
  caseOf(elt)({
    Nothing: () => def,
    Just: value => value
  })
)
