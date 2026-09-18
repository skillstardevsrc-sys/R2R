import React, { useState } from 'react';
import { Plus, Globe, Tag, AlertCircle } from 'lucide-react';
import { normalizeUrl, isValidUrl, extractDomain } from '../../utils/url';
import { REFERENCE_TAGS } from '../../data/personalityTraits';
import Button from '../ui/Button';
import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';

export default function ReferenceForm({ onAdd, currentCount = 0, maxCount = 5 }) {
  const [urlInput, setUrlInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleAdd = (e) => {
    e?.preventDefault();
    if (!urlInput.trim()) {
      setError('Please enter a website URL');
      return;
    }

    const normalized = normalizeUrl(urlInput);
    if (!isValidUrl(normalized)) {
      setError('Please enter a valid website URL (e.g. example.com or https://example.com)');
      return;
    }

    if (currentCount >= maxCount) {
      setError(`You can add a maximum of ${maxCount} reference websites.`);
      return;
    }

    const domain = extractDomain(normalized);

    const success = onAdd({
      url: normalized,
      domain,
      likes: selectedTags,
      note: note.trim()
    });

    if (success !== false) {
      setUrlInput('');
      setSelectedTags([]);
      setNote('');
      setError('');
    }
  };

  return (
    <div className="bg-surface/80 border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold text-white">Add Website Reference</h3>
        </div>
        <span className="text-xs font-mono text-text-muted">
          {currentCount} / {maxCount} Added
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* URL Input */}
        <div>
          <TextField
            id="ref-url"
            label="Website URL"
            placeholder="e.g. stripe.com or https://linear.app"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              if (error) setError('');
            }}
            error={error}
            helperText="We automatically format example.com to https://example.com"
          />
        </div>

        {/* What they like (Tags) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-accent" />
            <span>What do you like about this website? (Select all that apply)</span>
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {REFERENCE_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all
                    ${isSelected 
                      ? 'bg-accent/20 border-accent text-accent font-medium shadow-accent-sm' 
                      : 'bg-white/5 border-white/10 text-text-muted hover:border-white/20 hover:text-white'}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Note */}
        <div>
          <TextArea
            id="ref-note"
            label="Specific Notes (Optional)"
            placeholder="e.g. Liked the large hero typography, smooth hover effects, and dark card style..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            maxLength={500}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <Button
            type="button"
            variant="accentGhost"
            icon={Plus}
            disabled={currentCount >= maxCount}
            onClick={handleAdd}
            className="w-full sm:w-auto"
          >
            Add Reference Website
          </Button>
        </div>
      </div>
    </div>
  );
}
