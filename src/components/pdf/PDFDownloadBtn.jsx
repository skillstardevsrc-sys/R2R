import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { sanitizeFilename } from '../../utils/sanitize';
import DesignBriefPDF from './DesignBriefPDF';
import Button from '../ui/Button';

export default function PDFDownloadBtn({
  state,
  variant = 'primary',
  size = 'lg',
  className = '',
  onSuccess
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const doc = <DesignBriefPDF state={state} />;
      const asPdf = pdf();
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const baseFilename = sanitizeFilename(state.client?.brandName || 'website');
      link.href = url;
      link.download = `${baseFilename}-website-design-brief.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDone(true);
      onSuccess?.();
      setTimeout(() => setIsDone(false), 3000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('Could not generate PDF. Please try again or check console logs.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={isDone ? 'secondary' : variant}
      size={size}
      disabled={isGenerating}
      onClick={handleDownload}
      className={className}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-black" />
          <span>Generating PDF...</span>
        </>
      ) : isDone ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download Design Brief (PDF)</span>
        </>
      )}
    </Button>
  );
}
