type Graph = Map<number, number[]>

function dfs(
  graph: Graph,
  startNode: number,
  endNode: number
): number[] | null {
  if (!graph || graph.size === 0) {
    throw new Error('The graph is empty or not defined')
  }
  if (!graph.has(startNode)) {
    throw new Error('Start node does not exist in the graph')
  }
  if (!graph.has(endNode)) {
    throw new Error('End node does not exist in the graph')
  }

  const visited = new Set<number>()
  const parents = new Map<number, number | null>()

  const hasPath = dfsRecursive(graph, startNode, endNode, visited, parents)

  if (!hasPath) {
    return null
  }

  return reconstructPath(startNode, endNode, parents)
}

function dfsRecursive(
  graph: Graph,
  currentNode: number,
  endNode: number,
  visited: Set<number>,
  parents: Map<number, number | null>
): boolean {
  if (currentNode === endNode) {
    return true
  }

  visited.add(currentNode)

  const neighbors = graph.get(currentNode)
  if (!neighbors) return false

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      parents.set(neighbor, currentNode)
      if (dfsRecursive(graph, neighbor, endNode, visited, parents)) {
        return true
      }
    }
  }

  return false
}

function reconstructPath(
  startNode: number,
  endNode: number,
  parents: Map<number, number | null>
): number[] {
  const path: number[] = []
  let currentNode: number | null = endNode

  while (currentNode !== null) {
    path.unshift(currentNode)
    currentNode = parents.get(currentNode) ?? null
  }

  if (path[0] !== startNode) {
    throw new Error('Path reconstruction failed')
  }

  return path
}

export default dfs
