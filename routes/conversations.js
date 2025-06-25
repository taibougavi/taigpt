const express = require('express');
const router = express.Router();

// In-memory conversation storage (replace with database in production)
const conversations = [];

// Get all conversations for a user
router.get('/', authenticateToken, (req, res) => {
  try {
    const userConversations = conversations
      .filter(conv => conv.userId === req.user.userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    res.json({ conversations: userConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

// Get a specific conversation
router.get('/:conversationId', authenticateToken, (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const conversation = conversations.find(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to get conversation' });
  }
});

// Create a new conversation
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, initialMessage } = req.body;
    
    const newConversation = {
      id: Date.now().toString(),
      userId: req.user.userId,
      title: title || 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0,
      lastMessage: initialMessage || null
    };

    conversations.push(newConversation);
    
    res.status(201).json({
      message: 'Conversation created successfully',
      conversation: newConversation
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Update conversation title
router.put('/:conversationId', authenticateToken, (req, res) => {
  try {
    const { conversationId } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const conversation = conversations.find(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    conversation.title = title.trim();
    conversation.updatedAt = new Date().toISOString();

    res.json({
      message: 'Conversation updated successfully',
      conversation
    });
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
});

// Delete a conversation
router.delete('/:conversationId', authenticateToken, (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const conversationIndex = conversations.findIndex(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (conversationIndex === -1) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    conversations.splice(conversationIndex, 1);

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Clear all conversations for a user
router.delete('/', authenticateToken, (req, res) => {
  try {
    const userConversationIndices = conversations
      .map((conv, index) => conv.userId === req.user.userId ? index : -1)
      .filter(index => index !== -1)
      .reverse(); // Reverse to remove from end to beginning

    userConversationIndices.forEach(index => {
      conversations.splice(index, 1);
    });

    res.json({ 
      message: 'All conversations cleared successfully',
      deletedCount: userConversationIndices.length
    });
  } catch (error) {
    console.error('Clear conversations error:', error);
    res.status(500).json({ error: 'Failed to clear conversations' });
  }
});

// Get conversation statistics
router.get('/stats/summary', authenticateToken, (req, res) => {
  try {
    const userConversations = conversations.filter(
      conv => conv.userId === req.user.userId
    );

    const stats = {
      totalConversations: userConversations.length,
      totalMessages: userConversations.reduce((sum, conv) => sum + conv.messageCount, 0),
      averageMessagesPerConversation: userConversations.length > 0 
        ? (userConversations.reduce((sum, conv) => sum + conv.messageCount, 0) / userConversations.length).toFixed(1)
        : 0,
      oldestConversation: userConversations.length > 0 
        ? userConversations.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0].createdAt
        : null,
      newestConversation: userConversations.length > 0
        ? userConversations.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0].updatedAt
        : null
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get conversation statistics' });
  }
});

// Search conversations
router.get('/search/:query', authenticateToken, (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const userConversations = conversations.filter(
      conv => conv.userId === req.user.userId
    );

    const searchResults = userConversations.filter(conv => 
      conv.title.toLowerCase().includes(query.toLowerCase()) ||
      (conv.lastMessage && conv.lastMessage.toLowerCase().includes(query.toLowerCase()))
    );

    res.json({ 
      conversations: searchResults,
      query: query.trim(),
      resultCount: searchResults.length
    });
  } catch (error) {
    console.error('Search conversations error:', error);
    res.status(500).json({ error: 'Failed to search conversations' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router; 