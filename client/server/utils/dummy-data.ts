import { WebsiteSection } from '../types';

export const generateDummySections = (prompt: string): WebsiteSection[] => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Generate sections based on prompt keywords
  if (lowerPrompt.includes('bakery') || lowerPrompt.includes('food') || lowerPrompt.includes('restaurant')) {
    return [
      {
        name: "Hero Section",
        description: "A compelling hero section with a headline, subheading, and call-to-action button that captures the essence of your food business."
      },
      {
        name: "About Section", 
        description: "An about section showcasing your business's story, values, and what makes your products special and unique."
      },
      {
        name: "Contact Section",
        description: "A contact section with your business's location, phone number, email, and business hours for easy customer communication."
      }
    ];
  } else if (lowerPrompt.includes('tech') || lowerPrompt.includes('software') || lowerPrompt.includes('app')) {
    return [
      {
        name: "Hero Section",
        description: "A modern hero section with a compelling headline, feature highlights, and a prominent call-to-action for your tech product."
      },
      {
        name: "Features Section", 
        description: "A features section showcasing the key capabilities and benefits of your software or application."
      },
      {
        name: "Contact Section",
        description: "A contact section with support information, demo requests, and ways to get in touch with your team."
      }
    ];
  } else if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('personal')) {
    return [
      {
        name: "Hero Section",
        description: "A personal hero section with your name, title, and a brief introduction that showcases your personality and expertise."
      },
      {
        name: "Portfolio Section", 
        description: "A portfolio section displaying your best work, projects, and achievements with descriptions and links."
      },
      {
        name: "Contact Section",
        description: "A contact section with your professional email, social media links, and ways for potential clients to reach you."
      }
    ];
  } else {
    // Default sections for any other type of website
    return [
      {
        name: "Hero Section",
        description: "A compelling hero section with a headline, subheading, and call-to-action button that captures the essence of your business."
      },
      {
        name: "About Section", 
        description: "An about section showcasing your business's story, values, and what makes your services special and unique."
      },
      {
        name: "Contact Section",
        description: "A contact section with your business's location, phone number, email, and business hours for easy customer communication."
      }
    ];
  }
}; 