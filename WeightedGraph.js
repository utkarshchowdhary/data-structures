const { PriorityQueue } = require("./min-priority-queue");

class WeightedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(node) {
    if (!this.adjacencyList.has(node)) this.adjacencyList.set(node, new Map());
  }

  addEdge(u, v, w) {
    this.adjacencyList.get(u).set(v, w);
  }

  Dijkstra(source) {
    // Dijkstra's Algorithm creates a tree of shortest paths from the starting vertex, the source,
    // to all other vertices in the graph.

    // min-priority queue where priorities are organised as weights is used to ensure that
    // minimum weights are explored first.
    const pq = new PriorityQueue();
    const dist = new Map();
    const prev = new Map();
    const visited = new Set();

    for (const v of this.adjacencyList.keys()) {
      if (v === source) {
        dist.set(source, 0); // distance from source to itself is zero.
        prev.set(source, null); // source vertex dosen't have a predecessor.
        pq.enqueue(source, 0);
      } else {
        dist.set(v, Infinity); // unknown distance from source to each node it set to infinity.
      }
    }

    while (!pq.isEmpty()) {
      const current = pq.dequeue();
      const u = current.value;

      // explore current vertex if it is not visited.
      if (!visited.has(u)) {
        for (const [v, w] of this.adjacencyList.get(u)) {
          const alt = dist.get(u) + w; // get the weight of neighbour vertex passing through current vertex.
          // if the neighbour vertex is unvisited and its weight passing through current vertex
          // is smaller than its previous weight.
          if (!visited.has(v) && alt < dist.get(v)) {
            dist.set(v, alt); // set its weight to the smaller weight passing through current vertex.
            prev.set(v, u); // set its previous to current vertex.
            pq.enqueue(v, alt); // add neighbour vertex to priority queue.
          }
        }
        // mark current vertex as visited once its neighbours are explored.
        visited.add(u);
      }
    }
    return { dist, prev };
  }
}

const graph = new WeightedGraph();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);
graph.addEdge(0, 1, 3);
graph.addEdge(0, 2, 7);
graph.addEdge(0, 3, 5);
graph.addEdge(1, 2, 1);
graph.addEdge(1, 4, 7);
graph.addEdge(2, 3, 3);
graph.addEdge(2, 4, 2);
graph.addEdge(2, 5, 1);
graph.addEdge(2, 6, 3);
graph.addEdge(3, 6, 2);
graph.addEdge(4, 5, 2);
graph.addEdge(4, 7, 1);
graph.addEdge(5, 6, 3);
graph.addEdge(5, 7, 3);
graph.addEdge(5, 8, 2);
graph.addEdge(6, 8, 4);
graph.addEdge(7, 8, 5);

console.log(graph);

console.log("Dijkstra's Shortest Path Algorithm");
console.log(graph.Dijkstra(0));
