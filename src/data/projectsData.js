// src/data/projectsData.js
import project1 from '../assets/Projects-1.jpeg';
import project2 from '../assets/Projects-2.jpeg';
import project3 from '../assets/Projects-3.jpeg';
import project4 from '../assets/Projects-4.jpeg';
import project5 from '../assets/Projects-5.jpeg';
import project6 from '../assets/Projects-6.jpeg';
import project7 from '../assets/Projects-7.jpeg';
import project8 from '../assets/Projects-8.jpeg';

// Centralized projects data with slugs
export const PROJECTS_DATA = [
  // RESTAURANTS
  {
    id: 'urban-kitchen',
    slug: 'urban-kitchen',
    title: 'URBAN KITCHEN',
    category: 'restaurants',
    year: '2024',
    location: 'New York',
    description: 'Modern culinary experience with industrial aesthetics',
    fullDescription: 'Urban Kitchen represents the fusion of industrial design with culinary excellence. Located in the heart of New York, this restaurant features exposed brick walls, steel beams, and custom lighting that creates an intimate yet vibrant atmosphere.',
    challenge: 'Creating a warm, inviting atmosphere within an industrial space while maintaining functionality for both guests and kitchen staff.',
    solution: 'We implemented strategic lighting, natural wood accents, and flexible seating arrangements that transform throughout the day from casual lunch service to elegant evening dining.',
    image: project1,
    images: [project1, project2, project3, project4, project5],
    tags: ['Interior Design', 'Lighting', 'Space Planning', 'Brand Identity'],
    client: 'Urban Dining Group',
    duration: '6 months',
    area: '4500 sq ft',
    team: ['Lead Architect', 'Interior Designer', 'Project Manager'],
    featured: true
  },
  {
    id: 'sakura-garden',
    slug: 'sakura-garden',
    title: 'SAKURA GARDEN',
    category: 'restaurants',
    year: '2024',
    location: 'Tokyo',
    description: 'Japanese-inspired fine dining with zen garden',
    fullDescription: 'Sakura Garden brings traditional Japanese aesthetics to modern fine dining. The design incorporates natural materials, flowing water features, and a central zen garden that creates a tranquil dining experience.',
    challenge: 'Integrating traditional Japanese design elements with contemporary dining requirements while maintaining authenticity.',
    solution: 'Collaboration with Japanese artisans and use of authentic materials combined with modern kitchen technology and guest comfort features.',
    image: project2,
    images: [project2, project3, project4, project5, project6],
    tags: ['Japanese Design', 'Zen Garden', 'Traditional Craftsmanship'],
    client: 'Sakura Hospitality',
    duration: '8 months',
    area: '3800 sq ft',
    team: ['Cultural Consultant', 'Landscape Architect', 'Interior Designer'],
    featured: true
  },
  {
    id: 'coastal-flavors',
    slug: 'coastal-flavors',
    title: 'COASTAL FLAVORS',
    category: 'restaurants',
    year: '2023',
    location: 'Miami',
    description: 'Seafood restaurant with ocean views',
    fullDescription: 'Coastal Flavors offers a fresh take on seafood dining with panoramic ocean views and a breezy, coastal-inspired interior design.',
    challenge: 'Maximizing ocean views while creating an intimate dining atmosphere.',
    solution: 'Strategic window placement, reflective surfaces, and a color palette inspired by the sea.',
    image: project3,
    images: [project3, project4, project5, project6, project7],
    tags: ['Coastal Design', 'Seafood Restaurant', 'Ocean Views'],
    client: 'Coastal Dining Group',
    duration: '5 months',
    area: '3200 sq ft',
    team: ['Lead Designer', 'Marine Consultant'],
    featured: false
  },
  {
    id: 'mountain-brew',
    slug: 'mountain-brew',
    title: 'MOUNTAIN BREW',
    category: 'restaurants',
    year: '2023',
    location: 'Denver',
    description: 'Craft brewery and gastropub',
    fullDescription: 'Mountain Brew combines rustic mountain aesthetics with modern brewing technology in a cozy gastropub setting.',
    challenge: 'Blending industrial brewing equipment with warm, inviting dining spaces.',
    solution: 'Open kitchen concept with visible brewing tanks and natural material selection.',
    image: project4,
    images: [project4, project5, project6, project7, project8],
    tags: ['Brewery Design', 'Gastropub', 'Industrial Aesthetic'],
    client: 'Mountain Brew Co.',
    duration: '7 months',
    area: '5200 sq ft',
    team: ['Brewery Specialist', 'Interior Designer'],
    featured: true
  },
  {
    id: 'desert-spice',
    slug: 'desert-spice',
    title: 'DESERT SPICE',
    category: 'restaurants',
    year: '2024',
    location: 'Dubai',
    description: 'Middle Eastern fusion cuisine',
    fullDescription: 'Desert Spice brings authentic Middle Eastern flavors to a contemporary setting with luxurious design elements and traditional motifs.',
    challenge: 'Modernizing traditional Middle Eastern design while maintaining cultural authenticity.',
    solution: 'Fusion of traditional patterns with minimalist contemporary furniture and lighting.',
    image: project5,
    images: [project5, project6, project7, project8, project1],
    tags: ['Middle Eastern', 'Luxury Dining', 'Cultural Fusion'],
    client: 'Desert Hospitality',
    duration: '9 months',
    area: '4800 sq ft',
    team: ['Cultural Expert', 'Luxury Designer'],
    featured: false
  },

  // RETAIL SEGMENT
  {
    id: 'luxe-boutique',
    slug: 'luxe-boutique',
    title: 'LUXE BOUTIQUE',
    category: 'retail',
    year: '2024',
    location: 'Paris',
    description: 'High-end fashion retail space',
    fullDescription: 'Luxe Boutique redefines luxury retail with its innovative use of materials and lighting in the heart of Paris fashion district.',
    challenge: 'Creating a luxurious atmosphere that appeals to high-end clients while maintaining functionality.',
    solution: 'Modular display systems and state-of-the-art lighting control.',
    image: project6,
    images: [project6, project7, project8, project1, project2],
    tags: ['Luxury Retail', 'Fashion', 'Custom Displays'],
    client: 'Luxe Fashion Group',
    duration: '5 months',
    area: '3200 sq ft',
    team: ['Retail Specialist', 'Lighting Designer'],
    featured: true
  },
  {
    id: 'tech-hub',
    slug: 'tech-hub',
    title: 'TECH HUB',
    category: 'retail',
    year: '2024',
    location: 'San Francisco',
    description: 'Technology flagship store',
    fullDescription: 'Tech Hub creates an immersive technology retail experience with interactive displays and cutting-edge design.',
    challenge: 'Making complex technology accessible and engaging for all customers.',
    solution: 'Interactive zones, hands-on product experiences, and educational spaces.',
    image: project7,
    images: [project7, project8, project1, project2, project3],
    tags: ['Technology Retail', 'Interactive', 'Flagship Store'],
    client: 'Tech Innovations Inc.',
    duration: '6 months',
    area: '4500 sq ft',
    team: ['Tech Consultant', 'UX Designer'],
    featured: true
  },
  // Add more retail projects...
  
  // RESIDENTIAL SEGMENT
  {
    id: 'sky-villa',
    slug: 'sky-villa',
    title: 'SKY VILLA',
    category: 'residential',
    year: '2024',
    location: 'Singapore',
    description: 'Penthouse with panoramic city views',
    fullDescription: 'Sky Villa offers luxury living with breathtaking city views and sophisticated interior design.',
    challenge: 'Maximizing views while maintaining privacy and creating intimate living spaces.',
    solution: 'Strategic window placement and flexible room dividers.',
    image: project3,
    images: [project3, project4, project5, project6, project7],
    tags: ['Luxury Residential', 'Penthouse', 'City Views'],
    client: 'Private Client',
    duration: '12 months',
    area: '3500 sq ft',
    team: ['Lead Architect', 'Interior Designer'],
    featured: true
  },
  // Add more residential projects...

  // CORPORATE SEGMENT
  {
    id: 'innovation-center',
    slug: 'innovation-center',
    title: 'INNOVATION CENTER',
    category: 'corporate',
    year: '2024',
    location: 'Silicon Valley',
    description: 'Tech company headquarters',
    fullDescription: 'Innovation Center provides a collaborative workspace that fosters creativity and technological advancement.',
    challenge: 'Creating spaces that support both focused work and collaborative innovation.',
    solution: 'Modular workspace design with flexible meeting areas and tech-integrated rooms.',
    image: project8,
    images: [project8, project1, project2, project3, project4],
    tags: ['Corporate Office', 'Tech Headquarters', 'Collaborative Spaces'],
    client: 'Tech Giant Inc.',
    duration: '10 months',
    area: '25000 sq ft',
    team: ['Workplace Strategist', 'Tech Integration Specialist'],
    featured: true
  },
  // Add more corporate projects...

  // EDTECH SEGMENT
  {
    id: 'learning-hub',
    slug: 'learning-hub',
    title: 'LEARNING HUB',
    category: 'edtech',
    year: '2024',
    location: 'Boston',
    description: 'Modern educational facility',
    fullDescription: 'Learning Hub transforms traditional education spaces into dynamic, technology-enhanced learning environments.',
    challenge: 'Integrating technology seamlessly into learning spaces without overwhelming the educational experience.',
    solution: 'Smart classroom design with hidden technology and flexible learning zones.',
    image: project5,
    images: [project5, project6, project7, project8, project1],
    tags: ['Educational Design', 'Technology Integration', 'Learning Spaces'],
    client: 'EduTech Foundation',
    duration: '8 months',
    area: '18000 sq ft',
    team: ['Educational Consultant', 'Technology Specialist'],
    featured: true
  },
  // Add more edtech projects...

  // HEALTHCARE SEGMENT
  {
    id: 'wellness-center',
    slug: 'wellness-center',
    title: 'WELLNESS CENTER',
    category: 'healthcare',
    year: '2024',
    location: 'Zurich',
    description: 'Integrated health facility',
    fullDescription: 'Wellness Center combines medical functionality with healing architecture to create a comforting healthcare environment.',
    challenge: 'Balancing clinical requirements with warm, healing aesthetics.',
    solution: 'Biophilic design principles and natural material selection.',
    image: project2,
    images: [project2, project3, project4, project5, project6],
    tags: ['Healthcare Design', 'Wellness', 'Healing Environments'],
    client: 'Health Systems Zurich',
    duration: '14 months',
    area: '32000 sq ft',
    team: ['Healthcare Designer', 'Medical Planner'],
    featured: true
  }
  // Add more healthcare projects...
];

// Helper functions to get projects by category or slug
export const getProjectsByCategory = (category) => {
  return PROJECTS_DATA.filter(project => project.category === category);
};

export const getProjectBySlug = (slug) => {
  return PROJECTS_DATA.find(project => project.slug === slug);
};

export const getAllCategories = () => {
  const categories = [...new Set(PROJECTS_DATA.map(project => project.category))];
  return categories;
};

export const CATEGORIES = [
  { id: 'restaurants', name: 'RESTAURANTS' },
  { id: 'retail', name: 'RETAIL SEGMENT' },
  { id: 'residential', name: 'RESIDENTIAL SEGMENT' },
  { id: 'corporate', name: 'CORPORATE SEGMENT' },
  { id: 'edtech', name: 'EDTECH SEGMENT' },
  { id: 'healthcare', name: 'HEALTHCARE SEGMENT' }
];