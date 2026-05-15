import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { RefreshCw } from 'lucide-react';

// Inicialitzem mermaid globalment
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#f1f5f9',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#cbd5e1',
    lineColor: '#64748b',
    secondaryColor: '#e2e8f0',
    tertiaryColor: '#f8fafc',
  },
  securityLevel: 'loose',
});

export default function MermaidDiagram({ chart, id }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const renderChart = async () => {
      try {
        setError(false);
        // Evitem id conflictes assegurant-nos que és únic
        const uniqueId = `mermaid-${id}-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: generatedSvg } = await mermaid.render(uniqueId, chart);
        
        if (isMounted) {
          setSvg(generatedSvg);
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (isMounted) {
          setError(true);
        }
      }
    };

    if (chart) {
      renderChart();
    }

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 border border-destructive/20 bg-destructive/5 rounded-lg text-destructive text-sm">
        <RefreshCw className="mr-2 h-4 w-4" /> Error en renderitzar el diagrama.
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex justify-center my-6 overflow-x-auto bg-card p-4 rounded-xl border border-border shadow-sm"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
