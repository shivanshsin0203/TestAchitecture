const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'generated' directory
app.use('/generated', express.static(path.join(__dirname, 'generated')));

app.post('/create-html', (req, res) => {
  const { title, content } = req.body;
  console.log(req.body)
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${content}</p>
    </body>
    </html>
  `;

  const filename = `${Date.now()}.html`;
  const filePath = path.join(__dirname, 'generated', filename);

  const directoryPath = path.join(__dirname, 'generated');
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  fs.writeFileSync(filePath, htmlTemplate);

  res.status(200).json({ message: 'HTML file created successfully', url: `/generated/${filename}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
