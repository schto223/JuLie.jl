var documenterSearchIndex = {"docs":
[{"location":"#JuLie.jl","page":"JuLie.jl","title":"JuLie.jl","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"A Julia package for Combinatorics","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"Depth = 3","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"CurrentModule = JuLie","category":"page"},{"location":"#Using","page":"JuLie.jl","title":"Using","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"To install the package, do the following In Julia:","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"using Pkg\r\nPkg.add(url=\"https://github.com/ulthiel/JuLie.jl\")","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"Then you can start using the package as follows:","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"using JuLie\r\npartitions(10)","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"You can get a list of exported functions using","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"names(JuLie)","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"You can get help for a function by putting a question mark in front, e.g.","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"?partitions","category":"page"},{"location":"#Partitions","page":"JuLie.jl","title":"Partitions","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"Partition\r\n\r\npartitions\r\nascending_partitions","category":"page"},{"location":"#JuLie.Partition","page":"JuLie.jl","title":"JuLie.Partition","text":"struct Partition{T} <: AbstractArray{T,1}\n\nA partition of an integer n >= 0 is a decreasing sequence n1, n2, ... of positive integers whose sum is equal to n. You can create a partition with\n\nP=Partition([3,2,1])\n\nand then work with it like with an array. In fact, Partition is a subtype of AbstractArray{T,1}. You can increase performance by using smaller integer types, e.g.\n\nP=Partition(Int8[3,2,1])\n\nNote that for efficiency the Partition constructor does not check whether the given array is in fact a partition, i.e. a decreasing sequence. That's your job.\n\nI was thinking back and forth whether to implement an own structure for this because it's actually just an array of integers. But it makes sense since we have several functions just acting on partitons and it would be strange implementing them for arrays in general (where mostly they don't make sense). I was hesitating because I feared that an own structure for partitions will have a performance impact. But it does not! In my standard example creating the partitions of 90 there is really NO difference in runtime and memory consumption between using arrays and using an own structure.\n\nThe implementation of a subtype of AbstractArray is explained in https://docs.julialang.org/en/v1/manual/interfaces/#man-interface-array.\n\n\n\n\n\n","category":"type"},{"location":"#JuLie.partitions","page":"JuLie.jl","title":"JuLie.partitions","text":"partitions(n::Integer)\n\nA list of all partitions of an integer n >= 0, produced in lexicographically descending order (like in SAGE, but opposite to GAP (you can apply reverse() to reverse the order)). The algorithm used is the algorithm ZS1 by A. Zoghbi and I. Stojmenovic, \"Fast algorithms for generating integer partitions\", Int. J. Comput. Math. 70 (1998), no. 2, 319–332.\n\nYou can increase performance by casting n into a smaller integer type, e.g.\n\npartitions(Int8(90))\n\n\n\n\n\npartitions(m::Integer, n::Integer, l1::Integer, l2::Integer; z=0)\n\nAll partitions of an integer m >= 0 into n >= 0 parts with lower bound l1>=0 and upper bound l2>=l1. Parameter z should be set to 0 for arbitrary choice of parts (default), 1 for distinct parts. The partitions are produced in  decreasing order.\n\nThe algorithm used is \"parta\" by W. Riha and K. R. James, \"Algorithm 29. Efficient Algorithms for Doubly and Multiply Restricted Partitions\" (1976). De-gotoed from ALGOL code by Elisa!\n\n\n\n\n\npartitions(m::Integer, n::Integer)\n\nAll partitions of an integer m >= 0 into n >= 1 parts (no further restrictions). This simply calls partitions(m,n,1,m,z=0).\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.ascending_partitions","page":"JuLie.jl","title":"JuLie.ascending_partitions","text":"ascending_partitions(n::Integer;alg=\"ks\")\n\nInstead of encoding a partition of an integer n >= 0 as a descending sequence (which is our convention), one can also encode it as an ascending sequence. In the papers below it is claimed that generating the list of all ascending partitions is more efficient than generating descending ones. To test this, I have implemented the algorithms:\n\n\"ks\" (default) is the algorithm AccelAsc (Algorithm 4.1) by J. Kelleher and B. O'Sullivan, \"Generating All Partitions: A Comparison Of Two Encodings\", https://arxiv.org/pdf/0909.2331.pdf, May 2014.\n\"m\" is Algorithm 6 by M. Merca, \"Fast Algorithm for Generating Ascending Compositions\", J. Math Model. Algor. (2012) 11:89–104. This is similar to \"ks\".\n\nThe ascending partitions are given here as arrays, not of type Partition since these are descending by convention.\n\nI don't see a significant speed difference to the descending encoding:\n\njulia> @btime partitions(Int8(90));\n  3.376 s (56634200 allocations: 6.24 GiB)\n\njulia> @btime ascending_partitions(Int8(90),alg=\"ks\");\n  3.395 s (56634200 allocations: 6.24 GiB)\n\njulia> @btime ascending_partitions(Int8(90),alg=\"m\");\n  3.451 s (56634200 allocations: 6.24 GiB)\n\nI am using \"ks\" as default since it looks slicker and I believe there is a tiny mistake in the publication of \"m\" (which I fixed).\n\n\n\n\n\n","category":"function"},{"location":"#Multipartitions","page":"JuLie.jl","title":"Multipartitions","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"Multipartition\r\nmultipartitions","category":"page"},{"location":"#Enumerative-functions","page":"JuLie.jl","title":"Enumerative functions","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"num_partitions\r\ncatalan\r\nstirling1\r\nstirling2\r\nlucas","category":"page"},{"location":"#JuLie.num_partitions","page":"JuLie.jl","title":"JuLie.num_partitions","text":"num_partitions(n::fmpz)\nnum_partitions(n::Integer)\n\nThe number of integer partitions of the integer n >= 0. Uses the function from FLINT, which is really fast.\n\nFor more information on these numbers, see https://oeis.org/A000041.\n\n\n\n\n\nnum_partitions(n::fmpz, k::fmpz)\nnum_partitions(n::Integer, k::Integer)\n\nThe number of integer partitions of the integer n >= 0 into k >= 0 parts. The implementation uses a recurrence relation.\n\nFor more information on these numbers, see https://oeis.org/A008284.\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.catalan","page":"JuLie.jl","title":"JuLie.catalan","text":"catalan(n::fmpz; alg=\"binomial\")\ncatalan(n::Integer; alg=\"binomial\")\n\nThe n-th Catalan number. This counts a gazillion of things, see https://oeis.org/A000108 for more information. There are algorithms implemented:\n\n\"binomial\" (default): uses a simple formula with binomial coefficients.\n\"iterative\": uses an iterative computation.\n\nThe binomial computation is much faster:\n\njulia> @time x=catalan( ZZ(10)^5 , alg=\"binomial\");\n 0.007727 seconds (9 allocations: 95.750 KiB)\n\njulia> @time x=catalan( ZZ(10)^5 , alg=\"iterative\");\n 1.572488 seconds (1.01 M allocations: 2.333 GiB, 1.36% gc time)\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.stirling1","page":"JuLie.jl","title":"JuLie.stirling1","text":"stirling1(n::fmpz, k::fmpz)\nstirling1(n::Integer, k::Integer)\n\nThe Stirling number S_1(nk) of the first kind. The absolute value of S_1(nk) counts the number of permutations of n elements with k disjoint cycles. The implementation is a wrapper to the function in FLINT.\n\nFor more information on these numbers, see https://oeis.org/A008275.\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.stirling2","page":"JuLie.jl","title":"JuLie.stirling2","text":"stirling2(n::fmpz, k::fmpz)\nstirling2(n::Integer, k::Integer)\n\nThe Stirling number S_2(nk) of the second kind. This counts the number of partitions of an n-set into k non-empty subsets. The implementation is a wrapper to the function in FLINT.\n\nFor more information on these numbers, see https://oeis.org/A008277.\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.lucas","page":"JuLie.jl","title":"JuLie.lucas","text":"lucas(n::fmpz)\nlucas(n::Integer)\n\nThe n-th Lucas number. For more information on these numbers, see https://oeis.org/A000032. The implementation is a wrapper to the function in GMP.\n\n\n\n\n\n","category":"function"},{"location":"#Quantum-numbers","page":"JuLie.jl","title":"Quantum numbers","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"quantum_number\r\nquantum","category":"page"},{"location":"#JuLie.quantum_number","page":"JuLie.jl","title":"JuLie.quantum_number","text":"quantum_number(n::Int, q::RingElem)\n\nFor an integer n>=0 and a ring element q which is invertible in its parent ring the quantum integer n_q is for n>=0 defined as n_q = sum_i=0^n-1 q^n-(2i+1) and for n < 0 as n_q = --n_q.\n\n\n\n\n\nquantum_number(n::Int)\n\nThe quantum number [n]_q where q is the interdeterminate of the Laurent polynomial ring Z[q,q^-1] in one variable over the integers.\n\n\n\n\n\n","category":"function"},{"location":"#JuLie.quantum","page":"JuLie.jl","title":"JuLie.quantum","text":"quantum(n::Int, q::RingElem)\n\nThis is a shortcut for quanum_number(n,q)\n\n\n\n\n\nquantum(n::Int)\n\nThis is a shortcut for quanum_number(n)\n\n\n\n\n\n","category":"function"},{"location":"#Index","page":"JuLie.jl","title":"Index","text":"","category":"section"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"","category":"page"},{"location":"","page":"JuLie.jl","title":"JuLie.jl","text":"link to func(x)\nlink to partitions","category":"page"}]
}
