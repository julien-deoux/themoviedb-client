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

interface Cases<T, U> {
  Nothing: () => U,
  Just: (value: T) => U,
}

export const caseOf = <T, U>(elt: Maybe<T>) => (cases: Cases<T, U>): U => {
  switch (elt.type) {
    case MaybeType.Nothing:
      return cases.Nothing()
    case MaybeType.Just:
      return cases.Just(elt.value)
  }
}

export const map = <T, U>(fn: (_: T) => U) => (elt: Maybe<T>): Maybe<U> => (
  caseOf<T, Maybe<U>>(elt)({
    Nothing: () => Nothing(),
    Just: value => Just(fn(value))
  })
)

export const orDefault = <T>(def: T) => (elt: Maybe<T>): T => (
  caseOf<T, T>(elt)({
    Nothing: () => def,
    Just: value => value,
  })
)
