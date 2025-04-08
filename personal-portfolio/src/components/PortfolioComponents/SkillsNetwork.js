import React, { useRef, useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { motion, AnimatePresence } from "framer-motion";
// Removed Star, Plus. Kept XCircle for the modal close.
import { XCircle } from "lucide-react"; 

export const SkillsNetwork = () => {
  const fgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  // Removed playerLevel, experience, skillPoints state
  const [selectedNode, setSelectedNode] = useState(null);

  // Simplified skills data: Removed level. Group can still be used for color coding.
  const skillsData = [
    // Group 1: Languages
    { id: "Java", group: 1, description: "Object-oriented language for enterprise applications." },
    { id: "Python", group: 1, description: "Versatile language for web dev, data science, AI." },
    { id: "JavaScript", group: 1, description: "Core language for web front-end and Node.js backend." },
    { id: "C/C++", group: 1, description: "High-performance languages for systems programming." },
    { id: "Go", group: 1, description: "Efficient language for concurrent systems." },
    // Group 2: Web Technologies
    { id: "React", group: 2, description: "Popular JavaScript library for building user interfaces." },
    { id: "Node.js", group: 2, description: "JavaScript runtime for building server-side applications." },
    { id: "HTML/CSS", group: 2, description: "Fundamental languages for structuring and styling web pages." },
    { id: "FastAPI", group: 2, description: "Modern Python framework for building APIs." }, // Example addition
    // Group 3: Tools & Platforms
    { id: "Vim", group: 3, description: "Highly configurable text editor." },
    { id: "VS Code", group: 3, description: "Widely-used source code editor." },
    { id: "Linux", group: 3, description: "Open-source operating system." },
    { id: "Git", group: 3, description: "Version control system for tracking code changes." },
    { id: "Docker", group: 3, description: "Platform for developing, shipping, and running applications in containers." }, // Example addition
    // Group 4: Data Science / AI
    { id: "Pandas", group: 4, description: "Python library for data manipulation and analysis." },
    { id: "NumPy", group: 4, description: "Python library for numerical computing." },
    { id: "PyTorch", group: 4, description: "Open-source machine learning framework." },
    { id: "TensorFlow", group: 4, description: "End-to-end platform for machine learning." },
    { id: "Scikit-learn", group: 4, description: "Python library for machine learning tasks." }, // Example addition
  ];

  // Removed the 'nodes' state derived from skills, use skillsData directly
  // Links can be generated based on groups or predefined connections if desired
  // Simple link generation (all nodes within a group linked, plus some cross-group links)
  const links = [];
  const addedLinks = new Set();

  skillsData.forEach((skill, i) => {
    // Link within the same group
    skillsData.slice(i + 1).forEach(otherSkill => {
      if (skill.group === otherSkill.group) {
        const linkKey = [skill.id, otherSkill.id].sort().join('-');
        if (!addedLinks.has(linkKey)) {
          links.push({ source: skill.id, target: otherSkill.id, value: 1 }); // Simple value
          addedLinks.add(linkKey);
        }
      }
    });
    // Example: Add some cross-group links manually if needed
    if (skill.id === 'Python') {
       links.push({ source: 'Python', target: 'React', value: 0.5 });
       links.push({ source: 'Python', target: 'FastAPI', value: 0.8 });
       links.push({ source: 'Python', target: 'Pandas', value: 0.9 });
    }
     if (skill.id === 'JavaScript') {
       links.push({ source: 'JavaScript', target: 'React', value: 0.9 });
       links.push({ source: 'JavaScript', target: 'Node.js', value: 0.8 });
    }
  });


  const graphData = {
    nodes: skillsData, // Use skillsData directly
    links: links,
  };

  useEffect(() => {
    const updateDimensions = () => {
      // Adjust width/height calculation if needed
      setDimensions({
        width: window.innerWidth * 0.9, // Example: Use % of window width
        height: window.innerHeight * 0.7, // Example: Use % of window height
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    // Adjust forces as needed for desired graph appearance
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-150); // Adjusted charge strength
      fgRef.current.d3Force("link").distance(60);    // Adjusted link distance
      fgRef.current.d3Force("center").strength(0.1); // Ensure it centers
    }
  }, []);

  // Updated node rendering: Removed level display
  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.id; // Just the skill name
    const fontSize = Math.max(12, 16 / globalScale); // Ensure minimum font size
    ctx.font = `bold ${fontSize}px Sans-Serif`; // Made font bold
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.6); // Adjusted padding

    // Use group for color - more distinct colors might be better
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6']; // Example color array
    ctx.fillStyle = hexToRgba(colors[node.group % colors.length] || '#6B7280', 0.9); // Use modulo for safety

    // Draw background rectangle
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );

    // Draw text
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white"; // White text
    ctx.fillText(label, node.x, node.y);

    node.__bckgDimensions = bckgDimensions; // Store dimensions for pointer interaction
  };

  // Helper function to convert hex color to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  const handleNodeClick = (node) => {
    setSelectedNode(node); // Select node to show details
  };

  // Removed upgradeSkill function

  return (
    // Adjusted padding and height
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-4 md:p-8"> 
      <motion.h2
        // Adjusted margin
        className="text-4xl font-bold mb-6 text-center pixel-font" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Updated Title */}
        Skills Network Visualization
      </motion.h2>
      
      {/* Removed the top bar displaying level, xp, skill points */}
      
      <motion.div
        // Use calculated dimensions, added border for definition
        className="w-full relative border border-gray-700 rounded-lg" 
        style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px` }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeAutoColorBy="group" // Keep coloring by group
          nodeCanvasObject={nodeCanvasObject} // Use updated rendering function
          nodePointerAreaPaint={(node, color, ctx) => { // Keep pointer area logic
            ctx.fillStyle = color;
            const size = node.__bckgDimensions
              ? Math.max(...node.__bckgDimensions)
              : 20;
            // Draw a slightly larger rectangle for easier clicking
            ctx.fillRect(node.x - size / 1.8, node.y - size / 1.8, size * 1.1, size * 1.1); 
          }}
          linkWidth={link => link.value * 1.5 || 1} // Link width based on value
          linkColor={() => "rgba(255, 255, 255, 0.3)"} // Slightly dimmer links
          width={dimensions.width}
          height={dimensions.height}
          onNodeClick={handleNodeClick} // Keep node click handler
          // Added zoom/pan controls
          enableZoomInteraction={true}
          enablePanInteraction={true}
          minZoom={0.5}
          maxZoom={5}
        />

        {/* Modal display on node click - simplified */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              // Positioned modal at bottom center
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 p-4 rounded-lg shadow-lg w-11/12 max-w-md z-10" 
            >
               <XCircle // Close button inside modal
                className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setSelectedNode(null)}
                size={20}
              />
              <h3 className="text-xl font-bold mb-2 text-blue-300 pixel-font">{selectedNode.id}</h3>
              {/* Removed Level display */}
              {/* Display description if available */}
              {selectedNode.description && (
                 <p className="text-sm text-gray-300 pixel-font">{selectedNode.description}</p>
              )}
              {/* Removed Upgrade button */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
       {/* Added hint text */}
       <p className="mt-4 text-sm text-gray-400 pixel-font">
         Click on a node to see details. Scroll to zoom, drag to pan.
       </p>
    </div>
  );
};