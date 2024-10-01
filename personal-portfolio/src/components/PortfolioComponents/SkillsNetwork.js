import React, { useRef, useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, XCircle } from "lucide-react";

export const SkillsNetwork = () => {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [skillPoints, setSkillPoints] = useState(5);
  const [selectedNode, setSelectedNode] = useState(null);

  const skills = [
    { id: "Java", group: 1, level: 1 },
    { id: "Python", group: 1, level: 1 },
    { id: "JavaScript", group: 1, level: 1 },
    { id: "C/C++", group: 1, level: 1 },
    { id: "Go", group: 1, level: 1 },
    { id: "React", group: 2, level: 1 },
    { id: "Node.js", group: 2, level: 1 },
    { id: "HTML/CSS", group: 2, level: 1 },
    { id: "Vim", group: 3, level: 1 },
    { id: "VS Code", group: 3, level: 1 },
    { id: "PyCharm", group: 3, level: 1 },
    { id: "IntelliJ", group: 3, level: 1 },
    { id: "Linux", group: 3, level: 1 },
    { id: "Git", group: 3, level: 1 },
    { id: "Pandas", group: 4, level: 1 },
    { id: "NumPy", group: 4, level: 1 },
    { id: "PyTorch", group: 4, level: 1 },
    { id: "Matplotlib", group: 4, level: 1 },
    { id: "TensorFlow", group: 4, level: 1 },
  ];

  const [nodes, setNodes] = useState(skills);

  const links = skills.flatMap((skill, index) =>
    skills.slice(index + 1).map((otherSkill) => ({
      source: skill.id,
      target: otherSkill.id,
      value: Math.random(),
    }))
  );

  const data = {
    nodes: nodes,
    links: links,
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.8,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-200);
      fgRef.current.d3Force("link").distance(50);
    }
  }, []);

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = `${node.id} (Lv. ${node.level})`;
    const fontSize = 16 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.4);

    ctx.fillStyle = `rgba(${node.group * 50}, ${255 - node.group * 50}, ${
      node.group * 25
    }, 0.8)`;
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(label, node.x, node.y);

    node.__bckgDimensions = bckgDimensions;
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const upgradeSkill = () => {
    if (skillPoints > 0) {
      setNodes(
        nodes.map((n) =>
          n.id === selectedNode.id ? { ...n, level: n.level + 1 } : n
        )
      );
      setSkillPoints(skillPoints - 1);
      setExperience(experience + 10);
      if (experience + 10 >= playerLevel * 100) {
        setPlayerLevel(playerLevel + 1);
        setSkillPoints(skillPoints + 4);
      }
      setSelectedNode({ ...selectedNode, level: selectedNode.level + 1 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills Network
      </motion.h2>
      <div className="mb-4 flex justify-between w-full">
        <div>
          Level: {playerLevel} <Star className="inline-block text-yellow-400" />
        </div>
        <div>
          Experience: {experience}/{playerLevel * 100}
        </div>
        <div>Skill Points: {skillPoints}</div>
      </div>
      <motion.div
        className="w-full relative"
        style={{ height: `${dimensions.height}px` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={data}
          nodeAutoColorBy="group"
          nodeCanvasObject={nodeCanvasObject}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.fillStyle = color;
            const size = node.__bckgDimensions
              ? Math.max(...node.__bckgDimensions)
              : 20;
            ctx.fillRect(node.x - size / 2, node.y - size / 2, size, size);
          }}
          linkWidth={1}
          linkColor={() => "rgba(255, 255, 255, 0.4)"}
          width={dimensions.width}
          height={dimensions.height}
          onNodeClick={handleNodeClick}
        />
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{selectedNode.id}</h3>
              <p>Level: {selectedNode.level}</p>
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center"
                onClick={upgradeSkill}
                disabled={skillPoints === 0}
              >
                Upgrade <Plus className="ml-2" />
              </button>
              <XCircle
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setSelectedNode(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
