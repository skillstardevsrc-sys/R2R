import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Download, CheckCircle2, AlertCircle, Copy, Phone, UserCheck } from 'lucide-react';
import { formatWhatsAppMessage, generateWhatsAppLink } from '../../utils/whatsapp';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import PDFDownloadBtn from '../pdf/PDFDownloadBtn';
import TextField from '../ui/TextField';

const QUICK_NUMBERS = [
  { label: 'Primary Contact 1', number: '+91 75582 38968', raw: '7558238968' },
  { label: 'Primary Contact 2', number: '+91 95855 75354', raw: '+919585575354' }
];

export default function WhatsAppModal({ isOpen, onClose, state }) {
  const clientPhone = state.client?.whatsapp || '';
  const [selectedPhone, setSelectedPhone] = useState(clientPhone || QUICK_NUMBERS[0].raw);
  const [copied, setCopied] = useState(false);
  const [isSendingCloud, setIsSendingCloud] = useState(false);
  const [cloudStatus, setCloudStatus] = useState(null);

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

  const handleOpenWhatsApp = () => {
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Design Brief on WhatsApp"
      subtitle="Send formatted brief directly via WhatsApp Web / App"
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-5">
        {/* Notice */}
        <div className="bg-surface p-4 rounded-xl border border-white/10 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-text-muted leading-relaxed">
            <span className="text-white font-semibold block mb-0.5">WhatsApp Web / Mobile Workflow</span>
            First download the generated PDF brief, then click <strong className="text-white">Open WhatsApp</strong> to send the summary message along with your attached PDF.
          </div>
        </div>

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
              placeholder="e.g. 7558238968 or +91 95855 75354"
              value={selectedPhone}
              onChange={(e) => setSelectedPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Message Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Prepared WhatsApp Message
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
            className="w-full sm:w-1/2"
          />

          <Button
            variant="primary"
            size="md"
            icon={Send}
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-1/2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg"
          >
            Open WhatsApp ({selectedPhone || 'Select Number'})
          </Button>
        </div>
      </div>
    </Modal>
  );
}
