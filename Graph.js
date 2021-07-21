/**
 * A Graph is a non-linear data structure consisting of a set of vertices (also called nodes)
 * and set of unordered edges for an undirected graph or set of ordered edges for an directed graph,
 * where each edge connects two vertices.
 * Nodes are entities whose relationships are expressed using edges.
 * Edges are the components that are used to represent the relationships between various nodes in a graph.
 * An edge between two nodes expresses a one-way or two-way relationship between the nodes.
 *
 * Types
 * Undirected - An undirected graph is a graph in which all the edges are bi-directional
 * i.e. the edges do not point in any specific direction.
 * Directed - A directed graph is a graph in which all the edges are uni-directional
 * i.e. the edges point in a single direction.
 * Weighted - In a weighted graph, each edge is assigned a weight or cost.
 * Cyclic - A graph is cyclic if the graph comprises a path that starts from a vertex and
 * ends at the same vertex.
 */

const { Queue } = require("./Queue");
const { Stack } = require("./stack-with-array");

class Graph {
  adjacencyList = new Map();

  addVertex(node) {
    if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, new Set());
  }

  addEdge(u, v) {
    // graph is bi-directional.
    this.adjacencyList.get(u).add(v);
    this.adjacencyList.get(v).add(u);
  }

  BFS(u) {
    // In BFS all of the neighbouring nodes at the present depth are explored prior to
    // moving on to the nodes at the next depth level.
    const visited = new Set();
    const queue = new Queue();

    // set the source node as visited so that it won't be added to the queue again
    // when encountered by its neighbouring nodes.
    visited.add(u);
    queue.enqueue(u);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      process.stdout.write(`${current} `);

      // add all non-visited neighbouring nodes of the current node to the queue
      // and set them as visited so that they won't be added again.
      for (const v of this.adjacencyList.get(current)) {
        if (!visited.has(v)) {
          visited.add(v);
          queue.enqueue(v);
        }
      }
    }
  }

  DFS(u) {
    // DFS involves exhaustive searches of all the nodes along each branch starting at the source node
    // before backtracking.
    const visited = new Set();
    const stack = new Stack();

    // set the source node as visited so that it won't be added to the stack again
    // when encountered by its neighbouring nodes.
    visited.add(u);
    stack.push(u);

    while (!stack.isEmpty()) {
      const current = stack.pop();

      process.stdout.write(`${current} `);

      // add all non-visited neighbouring nodes of the current node to the stack
      // and set them as visited so that they won't be added again.
      for (const v of this.adjacencyList.get(current)) {
        if (!visited.has(v)) {
          visited.add(v);
          stack.push(v);
        }
      }
    }
  }

  DFSRecursive(u) {
    this._DFSRecursive(u, new Set());
  }

  _DFSRecursive(u, visited) {
    visited.add(u);
    process.stdout.write(`${u} `);

    for (const v of this.adjacencyList.get(u)) {
      if (!visited.has(v)) {
        this._DFSRecursive(v, visited);
      }
    }
  }
}

const graph = new Graph();
/*
    3 - 4 - 5
   |   |   |
   1 - 2   6
   \  /
    0
*/
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(5, 6);

console.log(graph);

console.log("BFS");
graph.BFS(2);
console.log("\nDFS");
graph.DFS(2);
console.log("\nDFS RECURSIVE");
graph.DFSRecursive(2);
