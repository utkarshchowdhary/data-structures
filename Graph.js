/*
  -A Graph is a non-linear data structure consisting of a set of vertices (also called nodes) 
   and set of unordered edges for an undirected graph or set of ordered edges for an directed graph, 
   where each edge connects two vertices.
  -Nodes are entities whose relationships are expressed using edges.
  -Edges are the components that are used to represent the relationships between various nodes in a graph. 
  -An edge between two nodes expresses a one-way or two-way relationship between the nodes.

  Types:
  -Undirected - An undirected graph is a graph in which all the edges are bi-directional 
   i.e. the edges do not point in any specific direction.
  -Directed - A directed graph is a graph in which all the edges are uni-directional 
   i.e. the edges point in a single direction.
  -Weighted - In a weighted graph, each edge is assigned a weight or cost.
  -Cyclic - A graph is cyclic if the graph comprises a path that starts from a vertex and 
   ends at the same vertex.
*/

class Graph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacencyList = {};
  }

  addVertex(node) {
    this.adjacencyList[node] = [];
    this.numberOfNodes++;
  }

  addEdge(u, v) {
    // graph is bi-directional.
    this.adjacencyList[u].push(v);
    this.adjacencyList[v].push(u);
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
graph.addVertex("0");
graph.addVertex("1");
graph.addVertex("2");
graph.addVertex("3");
graph.addVertex("4");
graph.addVertex("5");
graph.addVertex("6");
graph.addEdge("0", "1");
graph.addEdge("0", "2");
graph.addEdge("1", "2");
graph.addEdge("1", "3");
graph.addEdge("2", "4");
graph.addEdge("3", "4");
graph.addEdge("4", "5");
graph.addEdge("5", "6");

console.log(graph);
