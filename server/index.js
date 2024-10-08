const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerModel = require('./models/Register');
const app = express();

//singleton

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tutorhub');


// Calculate Jaccard Similarity between two sets
function calculateJaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter((tag) => setB.has(tag)));
  const union = new Set([...setA, ...setB]);

  const similarity = intersection.size / union.size;
  return similarity;
}

app.post('/register', (req, res) => {
  const { email, userId, password, college, dateOfBirth, level, gender, rank, tags, courses } = req.body;

  registerModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // User with this email already exists
        return res.status(400).json({ message: "Email already exists" });
      } else {
        // Create a new user
        registerModel.create({ email, userId, password, college, dateOfBirth, level, gender, rank, tags, courses })
          .then(result => res.json({ message: "Account created" }))
          .catch(err => res.status(500).json({ error: err.message || "Failed to create account" }));
      }
    })
    .catch(err => res.status(500).json({ error: err.message || "Server error" }));
});


app.post('/login', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await registerModel.findOne({ userId, password });

    if (user) {
      res.json(user);
    } else {
      res.json("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/matching', async (req, res) => {
    const { userId, matchingTags } = req.body;
  
    try {
      const user = await registerModel.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userTags = new Set(matchingTags);
  
      let bestMatch = null;
      let bestSimilarity = 0;
  
      // Loop through all users to find the best match
      for (const registeredUser of await registerModel.find()) {
        if (registeredUser.userId !== userId && registeredUser.tags.length > 0) {
          const otherUserTags = new Set(registeredUser.tags);
          const similarity =  calculateJaccardSimilarity(userTags, otherUserTags);
  
          if (similarity > bestSimilarity) {
            bestSimilarity = similarity;
            bestMatch = registeredUser;
          }
        }
      }
  
      if (!bestMatch) {
        return res.json({ message: 'No matching user found' });
      }
  
      res.json({ matchedUser: bestMatch });
    } catch (err) {
      res.status(500).json({ error: 'Matching failed' });
    }
  });
  


  app.get('/userRank', async (req, res) => {
    const { userId } = req.query; // Assuming you pass the userId as a query parameter
  
    try {
      const user = await registerModel.findOne({ userId });
    
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      // Assuming rank is a property on the user object, adjust this accordingly
      const { rank } = user;
    
      res.json({ rank });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user rank' });
    }
  });

app.listen(3301, () => {
  console.log('server running');
});
