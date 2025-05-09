# Retro Saviour Website - Content Management Guide

This guide explains how to update your website content without needing to understand HTML or JavaScript coding. By editing a single file, you can change text, prices, testimonials, and more on your site.

## How to Update Your Website Content

All content for your website is stored in one file: `site-contents.js`. Follow these steps to make changes:

### Step 1: Access Your Website Files

1. Log in to GitHub (or your hosting provider)
2. Go to your website repository or file manager
3. Navigate to the `content` folder
4. Find and open the `site-contents.js` file

### Step 2: Find the Section You Want to Change

The file is organized into sections:

- **about**: Main heading, tagline, and about text
- **services**: Repair services and prices
- **testimonials**: Customer reviews
- **process**: Steps in your repair process
- **gallery**: Photos in the gallery
- **stats**: Achievement numbers and stats
- **contact**: Your contact information

### Step 3: Make Your Changes

Only change the text between quotation marks. For example:

```javascript
about: {
  heading: "Welcome to Retro Saviour", // <- Change this text
  tagline: "Bringing your gaming classics back to life", // <- Change this text
}
```

### Step 4: Save and Upload

1. Save the file after making changes
2. Upload it back to your website
3. Refresh your website to see the changes

Examples of Common Updates

Change Main Heading or Tagline

```javascript
about: {
  heading: "Your New Main Heading", // Changed text
  tagline: "Your New Tagline Here", // Changed text
}
```

Update a Service Description or Price

```javascript
services: [
  {
    title: "Console Repair",
    description: "Updated description goes here", // Changed description
    price: "From £65", // Changed price
    featured: true
  },
  // Other services...
]
```

Add a New Testimonial

```javascript
testimonials: [
  // Existing testimonials...
  {
    quote: "Your new testimonial text here!",
    rating: 5, // Number of stars (1-5)
    author: "Customer Name",
    service: "Console Repair"
  }
]
```

Update Process Steps

```javascript
process: {
  steps: [
    {
      title: "Book Your Repair",
      description: "Updated description of this step", // Changed text
      icon: "📱" // Change emoji if desired
    },
    // Other steps...
  ]
}
```

Change Contact Information

```javascript
contact: {
  email: "your@newemail.com", // Changed email
  phone: "Your new phone number", // Changed phone
  hours: "New business hours", // Changed hours
  address: "Your new address" // Changed address
}
```

Important Tips

- Always make a backup of the file before editing
- Only change the text between quotation marks
- Don't delete commas, brackets, or other symbols
- Keep quotation marks around text: "like this"
- Numbers don't need quotes: rating: 5 (not rating: "5")
- Boolean values don't need quotes: featured: true (not featured: "true")
- If using quotes within text, use single quotes inside: "This is 'quoted' text"

Adding Images

To update gallery images:

1. Upload your new image files to the images/gallery folder
2. Update the reference in site-contents.js:

```javascript
gallery: {
  images: [
    {
      src: "images/gallery/your-new-image.jpg",
      alt: "Description of image"
    },
    // Other images...
  ]
}
```

Troubleshooting

If your changes don't appear or the site looks broken:

- Make sure all quotation marks and commas are in the right places
- Check for browser errors by pressing F12 and looking at the Console tab
- Try restoring your backup and making changes again
- If you're stuck, contact your web developer for assistance

Getting Help

If you need further assistance updating your website, please contact ... you know who 🫣