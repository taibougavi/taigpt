import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Smile } from 'lucide-react';

const MessageInput = ({ onSendMessage, loading, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const canSend = message.trim() && !loading && !disabled;

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Input Container */}
        <div className="flex-1 relative">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={loading || disabled}
              className="w-full min-h-[44px] max-h-[120px] resize-none bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 pr-12 text-white placeholder-white/50 font-sf-text text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontFamily: 'SF Pro Text, system-ui, sans-serif',
                lineHeight: '1.4'
              }}
            />
            
            {/* Character count */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-0 text-xs text-white/50 font-sf-text"
              >
                {message.length} characters
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Attachment Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            disabled={loading || disabled}
            className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </motion.button>

          {/* Emoji Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            disabled={loading || disabled}
            className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: canSend ? 1.05 : 1 }}
            whileTap={{ scale: canSend ? 0.95 : 1 }}
            type="submit"
            disabled={!canSend}
            className={`p-3 rounded-xl transition-all ${
              canSend
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
            title={canSend ? 'Send message (Enter)' : 'Type a message to send'}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </form>

      {/* Keyboard Shortcuts Hint */}
      <div className="mt-3 text-center">
        <p className="text-white/40 text-xs font-sf-text">
          Press <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Enter</kbd> to send,{' '}
          <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default MessageInput; 