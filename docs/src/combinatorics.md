# Combinatorics

## Enumerative functions
```@docs
catalan
num_partitions
lucas
stirling1
stirling2
```

## Partitions
```@docs
Partition
partitions
dominates
conjugate
getelement
ascending_partitions
```

## Multipartitions
```@docs
Multipartition
multipartitions
sum(P::Multipartition{T}) where T<:Integer
```

## Multiset partitions
```@docs
Multiset_partition
multiset_partitions
```

## Tableaux
```@docs
Tableau
shape
weight
reading_word
is_semistandard
semistandard_tableaux
is_standard
standard_tableaux
hook_length
hook_lengths
num_standard_tableaux
schensted
bump!
```

## Kostka polynomials
```@docs
kostka_polynomial
charge
```

## Schur polynomials
```@docs
schur_polynomial
```
## Quantum numbers
```@docs
quantum_number
quantum
gaussian_binomial
```
