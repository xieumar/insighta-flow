"use client";

import { useState, useEffect, useRef } from "react";
import { useWorkspaceStore } from "@/store/workspace.store";
import { Edit2, Check } from "lucide-react";

export function WorkspaceBadge() {
  const { currentWorkspaceName, setWorkspaceName } = useWorkspaceStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentWorkspaceName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(currentWorkspaceName);
  }, [currentWorkspaceName]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed) {
      setWorkspaceName(trimmed);
    } else {
      setName(currentWorkspaceName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(currentWorkspaceName);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-md border border-border">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="text-xs font-medium bg-transparent border-none outline-none text-foreground w-32"
          maxLength={30}
        />
        <button onClick={handleSave} className="text-primary hover:text-primary-foreground">
          <Check className="size-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-1.5 bg-muted/60 hover:bg-muted px-2.5 py-1 rounded-md border border-border cursor-pointer group transition-colors"
    >
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
        {currentWorkspaceName}
      </span>
      <Edit2 className="size-2.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
    </div>
  );
}
