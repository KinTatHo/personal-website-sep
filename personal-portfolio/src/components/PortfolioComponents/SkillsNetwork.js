import React, { useRef, useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { motion } from "framer-motion";

export const SkillsNetwork = () => {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const skills = [
    { id: "Java", group: 1 },
    { id: "Python", group: 1 },
    { id: "JavaScript", group: 1 },
    { id: "C/C++", group: 1 },
    { id: "Go", group: 1 },
    { id: "React", group: 2 },
    { id: "Node.js", group: 2 },
    { id: "HTML/CSS", group: 2 },
    { id: "Vim", group: 3 },
    { id: "VS Code", group: 3 },
    { id: "PyCharm", group: 3 },
    { id: "IntelliJ", group: 3 },
    { id: "Linux", group: 3 },
    { id: "Git", group: 3 },
    { id: "Pandas", group: 4 },
    { id: "NumPy", group: 4 },
    { id: "PyTorch", group: 4 },
    { id: "Matplotlib", group: 4 },
    { id: "TensorFlow", group: 4 },
  ];

  const links = skills.flatMap((skill, index) =>
    skills.slice(index + 1).map((otherSkill) => ({
      source: skill.id,
      target: otherSkill.id,
      value: Math.random(),
    }))
  );

  const data = {
    nodes: skills,
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
    const label = node.id;
    const fontSize = 16 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.4);

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
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
      <motion.div
        className="w-full"
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
        />
      </motion.div>
    </div>
  );
};
