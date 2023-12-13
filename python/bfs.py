from collections import deque

def reconstruct_path(parent_nodes, start_value, end_value):
    path = []
    current = end_value
    while current != start_value:
        path.append(current)
        current = parent_nodes[current]
    path.append(start_value)
    
    return path[::-1]


def bfs(graph, start_value, end_value):
    if graph is None or len(graph) == 0:
        raise ValueError("The graph is empty or not defined")
    if start_value not in graph:
        raise ValueError("Start node does not exist in the graph")
    if end_value not in graph:
        raise ValueError("End node does not exist in the graph")

    visited = set([start_value])
    queue = deque([start_value])
    parent_nodes = {start_value: None}

    while queue:
        node = queue.popleft()
        if node == end_value:
            return reconstruct_path(parent_nodes, start_value, end_value)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                parent_nodes[neighbor] = node

    return []


try:
    print(bfs({1: [2], 2: [3], 3: [1, 4], 4: [5], 5: []}, 2, 5))
except ValueError as e:
    print(e)
