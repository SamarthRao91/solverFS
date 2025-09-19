import { use, useState } from "react";
import "./App.css";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function PFGraphMaker() {
  const [nodes, setNodes] = useState([]);
  const [mode, setMode] = useState("addNode");
  const [selectedNode, setSelectedNode] = useState(null);
  const [edges, setEdges] = useState([]);

  const handleClick = (event) => {
    if (mode === "addNode") {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const label = prompt("Enter a label");
      if (label) {
        addNode(x, y, label);
      }
    }
  };

  const handleClick2 = (nodeId, e) => {
    e.stopPropagation();
    if (mode === "addEdge") {
      if (selectedNode === null) {
        setSelectedNode(nodeId);
      } else {
       const label = prompt("Enter a edge weight");
        const newEdge = {
          id: edges.length + 1,
          fromID: selectedNode,
          toID: nodeId,
          label: label,
          color: "#000000ff",
        };
        setSelectedNode(null);
        setEdges([...edges, newEdge]);
      }
    }
  };

  const addNode = (x, y, label) => {
    const newNode = {
      id: nodes.length + 1,
      x: x,
      y: y,
      radius: 40,
      color: "#90EE90",
      label: label,
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (nodeId, newX, newY) => {
    setNodes(
      nodes.map((node) =>
        node.id === nodeId ? { ...node, x: newX, y: newY } : node,
      ),
    );
  };

const LineDiv = ({ x1, y1, x2, y2, color, thickness = 3, label }) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  return (
    <div
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: length,
        height: thickness,
        backgroundColor: color,
        transformOrigin: "0 50%",
        transform: `rotate(${angle}deg)`,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        color: "black",
      }}
    >
      <span
        style={{
          transform: `rotate(${-angle}deg) translateX(-15px) translateY(-15px)`,
          whiteSpace: "nowrap",
          // The translateY value moves the label up
        }}
      >
        {label}
      </span>
    </div>
  );
};


  const CircleDiv = ({
    x,
    y,
    radius,
    color,
    label,
    mode,
    nodeId,
    onDragEnd,
  }) => (
    <motion.div
      onClick={(e) => handleClick2(nodeId, e)}
      drag={mode === "addNode"}
      onDragEnd={(event, info) => {
        onDragEnd(nodeId, x + info.offset.x, y + info.offset.y);
      }}
      dragMomentum={false}
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        backgroundColor: color,
        borderRadius: "50%",
        border: "2px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "center",
        cursor: "grab",
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {label}
    </motion.div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => setMode("addNode")}
          style={{ backgroundColor: mode === "addNode" ? "green" : "gray" }}
        >
          Add Node
        </button>

        <button
          onClick={() => setMode("addEdge")}
          style={{ backgroundColor: mode === "addEdge" ? "green" : "gray" }}
        >
          Add Edge
        </button>
        <div
          onClick={handleClick}
          style={{
            width: "1500px",
            height: "1500px",
            backgroundColor: "#ffffff",
            border: "1px solid black",
            position: "relative",
          }}
        >
          {nodes.map((node) => (
            <CircleDiv
              key={node.id}
              nodeId={node.id}
              x={node.x}
              y={node.y}
              radius={node.radius}
              color={node.color}
              label={node.label}
              mode={mode}
              onDragEnd={updateNodePosition}
            />
          ))}

          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.fromID);
            const toNode = nodes.find((n) => n.id === edge.toID);

            return fromNode && toNode ? (
              <LineDiv
                key={edge.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                color="black"
                thickness={3}
                label={edge.label}
              />
            ) : null;
          })}
        </div>
      </header>
    </div>
  );
}

export default PFGraphMaker;
