// backend/utils/shortestPath.js

function findShortestPath(source, destination, graph) {
  const distances = {};
  const visited = {};
  const previous = {};

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[source] = 0;

  while (true) {
    let closest = null;

    for (let node in distances) {
      if (!visited[node] && (closest === null || distances[node] < distances[closest])) {
        closest = node;
      }
    }

    if (closest === null || distances[closest] === Infinity) break;

    visited[closest] = true;

    for (let neighbor in graph[closest]) {
      let alt = distances[closest] + graph[closest][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = closest;
      }
    }
  }

  const path = [];
  let current = destination;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { path, distance: distances[destination] };
}

module.exports = { findShortestPath };
