type Graph = Map<number, number[]>

function bfs(
  graph: Graph,
  startNode: number,
  endNode: number
): number[] | null {
  if (startNode === endNode) return [startNode]

  const visited = new Set<number>()
  const queue: number[] = []
  const parents = new Map<number, number | null>()

  queue.push(startNode)
  visited.add(startNode)
  parents.set(startNode, null)

  while (queue.length > 0) {
    const currNode = queue.shift()
    if (!currNode) return null

    if (currNode === endNode) continue

    const neighbors = graph.get(currNode)

    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor)
          visited.add(neighbor)
          parents.set(neighbor, currNode)
        }
      }
    }
  }

  const shortestPath: number[] | null = traverseShortestPath(
    startNode,
    endNode,
    parents
  )
  return shortestPath
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
    if (nextParent === null || nextParent === undefined) {
      return null
    }

    currNode = nextParent
  }

  shortestPath.unshift(startNode)

  return shortestPath
}

export default bfs
