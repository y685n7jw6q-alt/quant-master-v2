import React from 'react';

interface MathRendererProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  latex,
  display = false,
  className = '',
}) => {
  React.useEffect(() => {
    // محاكاة عرض KaTeX - في التطبيق الفعلي ستستخدم react-katex
    console.log('Rendering LaTeX:', latex);
  }, [latex]);

  return (
    <div className={`math-renderer ${className}`}>
      <code>{latex}</code>
    </div>
  );
};
