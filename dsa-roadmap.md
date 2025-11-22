# Data Structures & Algorithms

## Programming Fundamentals

### Language Syntax
- Learn the syntax of your chosen language

### Control Structures
- Conditional statements (if, else, switch)
- Loops (for, while, do-while)

### Functions
- Function declaration and invocation
- Parameters and return values
- Scope and closures

### OOP Basics
- Classes and objects
- Inheritance
- Polymorphism
- Encapsulation

### Pseudo Code
- Writing algorithm descriptions in plain language

## Pick a Language

Choose one of the following languages to learn Data Structures & Algorithms:

- JavaScript
- Java
- Go
- C#
- C++
- Python
- Rust
- Ruby

## Data Structures Fundamentals

### What are Data Structures?

Data structures are specialized formats for organizing, processing, and storing data efficiently. They define how data is arranged in memory and provide methods for accessing and modifying that data.

### Why are Data Structures Important?

- **Efficiency**: Choosing the right data structure can significantly improve algorithm performance
- **Memory Management**: Optimize memory usage for large datasets
- **Problem Solving**: Enable elegant solutions to complex problems
- **Interview Readiness**: Essential knowledge for technical interviews

## Basic Data Structures

### Array
- Ordered collection of elements
- Fixed or dynamic size depending on language
- O(1) access time by index

### Linked Lists
- Sequential data structure with nodes containing data and references
- O(n) access time
- Efficient insertion and deletion

### Stacks
- Last-In-First-Out (LIFO) data structure
- Operations: push, pop, peek

### Queues
- First-In-First-Out (FIFO) data structure
- Operations: enqueue, dequeue

### Hash Tables
- Key-value pair storage
- O(1) average case lookup
- Used for implementing dictionaries and caches

## Algorithmic Complexity

### Time vs Space Complexity

- **Time Complexity**: How long an algorithm takes to run
- **Space Complexity**: How much memory an algorithm uses

### How to Calculate Complexity?

Analyze the number of operations performed relative to input size (n):
- Count loops and recursive calls
- Identify the dominant operation
- Express in Big-O notation

### Common Runtimes

#### Constant
- O(1): Algorithm takes same time regardless of input size

#### Logarithmic
- O(log n): Reduces problem size by half each iteration (e.g., binary search)

#### Linear
- O(n): Time grows proportionally with input size

#### Polynomial
- O(n²), O(n³): Time grows with powers of input size (e.g., nested loops)

#### Exponential
- O(2^n): Time doubles with each additional input

#### Factorial
- O(n!): Extremely slow, used for permutations

### Asymptotic Notation

#### Big-O Notation
- Upper bound on runtime
- Worst-case scenario
- Most commonly used

#### Big-θ Notation
- Tight bound on runtime
- Both upper and lower bounds

#### Big-Ω Notation
- Lower bound on runtime
- Best-case scenario

## Sorting Algorithms

### Bubble Sort
- Repeatedly swaps adjacent elements if they're in wrong order
- Time: O(n²), Space: O(1)

### Merge Sort
- Divide-and-conquer algorithm
- Time: O(n log n), Space: O(n)
- Stable sort

### Insertion Sort
- Builds sorted array one item at a time
- Time: O(n²) worst case, O(n) best case
- Space: O(1)

### Quick Sort
- Divide-and-conquer with pivot selection
- Time: O(n log n) average, O(n²) worst case
- Space: O(log n)

### Selection Sort
- Finds minimum element and places it at beginning
- Time: O(n²), Space: O(1)

### Heap Sort
- Uses heap data structure
- Time: O(n log n), Space: O(1)

## Search Algorithms

### Linear Search
- Scans through all elements sequentially
- Time: O(n), Space: O(1)
- Works on unsorted data

### Binary Search
- Divides sorted array in half repeatedly
- Time: O(log n), Space: O(1)
- Requires sorted input

## Tree Data Structures

### Tree Basics
- Hierarchical data structure with nodes and edges
- Root node at top, leaf nodes at bottom

### Tree Traversal

#### Breadth First Search (BFS)
- Traverse level by level
- Uses queue
- Time: O(n), Space: O(n)

#### Depth First Search (DFS)
- Traverse deep into tree before backtracking
- Uses stack or recursion
- Time: O(n), Space: O(h) where h is height

#### In-Order Traversal
- Left → Node → Right
- For BST: produces sorted output

#### Pre-Order Traversal
- Node → Left → Right
- Useful for copying trees

#### Post-Order Traversal
- Left → Right → Node
- Useful for deleting trees

### Binary Trees
- Each node has at most two children (left and right)

### Binary Search Trees (BST)
- Left subtree contains smaller values
- Right subtree contains larger values
- Average search: O(log n), Worst case: O(n)

### AVL Trees
- Self-balancing binary search tree
- Height difference between subtrees ≤ 1
- Operations: O(log n)

### B-Trees
- Generalization of BST with multiple children
- Used in databases and file systems

## Graph Data Structures

### Graph Types

#### Directed Graph
- Edges have direction (one-way connections)

#### Undirected Graph
- Edges have no direction (bidirectional)

### Graph Search Algorithms

#### Breadth First Search (BFS)
- Explore all neighbors at current depth
- Uses queue
- Time: O(V + E)

#### Depth First Search (DFS)
- Explore deep before backtracking
- Uses stack or recursion
- Time: O(V + E)

### Shortest Path Algorithms

#### Dijkstra's Algorithm
- Finds shortest path in weighted graphs
- Non-negative weights only
- Time: O((V + E) log V)

#### Bellman-Ford Algorithm
- Finds shortest path with negative weights
- Can detect negative cycles
- Time: O(VE)

### Minimum Spanning Tree

#### Prim's Algorithm
- Builds MST by adding closest vertices
- Time: O(V²) or O((V + E) log V)

#### Kruskal's Algorithm
- Builds MST by adding shortest edges
- Uses Union-Find
- Time: O(E log E)

## Advanced Data Structures

### Trie
- Tree-like structure for storing strings
- Efficient string search and autocomplete
- Space: O(ALPHABET_SIZE * N)

### Segment Trees
- Tree structure for range queries
- Time: O(log n) for query and update

### Fenwick Trees (Binary Indexed Trees)
- Efficient for prefix sum queries
- Time: O(log n) for update and query

### Disjoint Set (Union-Find)
- Efficiently tracks partitions
- Operations: nearly O(1) amortized
- Used in graph connectivity problems

### Suffix Trees and Arrays
- Efficient string matching and analysis
- Space: O(n) for suffix array

## Complex Data Structures

### B/B+ Trees
- Balanced multi-way search trees
- Used in databases and file systems
- Time: O(log n)

### Skip List
- Probabilistic alternative to balanced trees
- Average: O(log n)

### ISAM (Indexed Sequential Access Method)
- File organization method

### 2-3 Trees
- Self-balancing tree with 2-3 nodes
- All leaves at same depth

## Indexing

### Linear Indexing
- Sequential search through index

### Tree-Based Indexing
- B-tree and B+-tree indices
- Logarithmic search time

## Problem Solving Techniques

### Brute Force
- Try all possible solutions
- Simple but often inefficient
- Good starting point

### Backtracking
- Incrementally build solution
- Abandon partial solution when invalid
- N-queens, sudoku solver

### Greedy Algorithms
- Make locally optimal choice at each step
- Hope for globally optimal result
- Activity selection, huffman coding

### Randomised Algorithms
- Use randomness in algorithm
- Often for optimization problems

### Divide and Conquer
- Break problem into subproblems
- Solve recursively
- Combine solutions

### Recursion
- Function calls itself
- Base case and recursive case
- Often used with divide and conquer

### Dynamic Programming
- Solve overlapping subproblems
- Store results to avoid recomputation
- Memoization or tabulation
- Classic: fibonacci, knapsack

### Two Pointer Technique
- Use two pointers moving in array
- Efficient for sorted arrays
- Container with most water, two sum

### Sliding Window Technique
- Maintain window of elements
- Expand and contract window
- Efficient for substring/subarray problems

### Fast and Slow Pointers
- Use pointers at different speeds
- Detect cycles in linked lists

### Cyclic Sort
- Sort array where elements are in range
- In-place, O(n) time

### Merge Intervals
- Combine overlapping intervals
- Sort and merge technique

### Kth Element
- Find k-th largest/smallest element
- Quickselect algorithm

### Two Heaps
- Maintain two heaps for balance
- Median finding

### Multi-threaded
- Concurrent algorithm design
- Thread synchronization

### Island Traversal
- Graph traversal for grid problems
- DFS/BFS on 2D grid

### Heap
- Priority-based data structure
- Min-heap, max-heap
- Operations: O(log n)

### A* Algorithm
- Pathfinding algorithm
- Heuristic-based search
- Used in game AI and robotics

## Platforms to Practice

### LeetCode
- Comprehensive problem collection
- Interview preparation
- Multiple difficulty levels

### Edabit
- Interactive coding challenges
- Gamified learning experience

### roadmap.sh
- Interactive version of this roadmap
- More comprehensive resources
- Related roadmaps and learning paths

## Related Roadmaps

### Computer Science
- Foundational concepts in CS

### Programming Languages
- Deep dive into specific languages

### System Design
- Large-scale system architecture

### Software Design & Architecture
- Design patterns and principles

## Continue Learning With

- Computer Science roadmap
- System Design roadmap