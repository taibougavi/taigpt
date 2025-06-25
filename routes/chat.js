const express = require('express');
const router = express.Router();

// In-memory conversation storage (replace with database in production)
const conversations = [];
const messages = [];

// Get all conversations for a user
router.get('/conversations', authenticateToken, (req, res) => {
  try {
    const userConversations = conversations.filter(
      conv => conv.userId === req.user.userId
    );
    
    res.json({ conversations: userConversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

// Create a new conversation
router.post('/conversations', authenticateToken, (req, res) => {
  try {
    const { title } = req.body;
    
    const newConversation = {
      id: Date.now().toString(),
      userId: req.user.userId,
      title: title || 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 0
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

// Get messages for a specific conversation
router.get('/conversations/:conversationId/messages', authenticateToken, (req, res) => {
  try {
    const { conversationId } = req.params;
    
    // Verify conversation belongs to user
    const conversation = conversations.find(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const conversationMessages = messages
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    res.json({ messages: conversationMessages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

// Send a message
router.post('/conversations/:conversationId/messages', authenticateToken, async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Verify conversation belongs to user
    const conversation = conversations.find(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Create user message
    const userMessage = {
      id: Date.now().toString(),
      conversationId,
      content: content.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    messages.push(userMessage);

    // Update conversation
    conversation.updatedAt = new Date().toISOString();
    conversation.messageCount += 1;

    // Generate AI response (simulated)
    const aiResponse = await generateAIResponse(content);

    // Create AI message
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      conversationId,
      content: aiResponse,
      sender: 'ai',
      timestamp: new Date().toISOString()
    };

    messages.push(aiMessage);
    conversation.messageCount += 1;

    res.status(201).json({
      message: 'Message sent successfully',
      userMessage,
      aiMessage
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Delete a conversation
router.delete('/conversations/:conversationId', authenticateToken, (req, res) => {
  try {
    const { conversationId } = req.params;
    
    // Find conversation index
    const conversationIndex = conversations.findIndex(
      conv => conv.id === conversationId && conv.userId === req.user.userId
    );
    
    if (conversationIndex === -1) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Remove conversation
    conversations.splice(conversationIndex, 1);

    // Remove all messages for this conversation
    const messageIndices = messages
      .map((msg, index) => msg.conversationId === conversationId ? index : -1)
      .filter(index => index !== -1)
      .reverse(); // Reverse to remove from end to beginning

    messageIndices.forEach(index => {
      messages.splice(index, 1);
    });

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

// Update conversation title
router.put('/conversations/:conversationId', authenticateToken, (req, res) => {
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

// Simulated AI response generation
async function generateAIResponse(userMessage) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = [
    `I understand you're asking about "${userMessage}". That's a great question! Let me provide you with a comprehensive answer...`,
    `Thank you for your message: "${userMessage}". This is an interesting topic that I'd be happy to explore with you...`,
    `I see you're interested in "${userMessage}". This is a fascinating subject that touches on several important areas...`,
    `Your question about "${userMessage}" is quite thought-provoking. Let me share some insights that might help...`,
    `I appreciate you bringing up "${userMessage}". This is definitely worth discussing in detail...`
  ];
  
  const baseResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return baseResponse + " This is a simulated response from TAIGPT. In a production environment, this would be connected to a real AI model like GPT-4, Claude, or similar advanced language models. The response would be contextual, accurate, and helpful based on the actual content of your message.";
}

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