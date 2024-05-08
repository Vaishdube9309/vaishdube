// server.js

// Assuming you have your data stored in an array named 'data'
const data = [
    { id: 1, fname: 'John', lname: 'Doe', email: 'john@example.com', password: '123456', mobile: '1234567890' },
    { id: 2, fname: 'Jane', lname: 'Doe', email: 'jane@example.com', password: '654321', mobile: '0987654321' }
  ];
  
  // Endpoint to get data
  app.get('/api/data', (req, res) => {
    try {
      res.json(data); // Return the data as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  