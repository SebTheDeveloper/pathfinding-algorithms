type Graph = Map<number, number[]>

function bfs(
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

  if (startNode === endNode) return [startNode]

  const visited = new Set<number>()
  const queue: number[] = []
  const parents = new Map<number, number | null>()

  queue.push(startNode)
  visited.add(startNode)
  parents.set(startNode, null)

  while (queue.length > 0) {
    const currNode = queue.shift()
    if (currNode === undefined) {
      throw new Error('Unexpected error: Current node is undefined')
    }

    if (currNode === endNode) break

    const neighbors = graph.get(currNode)
    if (!neighbors) continue

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor)
        visited.add(neighbor)
        parents.set(neighbor, currNode)
      }
    }
  }

  const shortestPath: number[] | null = traverseShortestPath(
    startNode,
    endNode,
    parents
  )
  return shortestPath as number[] | null
}

function traverseShortestPath(
  startNode: number,
  endNode: number,
  parents: Map<number, number | null>
) {
  if (!parents.has(endNode)) return null

  const shortestPath: number[] = []
  let currNode: number = endNode

  while (currNode !== startNode) {
    shortestPath.unshift(currNode)

    const nextParent = parents.get(currNode)
    if (!nextParent) return null

    currNode = nextParent
  }

  shortestPath.unshift(startNode)

  return shortestPath
}

export default bfs
