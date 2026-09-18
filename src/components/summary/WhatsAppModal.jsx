import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Download, CheckCircle2, AlertCircle, Copy, Phone, UserCheck, Loader2, Share2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { formatWhatsAppMessage, generateWhatsAppLink } from '../../utils/whatsapp';
import DesignBriefPDF from '../pdf/DesignBriefPDF';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PDFDownloadBtn from '../pdf/PDFDownloadBtn';
import TextField from '../ui/TextField';
import { sanitizeFilename } from '../../utils/sanitize';

const QUICK_NUMBERS = [
  { label: 'Primary Contact 1', number: '+91 75581 38968', raw: '+917558138968' },
  { label: 'Primary Contact 2', number: '+91 95855 75354', raw: '+919585575354' }
];

export default function WhatsAppModal({ isOpen, onClose, state }) {
  const clientPhone = state.client?.whatsapp || '';
  const [selectedPhone, setSelectedPhone] = useState(clientPhone || QUICK_NUMBERS[0].raw);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadedNotice, setDownloadedNotice] = useState(false);

  useEffect(() => {
    if (clientPhone) {
      setSelectedPhone(clientPhone);
    } else {
      setSelectedPhone(QUICK_NUMBERS[0].raw);
    }
  }, [clientPhone, isOpen]);

  const message = formatWhatsAppMessage(state);
  const waLink = generateWhatsAppLink(selectedPhone, message);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Smart Send: Generates PDF + Text, attempts direct File Share or Auto-downloads PDF & opens WhatsApp
  const handleSmartSend = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setDownloadedNotice(false);

    try {
      // 1. Generate Single-Page Light PDF Blob
      const doc = <DesignBriefPDF state={state} />;
      const asPdf = pdf();
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      
      const brandBase = sanitizeFilename(state.client?.brandName || 'Website');
      const filename = `${brandBase}-Design-Brief.pdf`;
      const pdfFile = new File([blob], filename, { type: 'application/pdf' });

      // 2. Mobile/Supported Browser Web Share API (File + Message attached directly)
      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: `${state.client?.brandName || 'Brand'} - Website Design Brief`,
          text: message,
          files: [pdfFile]
        });
        setIsProcessing(false);
        return;
      }

      // 3. Desktop / Fallback: Auto-download PDF & open WhatsApp Web link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadedNotice(true);

      // Open WhatsApp chat
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Share or PDF generation fallback:', err);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Design Brief & PDF on WhatsApp"
      subtitle="Send formatted text + auto-attached single page PDF brief"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-5">
        {/* Helper Notice */}
        <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-text-muted leading-relaxed">
            <span className="text-emerald-300 font-bold block mb-0.5">Automated PDF & Text Dispatch</span>
            Clicking <strong className="text-white">Send PDF & Message on WhatsApp</strong> automatically compiles your single-page PDF brief, initiates download/share, and opens WhatsApp pre-filled with full project specs.
          </div>
        </div>

        {downloadedNotice && (
          <div className="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl text-xs text-amber-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>PDF Brief downloaded to your device! Simply attach it in the opened WhatsApp window.</span>
          </div>
        )}

        {/* Select Target WhatsApp Number */}
        <div className="flex flex-col gap-2 bg-white/5 p-4 rounded-xl border border-white/10">
          <label className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>Select Destination WhatsApp Number:</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-1">
            {QUICK_NUMBERS.map((item) => {
              const isSelected = selectedPhone === item.raw;
              return (
                <button
                  key={item.raw}
                  type="button"
                  onClick={() => setSelectedPhone(item.raw)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between gap-2 transition-all text-xs
                    ${isSelected 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md' 
                      : 'bg-black/40 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase">{item.label}</span>
                    <span className="font-mono text-xs">{item.number}</span>
                  </div>
                  {isSelected && <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {clientPhone ? (
            <button
              type="button"
              onClick={() => setSelectedPhone(clientPhone)}
              className={`p-2.5 rounded-lg border text-left flex items-center justify-between gap-2 transition-all text-xs mt-1
                ${selectedPhone === clientPhone 
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md' 
                  : 'bg-black/40 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted uppercase">Client Number (From Brief)</span>
                <span className="font-mono text-xs">{clientPhone}</span>
              </div>
              {selectedPhone === clientPhone && <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />}
            </button>
          ) : null}

          {/* Custom Edit Input */}
          <div className="mt-2">
            <TextField
              id="custom-whatsapp-input"
              label="Or enter custom number:"
              placeholder="e.g. +91 75581 38968 or +91 95855 75354"
              value={selectedPhone}
              onChange={(e) => setSelectedPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Message Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Prepared WhatsApp Message Summary
            </label>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="text-xs text-text-muted hover:text-white flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto bg-black/60 p-3.5 rounded-xl border border-white/10 text-xs font-mono text-white/90 whitespace-pre-line leading-relaxed">
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-white/10">
          <PDFDownloadBtn
            state={state}
            variant="outline"
            size="md"
            className="w-full sm:w-1/3"
          />

          <Button
            variant="primary"
            size="md"
            icon={isProcessing ? Loader2 : Send}
            disabled={isProcessing}
            onClick={handleSmartSend}
            className="w-full sm:w-2/3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg"
          >
            {isProcessing ? 'Preparing PDF & Opening...' : `Send PDF & Message on WhatsApp`}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
