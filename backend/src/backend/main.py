import re
import math
from node import Node
from queue import PriorityQueue
from fastapi import FastAPI

app = FastAPI(title="Algorithm API")



def create_graph (graph_dict: dict):
    nodes = {}
    for city, _ in graph_dict.items():
        nodes[city] = Node(city)
    
    for city, neighbors in graph_dict.items():
        for neighbor, weight in neighbors:
            cityNode = nodes[city]
            cityNode.addEdge(nodes[neighbor], weight)
    
    return nodes
        
def createPathFinder():

    print("You have selected Path Finder")

    print("Please enter a list of cities, or locations to generate the problem using the below format:")
    print("Seattle: {Bellevue:10,Redmond:2,Bothell:12}")
    print("Repeat for all cities that you want and enter \"done\" ")
    
    lines = []
    
    while True:
        line = input()
        if(line == "done"):
            break
        else:
            lines.append(line)
        
    graph_dict = {}

    for line in lines:
        city, neighbors_str =  line.split(":", 1) 
        neighbors_str = neighbors_str[2:-1]
       
        graph_dict[city] = []
    
        neighbors_list = neighbors_str.split(",")
        for neighbor in neighbors_list:
            name, weight = neighbor.split(":")
            graph_dict[city].append((name, int(weight)))


    nodes = create_graph(graph_dict)
    return nodes

def createProblem(problems_created):
    print("Please select a problem:")
    print("\"Path Finder\"")


    problem = input("Selection: ")


    if(problem == "Path Finder"):
      pf_nodes = createPathFinder()
      problems_created["Path Finder"] = pf_nodes
   
    else:
      print("Invalid!")
    
    return problems_created

def Djikstra(start: Node, end: Node, nodes: dict):
    prq =  PriorityQueue()
    prq.put((0, start))

    # this is going to be done through nodes
    visited = []
    
    distances = {node: math.inf for node in nodes.values()}  
    distances[start] = 0


    prev = {}

    while not prq.empty():
        currentDistance, currentNode = prq.get()
        if currentNode not in visited: 
                visited.append(currentNode)
                if(currentNode == end):
                    return getPath(prev, start, end)
                neighbors = currentNode.getNeighbors()
                for neighborNode, edgeWeight in neighbors:
                        if edgeWeight + distances[currentNode] < distances[neighborNode]:
                            distances[neighborNode] = edgeWeight + distances[currentNode]
                            prev[neighborNode] = currentNode
                            prq.put((distances[neighborNode], neighborNode))

    return 'no path found'
                               
def getPath(prev : dict, start: Node, end: Node):
    path  = []
    currentNode = end
    while(currentNode != start):
        path.append(currentNode.name)
        currentNode = prev[currentNode]
    
    path.append(start.name)
    path.reverse()
    return path

def solvePathFinder(problems_created : dict):
      pf_nodes = problems_created["Path Finder"]

      print(list(pf_nodes.keys()))
      print("Please choose a start node")
      startNode  = input("Selection: ")
      startNode = pf_nodes[startNode]

      print("Please choose a destinaton node")
      destinationNode = input("Selection: ")
      destinationNode = pf_nodes[destinationNode]

      print("Please choose an algorithim: ")
      print("Djikstra")
      selection = input("Selection: ")
      if(selection == "Djikstra"):
            path = Djikstra(startNode, destinationNode, pf_nodes)
            print(path)


def solveProblems(problems_created: dict):
    if(len(list(problems_created.keys())) == 0  ):
        print("No Problems Created")
        return 
    print("Please choose a problem to run your algoritm on")
    for problem_name, _ in problems_created.items():
        print(f"\"{problem_name}\"")

    selection = input("Selection: ")

    if(selection == "Path Finder"):
        solvePathFinder(problems_created)

problems_created = {}
while(True):
    print("Create (C) a problem or Run (R) a algorithm or EXIT (E)")
    selection = input("Selection: ").capitalize()
    if(selection == "C"):
       problems_created =  createProblem(problems_created)
    if(selection == "R"):
       solveProblems(problems_created)    
    if(selection == "E"):
        break



