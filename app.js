const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve your HTML file from the parent directory
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/css/') && req.method === 'GET') {
    // Serve CSS files from the 'css' directory
    const cssPath = path.join(__dirname, req.url);

    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('CSS Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/js/') && req.method === 'GET') {
    // Serve JavaScript files from the 'js' directory
    const jsPath = path.join(__dirname, req.url);

    fs.readFile(jsPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('JavaScript Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  } else if (req.url.startsWith('/images/') && req.method === 'GET') {
    // Serve image files from the 'images' directory
    const imagePath = path.join(__dirname, req.url);

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
      } else {
        // Determine the content type based on the file extension
        const extname = path.extname(imagePath);
        const contentType = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
        }[extname] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else if (req.url === '/send-email' && req.method === 'POST') {
    // Handle the form submission and send an email
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // Parse the form data
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');

      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use Gmail as the email service
        auth: {
          user: 'tejaskawale5@gmail.com',
          pass: 'zdev jybw zdsw cjtx',
        },
      });

      const mailOptions = {
        from: email,
        to: 'tejaskawale5@gmail.com', // Change to the recipient's email address
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          console.log('Email sent: ' + info.response);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Email sent');
        }
      });
    });
  } else {
    // Handle other routes or resources as needed
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port=3000

server.listen(port,() => {
  console.log(`Server is running on http://localhost:${port}`);
});
