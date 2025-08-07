import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Type a message...",
  disabled = false,
  maxLength = 1000,
  className
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && onSendMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // Max 5 lines approximately
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const canSend = message.trim().length > 0 && !disabled;

  return (
    <div 
      className={cn(
        "relative flex items-end gap-3 p-4 border-t bg-background",
        "transition-all duration-200",
        className
      )}
    >
      {/* Input Container */}
      <div 
        className={cn(
          "flex-1 relative flex items-end",
          "bg-chat-input-bg border border-chat-input-border rounded-2xl",
          "transition-all duration-200",
          isFocused && "border-chat-input-focus shadow-[0_0_0_1px_hsl(var(--chat-input-focus))]",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Left Actions */}
        <div className="flex items-end p-3 pb-3">
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-muted transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none border-0 bg-transparent",
              "text-sm leading-6 text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-0",
              "py-3 pr-3 max-h-[120px]",
              "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            )}
            style={{
              minHeight: '24px',
              lineHeight: '24px'
            }}
          />
          
          {/* Character Counter */}
          {maxLength && message.length > maxLength * 0.8 && (
            <div className="absolute -bottom-5 right-2 text-xs text-muted-foreground">
              {message.length}/{maxLength}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-end p-3 pb-3">
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-muted transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Add emoji"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Send Button */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          "transition-all duration-200 transform",
          canSend && [
            "bg-chat-send-bg text-chat-send-text",
            "hover:bg-chat-send-hover hover:scale-105",
            "active:scale-95 shadow-[var(--shadow-send)]"
          ],
          !canSend && [
            "bg-muted text-muted-foreground cursor-not-allowed",
            "opacity-50"
          ]
        )}
        aria-label="Send message"
      >
        <Send className={cn(
          "w-4 h-4 transition-transform duration-200",
          canSend && "translate-x-0.5"
        )} />
      </button>
    </div>
  );
};