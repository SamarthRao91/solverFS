class Node:         
    
   
    def __init__(self, name):
        self.name = name
        self.edges  = []


    def addEdge(self, neighbor, weight):
        self.edges.append((neighbor, weight))

    def getNeighbors(self):
        return self.edges
    
    def printNeighbors(self):
      print([neighbor.name for neighbor, weight in self.edges])

    def __lt__(self, other):
        return self.name < other.name  