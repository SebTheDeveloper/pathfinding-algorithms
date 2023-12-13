import unittest
from bfs import bfs

class TestBreadthFirstSearch(unittest.TestCase):

    def test_simple_graph(self):
        graph = {
            1: [2, 3],
            2: [4],
            3: [4, 5],
            4: [5],
            5: []
        }
        self.assertEqual(bfs(graph, 1, 5), [1, 3, 5])

    def test_complex_graph(self):
        graph = {
            1: [2, 3],
            2: [4, 5],
            3: [5],
            4: [7],
            5: [6, 7],
            6: [8],
            7: [8],
            8: []
        }
        shortest_path = bfs(graph, 1, 8)
        expected_paths = [
            [1, 2, 5, 7, 8],
            [1, 2, 5, 6, 8],
            [1, 2, 4, 7, 8],
            [1, 3, 5, 6, 8],
            [1, 3, 5, 7, 8]
        ]
        self.assertIn(shortest_path, expected_paths)

    def test_single_node_graph(self):
        graph = {1: []}
        self.assertEqual(bfs(graph, 1, 1), [1])

    def test_cyclic_graph(self):
        graph = {
            1: [2],
            2: [3],
            3: [1, 4],
            4: [5],
            5: []
        }
        self.assertEqual(bfs(graph, 1, 5), [1, 2, 3, 4, 5])

    def test_no_path_exists(self):
        graph = {
            1: [2],
            2: [3],
            3: [],
            4: [5],
            5: []
        }
        self.assertEqual(bfs(graph, 1, 5), [])

    def test_start_node_not_exist(self):
        graph = {
            2: [3],
            3: []
        }
        with self.assertRaises(ValueError) as context:
            bfs(graph, 1, 3)
        self.assertEqual(str(context.exception), 'Start node does not exist in the graph')

    def test_end_node_not_exist(self):
        graph = {
            1: [2],
            2: []
        }
        with self.assertRaises(ValueError) as context:
            bfs(graph, 1, 3)
        self.assertEqual(str(context.exception), 'End node does not exist in the graph')

    def test_empty_or_undefined_graph(self):
        graph = {}
        with self.assertRaises(ValueError) as context:
            bfs(graph, 1, 2)
        self.assertEqual(str(context.exception), 'The graph is empty or not defined')

if __name__ == '__main__':
    unittest.main()
