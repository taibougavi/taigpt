import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageSquare, Trash2, Edit3, Send, Menu } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AuthContext from '../../contexts/AuthContext';
import ConversationSidebar from './ConversationSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useContext(AuthContext);

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data.conversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Failed to load conversations');
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`/api/chat/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  };

  // Create new conversation
  const createNewConversation = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.post('/api/chat/conversations', {
        title: 'New Conversation'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const newConversation = response.data.conversation;
      setConversations([newConversation, ...conversations]);
      setCurrentConversation(newConversation);
      setMessages([]);
      toast.success('New conversation created');
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to create conversation');
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async (content) => {
    if (!currentConversation) {
      await createNewConversation();
      return;
    }

    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.post(`/api/chat/conversations/${currentConversation.id}/messages`, {
        content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { userMessage, aiMessage } = response.data;
      setMessages(prev => [...prev, userMessage, aiMessage]);
      
      // Update conversation in list
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversation.id 
            ? { ...conv, messageCount: conv.messageCount + 2, updatedAt: new Date().toISOString() }
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  // Delete conversation
  const deleteConversation = async (conversationId) => {
    try {
      const token = getAuthToken();
      await axios.delete(`/api/chat/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
      
      toast.success('Conversation deleted');
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Failed to delete conversation');
    }
  };

  // Update conversation title
  const updateConversationTitle = async (conversationId, newTitle) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`/api/chat/conversations/${conversationId}`, {
        title: newTitle
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversationId 
            ? { ...conv, title: newTitle, updatedAt: new Date().toISOString() }
            : conv
        )
      );
      
      if (currentConversation?.id === conversationId) {
        setCurrentConversation(response.data.conversation);
      }
      
      toast.success('Conversation title updated');
    } catch (error) {
      console.error('Error updating conversation title:', error);
      toast.error('Failed to update conversation title');
    }
  };

  // Select conversation
  const selectConversation = async (conversation) => {
    setCurrentConversation(conversation);
    await fetchMessages(conversation.id);
  };

  // Load initial data
  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="flex h-full bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-white/10 backdrop-blur-md border-r border-white/20 flex flex-col"
          >
            <ConversationSidebar
              conversations={conversations}
              currentConversation={currentConversation}
              onNewConversation={createNewConversation}
              onSelectConversation={selectConversation}
              onDeleteConversation={deleteConversation}
              onUpdateTitle={updateConversationTitle}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            
            <div>
              <h1 className="text-white font-sf-display font-semibold">
                {currentConversation?.title || 'New Conversation'}
              </h1>
              <p className="text-white/60 text-sm font-sf-text">
                {currentConversation ? `${currentConversation.messageCount} messages` : 'Start a new conversation'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNewConversation}
              disabled={loading}
              className="apple-button flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <MessageList
            messages={messages}
            loading={loading}
            currentConversation={currentConversation}
          />
        </div>

        {/* Input */}
        <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
          <MessageInput
            onSendMessage={sendMessage}
            loading={loading}
            disabled={!currentConversation && loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat; 