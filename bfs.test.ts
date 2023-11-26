import bfs from './bfs'

describe('Breadth-First Search Tests', () => {
  it('finds the shortest path in a simple graph', () => {
    const graph = new Map([
      [1, [2, 3]],
      [2, [4]],
      [3, [4, 5]],
      [4, [5]],
      [5, []],
    ])
    expect(bfs(graph, 1, 5)).toEqual([1, 3, 5])
  })

  it('finds the shortest path in a complex graph', () => {
    const graph = new Map<number, number[]>([
      [1, [2, 3]],
      [2, [4, 5]],
      [3, [5]],
      [4, [7]],
      [5, [6, 7]],
      [6, [8]],
      [7, [8]],
      [8, []],
    ])

    const shortestPath = bfs(graph, 1, 8)
    const expectedPaths = [
      [1, 2, 5, 7, 8],
      [1, 2, 4, 7, 8],
    ]

    expect(expectedPaths).toContainEqual(shortestPath)
    // Finds one of the shortest paths from 1 to 8
  })

  it('returns null if no path exists', () => {
    const graph = new Map([
      [1, [2]],
      [2, [3]],
      [3, []],
      [4, [5]],
      [5, []],
    ])
    expect(bfs(graph, 1, 5)).toBeNull()
  })

  it('handles a graph with a single node', () => {
    const graph = new Map([[1, []]])
    expect(bfs(graph, 1, 1)).toEqual([1])
  })

  it('returns null if the start node does not exist', () => {
    const graph = new Map([
      [2, [3]],
      [3, []],
    ])
    expect(bfs(graph, 1, 3)).toBeNull()
  })

  it('returns null if the end node does not exist', () => {
    const graph = new Map([
      [1, [2]],
      [2, []],
    ])
    expect(bfs(graph, 1, 3)).toBeNull()
  })

  it('handles an empty graph', () => {
    const graph = new Map()
    expect(bfs(graph, 1, 2)).toBeNull()
  })
})
