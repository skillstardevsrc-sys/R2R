import React, { useState } from 'react';
import { ExternalLink, Trash2, Edit2, Check, Globe } from 'lucide-react';
import { REFERENCE_TAGS } from '../../data/personalityTraits';
import Badge from '../ui/Badge';
import TextArea from '../ui/TextArea';

export default function ReferenceCard({
  reference,
  index,
  onRemove,
  onUpdate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(reference.note || '');
  const [editedLikes, setEditedLikes] = useState(reference.likes || []);

  const handleSave = () => {
    onUpdate(reference.id, {
      note: editedNote,
      likes: editedLikes
    });
    setIsEditing(false);
  };

  const toggleTag = (tag) => {
    if (editedLikes.includes(tag)) {
      setEditedLikes(prev => prev.filter(t => t !== tag));
    } else {
      setEditedLikes(prev => [...prev, tag]);
    }
  };

  return (
    <div className="bg-surface/90 border border-white/10 rounded-xl p-5 relative overflow-hidden transition-all hover:border-white/20 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Badge variant="accent" size="xs">
            REFERENCE {String(index + 1).padStart(2, '0')}
          </Badge>
          <div className="flex items-center gap-1.5 font-mono text-sm font-semibold text-white">
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>{reference.domain || reference.url}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            title="Open Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="p-1.5 text-text-muted hover:text-accent rounded-lg hover:bg-white/5 transition-colors"
            title={isEditing ? 'Cancel Edit' : 'Edit Notes'}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(reference.id)}
            className="p-1.5 text-text-muted hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
            title="Remove Reference"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* URL Link */}
      <div className="pt-3">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline break-all"
        >
          {reference.url}
        </a>
      </div>

      {/* Normal View vs Edit View */}
      {!isEditing ? (
        <div className="mt-3 flex flex-col gap-2">
          {reference.likes && reference.likes.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {reference.likes.map((like) => (
                <span
                  key={like}
                  className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10"
                >
                  ✓ {like}
                </span>
              ))}
            </div>
          )}

          {reference.note ? (
            <p className="text-xs text-text-muted italic bg-black/30 p-2.5 rounded-lg border border-white/5 mt-1">
              "{reference.note}"
            </p>
          ) : (
            <span className="text-[11px] text-text-muted/50 italic">No custom notes provided</span>
          )}
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-3 pt-2 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {REFERENCE_TAGS.map((tag) => {
              const isSelected = editedLikes.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-[11px] px-2 py-1 rounded border transition-all
                    ${isSelected ? 'bg-accent/20 border-accent text-accent' : 'bg-white/5 border-white/10 text-text-muted'}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <TextArea
            value={editedNote}
            onChange={(e) => setEditedNote(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="Edit notes about what you liked..."
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-text-muted hover:text-white px-3 py-1.5 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="text-xs bg-accent text-black font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
