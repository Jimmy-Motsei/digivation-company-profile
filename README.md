# Digivation Company Profile

A professional company profile website for Digivation (Pty) Ltd, featuring telecommunications infrastructure services, IoT solutions, and automated PDF delivery via email.

## Features

- **Professional Company Profile** - Complete overview of services and capabilities
- **IoT Solutions Section** - Digital transformation and sensor capabilities
- **B-BBEE Level 1 Certification** - 135% procurement recognition
- **Automated Email System** - Sends company profile PDF to requesters
- **Responsive Design** - Works on all devices
- **Print Ready** - A4 and Letter formats

## Netlify Deployment

### Prerequisites

1. **Netlify Account** - Sign up at [netlify.com](https://netlify.com)
2. **Email Service** - Gmail or other SMTP service for sending emails
3. **GitHub Repository** - Push this code to GitHub

### Environment Variables

Set these in your Netlify dashboard under Site Settings > Environment Variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**For Gmail:**

1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password as `EMAIL_PASS`

### Deployment Steps

1. **Connect to Netlify:**

   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**

   - Build command: `echo 'No build step required'`
   - Publish directory: `.` (root)
   - Node version: `18`

3. **Deploy:**
   - Netlify will automatically deploy your site
   - Your site will be available at `https://your-site-name.netlify.app`

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## File Structure

```
├── index.html                 # Main company profile page
├── netlify.toml              # Netlify configuration
├── package.json              # Dependencies
├── Digivation-Company-Profile.pdf  # PDF to be sent via email
├── netlify/
│   └── functions/
│       └── send-profile.js   # Email sending function
├── assets/                   # Images and fonts
├── print-a4.css             # Print styles (A4)
└── print-letter.css         # Print styles (Letter)
```

## Email Functionality

The site includes a contact form that:

1. **Receives email requests** from visitors
2. **Validates email addresses** before processing
3. **Sends PDF attachment** to the requester
4. **Sends notification** to Digivation team
5. **Provides user feedback** with success/error messages

## Customization

### Email Template

Edit `netlify/functions/send-profile.js` to customize:

- Email subject and content
- PDF attachment
- Internal notifications

### Styling

Modify CSS variables in `index.html` for:

- Brand colors
- Typography
- Layout spacing

## Support

For technical support or customization requests, contact:

- **Email**: info@digivation.global
- **Website**: www.digivation.global

## License

© 2025 Digivation (Pty) Ltd. All Rights Reserved.
