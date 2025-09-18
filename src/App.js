import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";

// ✅ Custom Node Component (Tailwind styled)
function CustomNode({ data }) {
  const [id, balance] = data.label.split("\n");

  return (
    <div className="rounded-xl border border-emerald-500 bg-emerald-50 shadow-md text-center min-w-[100px] max-w-[140px] px-2 py-2">
      <div className="bg-emerald-500 text-white px-2 py-1 rounded-md mb-1.5 text-[10px] leading-snug break-words">
        {id}
      </div>
      <div className="text-[10px] text-gray-800 font-semibold">{balance}</div>

      {/* Connection handles */}
      <Handle type="target" position="top" style={{ background: "#525252" }} />
      <Handle type="source" position="bottom" style={{ background: "#525252" }} />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

// ✅ Initial Nodes
const rawNodes = [
  {
    id: "TRXnRZa41L7XDN9B9n7z8ENWwyH2ptCr5E",
    data: { label: "TRXnRZa41L7XDN9B9n7z8ENWwyH2ptCr5E\n$9294" },
    position: { x: 100, y: 200 },
    type: "custom",
  },
  {
    id: "TTrwVdFFBP1Q9LpcPEQAQpVvpGhgN72d5i",
    data: { label: "TTrwVdFFBP1Q9LpcPEQAQpVvpGhgN72d5i\n$0" },
    position: { x: 100, y: 100 },
    type: "custom",
  },
  {
    id: "Binance-Hot 2",
    data: { label: "Binance-Hot 2\n$37,423" },
    position: { x: 100, y: -150 },
    type: "custom",
  },
  {
    id: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78",
    data: { label: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78\n$9294" },
    position: { x: 100, y: 0 },
    type: "custom",
  },
  {
    id: "TDHUbVi1QusDAwda8M65cusmz4mSseosao",
    data: { label: "TDHUbVi1QusDAwda8M65cusmz4mSseosao\n$5.97" },
    position: { x: -200, y: 200 },
    type: "custom",
  },
  {
    id: "Binance-Hot 7",
    data: { label: "Binance-Hot 7\n$106,382,769" },
    position: { x: -50, y: 400 },
    type: "custom",
  },
  {
    id: "Binance-Hot 3",
    data: { label: "Binance-Hot 3\n$69,547,108.53" },
    position: { x: -50, y: -150 },
    type: "custom",
  },
  {
    id: "TAN3Jf4Zna8rfzBFEModVPME8zdCCLvwQw",
    data: { label: "TAN3Jf4Zna8rfzBFEModVPME8zdCCLvwQw\n$0" },
    position: { x: 250, y: -150 },
    type: "custom",
  },
  {
    id: "TAuJGqJp1mccETrvVcZ1yXYffs38wJgNm9",
    data: { label: "TAuJGqJp1mccETrvVcZ1yXYffs38wJgNm9\n$24003" },
    position: { x: 250, y: 0 },
    type: "custom",
  },
  {
    id: "Binance-Cold 2",
    data: { label: "Binance-Cold 2\n$110000000" },
    position: { x: 390, y: 0 },
    type: "custom",
  },
  {
    id: "TChYEtSz93f7u9qRBxondx1oMNewwAeCJf",
    data: { label: "TChYEtSz93f7u9qRBxondx1oMNewwAeCJf\n$111349\n(BTTOLD)" },
    position: { x: 505, y: 0 },
    type: "custom",
  },
  {
    id: "TRQE3483UWRMge6L6BsrzpgmDfdxHo6rxX",
    data: { label: "TRQE3483UWRMge6L6BsrzpgmDfdxHo6rxX\n$82631" },
    position: { x: -200, y: 0 },
    type: "custom",
  },
  {
    id: "TJcxjnLYZAW6NXV32CGrcxr5afZKecL8Ep",
    data: { label: "TJcxjnLYZAW6NXV32CGrcxr5afZKecL8Ep\n$5628" },
    position: { x: -330, y: 0 },
    type: "custom",
  },
  {
    id: "TDCsZPDEtx43SE2ZA2XiD7feWrkPJ5ZZGs",
    data: { label: "TDCsZPDEtx43SE2ZA2XiD7feWrkPJ5ZZGs\n$2999" },
    position: { x: -450, y: 0 },
    type: "custom",
  },
  {
    id: "TYVrSuvFDjx6ucTRuyZBfgkXxzJCx1qxZ2",
    data: { label: "TYVrSuvFDjx6ucTRuyZBfgkXxzJCx1qxZ2\n$11248" },
    position: { x: 630, y: 0 },
    type: "custom",
  },
  {
    id: "Binance-Hot 5",
    data: { label: "Binance-Hot 5\n$16710751" },
    position: { x: -560, y: 0 },
    type: "custom",
  },
  {
    id: "TFitLexc7GK1G25dGszW5SxxDFwANSHQzw",
    data: { label: "TFitLexc7GK1G25dGszW5SxxDFwANSHQzw\n$55000" },
    position: { x: 250, y: 100 },
    type: "custom",
  },
  {
    id: "TUFRZHPE7pfjGWuAovHeDtDtFkiDnuZm1P",
    data: { label: "TUFRZHPE7pfjGWuAovHeDtDtFkiDnuZm1P\n$6099" },
    position: { x: 400, y: 100 },
    type: "custom",
  },
  {
    id: "TGK17bz7A1k6CDHS9QPsEdKnH1ExWrr9Bh",
    data: { label: "TGK17bz7A1k6CDHS9QPsEdKnH1ExWrr9Bh\n$21839" },
    position: { x: 550, y: 100 },
    type: "custom",
  },
  {
    id: "TXQLsiDL9yqC6BPKvMxCzaMaaxrrsnTPvf",
    data: { label: "TXQLsiDL9yqC6BPKvMxCzaMaaxrrsnTPvf\n$34707" },
    position: { x: -150, y: 100 },
    type: "custom",
  },
  {
    id: "TELvyqZZKAeoC9bgZzzj7GCgwmQ8bw3A8u",
    data: { label: "TELvyqZZKAeoC9bgZzzj7GCgwmQ8bw3A8u\n$123499" },
    position: { x: -280, y: 100 },
    type: "custom",
  },
  {
    id: "TUnu4eAnsXfTXK9qKxvAh6E11jjZjw34Ag",
    data: { label: "TUnu4eAnsXfTXK9qKxvAh6E11jjZjw34Ag\n$401378" },
    position: { x: -420, y: 100 },
    type: "custom",
  },
  {
    id: "TDrRYL2iCsAT8892Fw4H8AZ2XRZhp7DHzf",
    data: { label: "TDrRYL2iCsAT8892Fw4H8AZ2XRZhp7DHzf\n$7433" },
    position: { x: -550, y: 100 },
    type: "custom",
  },
  {
    id: "TMbzaY2otAX1DYMtYff6r3G64mma2W7Pg9",
    data: { label: "TMbzaY2otAX1DYMtYff6r3G64mma2W7Pg9\n$34583" },
    position: { x: -680, y: 100 },
    type: "custom",
  },
  {
    id: "TPEfWM9ZJGjCrVA5La5KdwjHfxWR8ncHEE",
    data: { label: "TPEfWM9ZJGjCrVA5La5KdwjHfxWR8ncHEE\n$107901" },
    position: { x: 680, y: 100 },
    type: "custom",
  },
  {
    id: "TNLSqpehrdwB2e1U9jN3pVEHTpfo9dFfEx",
    data: { label: "TNLSqpehrdwB2e1U9jN3pVEHTpfo9dFfEx\n$43007" },
    position: { x: 750, y: 0 },
    type: "custom",
  },
  {
    id: "TKiYPnG5EuUFfHmG9n8Zjb7VbGLcdCG7hf",
    data: { label: "TKiYPnG5EuUFfHmG9n8Zjb7VbGLcdCG7hf\n$360729" },
    position: { x: -680, y: 0 },
    type: "custom",
  },
  {
    id: "TMspMvz97dvD1EoDqy7e7TThPKfQP4YrXJ",
    data: { label: "TMspMvz97dvD1EoDqy7e7TThPKfQP4YrXJ\n$16949" },
    position: { x: 800, y: 100 },
    type: "custom",
  },
  {
    id: "TBZTpcx5ECbfgrWrnRudYRdS2nDp8CpMqw",
    data: { label: "TBZTpcx5ECbfgrWrnRudYRdS2nDp8CpMqw\n$11262" },
    position: { x: -820, y: 0 },
    type: "custom",
  },
  {
    id: "TMXPSZr3jkEYRgdwksUZVEF8GykVeHhV67",
    data: { label: "TMXPSZr3jkEYRgdwksUZVEF8GykVeHhV67\n$20000" },
    position: { x: -820, y: 100 },
    type: "custom",
  },
];

// ✅ Initial Edges
const rawEdges = [
  {
    id: "e2",
    source: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78",
    target: "TTrwVdFFBP1Q9LpcPEQAQpVvpGhgN72d5i",
    label: "$9294",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e1",
    source: "TTrwVdFFBP1Q9LpcPEQAQpVvpGhgN72d5i",
    target: "TRXnRZa41L7XDN9B9n7z8ENWwyH2ptCr5E",
    label: "$9294",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e3",
    source: "TDHUbVi1QusDAwda8M65cusmz4mSseosao",
    target: "Binance-Hot 7",
    label: "$9294",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e4",
    source: "TRXnRZa41L7XDN9B9n7z8ENWwyH2ptCr5E",
    target: "Binance-Hot 7",
    label: "$9294",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e5",
    source: "Binance-Hot 2",
    target: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78",
    label: "$10282.20",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e6",
    source: "Binance-Hot 3",
    target: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78",
    label: "$2222",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e7",
    source: "TAN3Jf4Zna8rfzBFEModVPME8zdCCLvwQw",
    target: "TEneWEhq6j4V8Ruvpbfhtrg1ZynWsAwa78",
    label: "$951",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e8",
    source: "Binance-Hot 2",
    target: "TAuJGqJp1mccETrvVcZ1yXYffs38wJgNm9",
    label: "$24003",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e9",
    source: "Binance-Hot 2",
    target: "TChYEtSz93f7u9qRBxondx1oMNewwAeCJf",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e10",
    source: "Binance-Hot 2",
    target: "Binance-Cold 2",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e11",
    source: "Binance-Hot 2",
    target: "TRQE3483UWRMge6L6BsrzpgmDfdxHo6rxX",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e12",
    source: "Binance-Hot 2",
    target: "TJcxjnLYZAW6NXV32CGrcxr5afZKecL8Ep",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e13",
    source: "Binance-Hot 2",
    target: "TDCsZPDEtx43SE2ZA2XiD7feWrkPJ5ZZGs",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e14",
    source: "Binance-Hot 2",
    target: "TYVrSuvFDjx6ucTRuyZBfgkXxzJCx1qxZ2",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e15",
    source: "Binance-Hot 2",
    target: "Binance-Hot 5",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e16",
    source: "Binance-Hot 2",
    target: "TFitLexc7GK1G25dGszW5SxxDFwANSHQzw",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e17",
    source: "Binance-Hot 2",
    target: "TUFRZHPE7pfjGWuAovHeDtDtFkiDnuZm1P",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e18",
    source: "Binance-Hot 2",
    target: "TXQLsiDL9yqC6BPKvMxCzaMaaxrrsnTPvf",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e19",
    source: "Binance-Hot 2",
    target: "TGK17bz7A1k6CDHS9QPsEdKnH1ExWrr9Bh",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e20",
    source: "Binance-Hot 2",
    target: "TELvyqZZKAeoC9bgZzzj7GCgwmQ8bw3A8u",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e21",
    source: "Binance-Hot 2",
    target: "TUnu4eAnsXfTXK9qKxvAh6E11jjZjw34Ag",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e22",
    source: "Binance-Hot 2",
    target: "TDrRYL2iCsAT8892Fw4H8AZ2XRZhp7DHzf",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e23",
    source: "Binance-Hot 2",
    target: "TMbzaY2otAX1DYMtYff6r3G64mma2W7Pg9",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e24",
    source: "Binance-Hot 2",
    target: "TPEfWM9ZJGjCrVA5La5KdwjHfxWR8ncHEE",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e25",
    source: "Binance-Hot 2",
    target: "TNLSqpehrdwB2e1U9jN3pVEHTpfo9dFfEx",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e26",
    source: "Binance-Hot 2",
    target: "TKiYPnG5EuUFfHmG9n8Zjb7VbGLcdCG7hf",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e27",
    source: "Binance-Hot 2",
    target: "TMspMvz97dvD1EoDqy7e7TThPKfQP4YrXJ",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e28",
    source: "Binance-Hot 2",
    target: "TBZTpcx5ECbfgrWrnRudYRdS2nDp8CpMqw",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e29",
    source: "Binance-Hot 2",
    target: "TMXPSZr3jkEYRgdwksUZVEF8GykVeHhV67",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
  {
    id: "e30",
    source: "Binance-Hot 2",
    target: "TAuJGqJp1mccETrvVcZ1yXYffs38wJgNm9",
    label: "",
    animated: true,
    style: { stroke: "black", strokeWidth: 2 },
    markerEnd: { type: "arrowclosed", color: "black" },
  },
];

function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(rawNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rawEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const { fitView, setViewport, getZoom } = useReactFlow();

  const onNodeClick = useCallback(
    (_, node) => {
      if (selectedNode === node.id) {
        setNodes((nds) => nds.map((n) => ({ ...n, hidden: false })));
        setEdges((eds) => eds.map((e) => ({ ...e, hidden: false })));
        setSelectedNode(null);
        setTimeout(() => {
          try {
            fitView({ padding: 0.1, duration: 500 });
          } catch {}
        }, 0);
        return;
      }

      setSelectedNode(node.id);

      const relatedEdges = edges.filter(
        (e) => e.source === node.id || e.target === node.id
      );
      const connectedIds = new Set([
        node.id,
        ...relatedEdges.map((e) => (e.source === node.id ? e.target : e.source)),
      ]);

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          hidden: !connectedIds.has(n.id),
        }))
      );
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          hidden: !(connectedIds.has(e.source) && connectedIds.has(e.target)),
        }))
      );

      const visibleNodes = nodes.filter((n) => connectedIds.has(n.id));
      if (visibleNodes.length > 0) {
        fitView({ nodes: visibleNodes, padding: 0.05, duration: 500 });
      }
    },
    [selectedNode, edges, nodes, fitView, setEdges, setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      const amount = prompt("Enter transaction amount (TRX):");
      if (!amount) return;

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            label: `${amount} TRX`,
            data: { amount: Number(amount) },
            markerEnd: { type: "arrowclosed" },
            style: { stroke: "black", strokeWidth: 2.5 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const zoomOutSmall = () => {
    const z = getZoom();
    setViewport({ x: 0, y: 0, zoom: Math.max(0.3, z - 0.1) }, { duration: 200 });
  };
  const zoomInSmall = () => {
    const z = getZoom();
    setViewport({ x: 0, y: 0, zoom: Math.min(2, z + 0.1) }, { duration: 200 });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Bar */}
    

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-3 md:py-4">
        <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-3 md:gap-4">
          {/* Sidebar - always visible and appears on top on small screens */}
          <aside className="md:static block">
            <div className="rounded-xl border border-slate-200 bg-white p-3 md:p-4 shadow-sm">
              <h3 className="text-sm md:text-base font-semibold mb-2 md:mb-3">
                Graph Controls
              </h3>
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                <span>Total Nodes</span>
                <span className="font-semibold text-slate-900">{nodes.length}</span>
              </div>
              {selectedNode && (
                <div className="mt-2.5 text-xs md:text-sm text-slate-600">
                  <span className="block">Focused:</span>
                  <span className="font-mono break-all text-slate-900">{selectedNode}</span>
                </div>
              )}

              {/* Zoom controls */}
              <div className="mt-3 flex items-center gap-2">
                <button onClick={zoomOutSmall} className="px-2 py-1 rounded border border-slate-200 text-xs hover:bg-slate-50">-</button>
                <button onClick={() => fitView({ padding: 0.05, duration: 300 })} className="px-2 py-1 rounded border border-slate-200 text-xs hover:bg-slate-50">Fit</button>
                <button onClick={zoomInSmall} className="px-2 py-1 rounded border border-slate-200 text-xs hover:bg-slate-50">+</button>
              </div>
            </div>
          </aside>

          {/* Graph Canvas */}
          <section className="rounded-xl border border-slate-200 overflow-hidden bg-white h-[95vh] sm:h-[95h] md:h-[95vh] shadow-sm">
            <div className="w-full h-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
                fitViewOptions={{ padding: 0.05 }}
                defaultViewport={{ x: 0, y: 0, zoom: 0.65 }}
                minZoom={0.3}
                maxZoom={2}
              >
                <MiniMap className="!bg-white !border !border-slate-200 !rounded-md !shadow-sm" />
                <Controls className="!bg-white !border !border-slate-200 !rounded-md !shadow-sm" />
                <Background className="opacity-80" />
              </ReactFlow>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Graph />
    </ReactFlowProvider>
  );
}
