import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, Edit3, MoreVertical, Check, X } from 'lucide-react';

const ConversationSidebar = ({
  conversations,
  currentConversation,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onUpdateTitle,
  loading
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [showMenuId, setShowMenuId] = useState(null);

  const handleEditStart = (conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const handleEditSave = async () => {
    if (editTitle.trim()) {
      await onUpdateTitle(editingId, editTitle.trim());
      setEditingId(null);
      setEditTitle('');
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewConversation}
          disabled={loading}
          className="w-full apple-button flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </motion.button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <MessageSquare className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60 font-sf-text">No conversations yet</p>
              <p className="text-white/40 text-sm font-sf-text mt-2">
                Start a new chat to begin
              </p>
            </motion.div>
          ) : (
            conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative group ${
                  currentConversation?.id === conversation.id
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                } transition-colors`}
              >
                <div className="p-4 cursor-pointer" onClick={() => onSelectConversation(conversation)}>
                  {editingId === conversation.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSave()}
                        onKeyDown={(e) => e.key === 'Escape' && handleEditCancel()}
                        className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-1 text-white font-sf-text text-sm focus:outline-none focus:border-blue-400"
                        autoFocus
                      />
                      <button
                        onClick={handleEditSave}
                        className="text-green-400 hover:text-green-300 p-1"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-sf-text font-medium text-sm truncate">
                          {conversation.title}
                        </h3>
                        <p className="text-white/60 text-xs font-sf-text mt-1">
                          {conversation.messageCount} messages • {formatDate(conversation.updatedAt)}
                        </p>
                      </div>
                      
                      <AnimatePresence>
                        {showMenuId === conversation.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-10"
                          >
                            <div className="p-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditStart(conversation);
                                  setShowMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded text-sm font-sf-text"
                              >
                                <Edit3 className="w-4 h-4" />
                                <span>Rename</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteConversation(conversation.id);
                                  setShowMenuId(null);
                                }}
                                className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded text-sm font-sf-text"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMenuId(showMenuId === conversation.id ? null : conversation.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white p-1 rounded transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="text-center">
          <p className="text-white/40 text-xs font-sf-text">
            TAIGPT v1.0.0
          </p>
          <p className="text-white/30 text-xs font-sf-text mt-1">
            Powered by AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationSidebar; 