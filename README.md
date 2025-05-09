# Retro Saviour Website Content Management

This guide explains how to update the content on your website without editing HTML code.

## How to Update Content

1. Navigate to the `content` folder
2. Open the JSON file for the section you want to update
3. Make your changes while maintaining the format
4. Save the file
5. Upload the updated file to your web server

## Content Files

- `about.json`: Update the main welcome/about section
- `services.json`: Update repair services and prices
- `testimonials.json`: Add or modify customer testimonials
- `process.json`: Edit the repair process steps
- `gallery.json`: Change images in the gallery
- `stats.json`: Update achievement statistics
- `contact.json`: Update contact information

## Guidelines for JSON Files
- Maintain the format with proper brackets, commas, and quotation marks
- Text must be enclosed in double quotes `"like this"`
- Don't remove structural elements like curly braces `{}` or square brackets `[]`
- Numbers don't need quotes: `"value": 100` (not `"value": "100"`)
- Boolean values don't need quotes: `"featured": true` (not `"featured": "true"`)

## Examples

### Adding a new testimonial
Open `testimonials.json` and add a new entry to the "testimonials" array:

```json
{
  "quote": "Your new testimonial text here",
  "rating": 5,
  "author": "customer_username",
  "service": "Service Type"
}