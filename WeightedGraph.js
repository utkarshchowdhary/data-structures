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

  bellmanFord(source) {
    // The Bellman-Ford algorithm is a SSSP algorithm.
    const dist = new Map();
    const prev = new Map();

    for (const v of this.adjacencyList.keys()) {
      if (v === source) {
        dist.set(source, 0); // distance from source to itself is zero.
        prev.set(source, null); // source vertex dosen't have a predecessor.
      } else {
        dist.set(v, Infinity); // unknown distance from source to each node it set to infinity.
      }
    }

    // relax edges repeatedly.
    // relaxation works by continuously shortening the calculated distance between vertices
    // by comparing that distance with other known distances.
    for (let i = 0; i < this.adjacencyList.size - 1; i++) {
      for (const [u, edges] of this.adjacencyList) {
        for (const [v, w] of edges) {
          const alt = dist.get(u) + w;
          if (alt < dist.get(v)) {
            dist.set(v, alt);
            prev.set(v, u);
          }
        }
      }
    }

    // detect nodes which are part of negative-weight cycle.
    // if there exists a negative cycle in the graph, then there is no shortest path.
    // going around the negative cycle an infinite number of times would continue to decrease
    // the cost of the path.
    for (let i = 0; i < this.adjacencyList.size - 1; i++) {
      for (const [u, edges] of this.adjacencyList) {
        for (const [v, w] of edges) {
          const alt = dist.get(u) + w;
          if (alt < dist.get(v)) {
            dist.set(v, -Infinity);
          }
        }
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

const negWtGraph = new WeightedGraph();
negWtGraph.addVertex(0);
negWtGraph.addVertex(1);
negWtGraph.addVertex(2);
negWtGraph.addVertex(3);
negWtGraph.addVertex(4);
negWtGraph.addVertex(5);
negWtGraph.addVertex(6);
negWtGraph.addVertex(7);
negWtGraph.addVertex(8);
negWtGraph.addVertex(9);
negWtGraph.addEdge(0, 1, 5);
negWtGraph.addEdge(1, 2, 20);
negWtGraph.addEdge(1, 5, 30);
negWtGraph.addEdge(1, 6, 60);
negWtGraph.addEdge(2, 3, 10);
negWtGraph.addEdge(2, 4, 75);
negWtGraph.addEdge(3, 2, -15);
negWtGraph.addEdge(4, 9, 100);
negWtGraph.addEdge(5, 4, 25);
negWtGraph.addEdge(5, 6, 5);
negWtGraph.addEdge(5, 8, 50);
negWtGraph.addEdge(6, 7, -50);
negWtGraph.addEdge(7, 8, -10);

console.log(negWtGraph);

console.log("Bellman Ford Shortest Path Algorithm");
console.log(negWtGraph.bellmanFord(0));
