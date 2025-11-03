// src/data/servicesData.js
import service1 from '../assets/Projects-1.jpeg'; // You might want to add service-specific images
import service2 from '../assets/Projects-2.jpeg';
import service3 from '../assets/Projects-3.jpeg';
import service4 from '../assets/Projects-4.jpeg';
import service5 from '../assets/Projects-5.jpeg';
import service6 from '../assets/Projects-6.jpeg';

// Centralized services data with slugs
export const SERVICES_DATA = [
  {
    id: 'interior-design',
    slug: 'interior-design',
    title: 'INTERIOR DESIGN',
    category: 'design',
    icon: '🎨',
    description: 'Transform spaces with innovative interior design solutions',
    fullDescription: 'Our interior design service creates harmonious, functional, and aesthetically pleasing environments tailored to your needs. We blend creativity with practicality to deliver spaces that inspire and work.',
    process: [
      'Initial consultation and space analysis',
      'Concept development and mood boards',
      'Detailed design planning',
      'Material selection and sourcing',
      'Implementation and project management'
    ],
    benefits: [
      'Enhanced space functionality',
      'Increased property value',
      'Improved aesthetic appeal',
      'Optimized workflow and movement'
    ],
    image: service1,
    images: [service1, service2, service3, service4, service5],
    tags: ['Space Planning', 'Color Theory', 'Furniture Design', 'Lighting Design'],
    duration: '2-6 months',
    team: ['Lead Interior Designer', 'Space Planner', 'Materials Specialist'],
    featured: true,
    priceRange: '$$$',
    deliverables: ['3D Renderings', 'Material Boards', 'Floor Plans', 'Shopping List']
  },
  {
    id: 'architectural-planning',
    slug: 'architectural-planning',
    title: 'ARCHITECTURAL PLANNING',
    category: 'architecture',
    icon: '🏛️',
    description: 'Comprehensive architectural design and planning services',
    fullDescription: 'From concept to completion, our architectural planning service ensures your vision becomes reality with structural integrity, compliance, and innovative design.',
    process: [
      'Site analysis and feasibility study',
      'Conceptual design development',
      'Technical drawings and documentation',
      'Regulatory compliance and permits',
      'Construction oversight'
    ],
    benefits: [
      'Structural integrity and safety',
      'Regulatory compliance',
      'Optimized space utilization',
      'Future-proof design'
    ],
    image: service2,
    images: [service2, service3, service4, service5, service6],
    tags: ['Structural Design', 'Building Codes', 'Space Optimization', 'Sustainable Design'],
    duration: '6-12 months',
    team: ['Lead Architect', 'Structural Engineer', 'CAD Specialist'],
    featured: true,
    priceRange: '$$$$',
    deliverables: ['Architectural Drawings', '3D Models', 'Construction Documents', 'Permit Packages']
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    title: 'BRAND IDENTITY',
    category: 'branding',
    icon: '⚡',
    description: 'Create compelling brand identities that tell your story',
    fullDescription: 'We develop cohesive brand identities that resonate with your audience and communicate your unique value proposition across all touchpoints.',
    process: [
      'Brand discovery and research',
      'Strategy development',
      'Visual identity creation',
      'Brand guidelines',
      'Implementation across platforms'
    ],
    benefits: [
      'Strong brand recognition',
      'Consistent customer experience',
      'Competitive differentiation',
      'Increased brand loyalty'
    ],
    image: service3,
    images: [service3, service4, service5, service6, service1],
    tags: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    duration: '1-3 months',
    team: ['Brand Strategist', 'Graphic Designer', 'Creative Director'],
    featured: true,
    priceRange: '$$',
    deliverables: ['Logo Suite', 'Brand Guidelines', 'Marketing Collateral', 'Digital Assets']
  },
  {
    id: 'space-optimization',
    slug: 'space-optimization',
    title: 'SPACE OPTIMIZATION',
    category: 'consulting',
    icon: '📐',
    description: 'Maximize efficiency and functionality of your spaces',
    fullDescription: 'Our space optimization service analyzes your current layout and provides data-driven solutions to improve workflow, storage, and overall space utilization.',
    process: [
      'Current space audit and analysis',
      'Workflow assessment',
      'Optimization strategy',
      'Implementation plan',
      'Performance monitoring'
    ],
    benefits: [
      'Increased productivity',
      'Reduced operational costs',
      'Better space utilization',
      'Improved employee satisfaction'
    ],
    image: service4,
    images: [service4, service5, service6, service1, service2],
    tags: ['Workflow Analysis', 'Ergonomics', 'Storage Solutions', 'Efficiency Planning'],
    duration: '1-2 months',
    team: ['Space Planner', 'Efficiency Expert', 'Workflow Analyst'],
    featured: false,
    priceRange: '$$',
    deliverables: ['Space Analysis Report', 'Optimization Plan', 'Implementation Guide', 'ROI Projection']
  },
  {
    id: 'sustainable-design',
    slug: 'sustainable-design',
    title: 'SUSTAINABLE DESIGN',
    category: 'sustainability',
    icon: '🌿',
    description: 'Eco-friendly design solutions for a better future',
    fullDescription: 'Integrate sustainability into your projects with our eco-conscious design approach that balances environmental responsibility with aesthetic excellence.',
    process: [
      'Sustainability assessment',
      'Eco-material selection',
      'Energy efficiency planning',
      'Waste reduction strategies',
      'Green certification guidance'
    ],
    benefits: [
      'Reduced environmental impact',
      'Lower operating costs',
      'Healthier indoor environments',
      'Positive brand association'
    ],
    image: service5,
    images: [service5, service6, service1, service2, service3],
    tags: ['Green Materials', 'Energy Efficiency', 'LEED Certification', 'Eco-Friendly'],
    duration: '3-8 months',
    team: ['Sustainability Expert', 'LEED Consultant', 'Environmental Specialist'],
    featured: true,
    priceRange: '$$$',
    deliverables: ['Sustainability Report', 'Material Specifications', 'Energy Analysis', 'Certification Support']
  },
  {
    id: 'project-management',
    slug: 'project-management',
    title: 'PROJECT MANAGEMENT',
    category: 'management',
    icon: '📊',
    description: 'End-to-end project management for seamless execution',
    fullDescription: 'Our project management service ensures your design projects are delivered on time, within budget, and to the highest quality standards.',
    process: [
      'Project scoping and planning',
      'Timeline and budget management',
      'Vendor coordination',
      'Quality control',
      'Project delivery and evaluation'
    ],
    benefits: [
      'On-time delivery',
      'Budget adherence',
      'Quality assurance',
      'Stress-free execution'
    ],
    image: service6,
    images: [service6, service1, service2, service3, service4],
    tags: ['Timeline Management', 'Budget Control', 'Vendor Coordination', 'Quality Assurance'],
    duration: 'Project dependent',
    team: ['Project Manager', 'Coordinator', 'Quality Controller'],
    featured: false,
    priceRange: '$$',
    deliverables: ['Project Plan', 'Progress Reports', 'Budget Tracking', 'Final Project Review']
  }
];

// Service categories
export const SERVICE_CATEGORIES = [
  { id: 'all', name: 'ALL SERVICES' },
  { id: 'design', name: 'DESIGN SERVICES' },
  { id: 'architecture', name: 'ARCHITECTURE' },
  { id: 'branding', name: 'BRANDING' },
  { id: 'consulting', name: 'CONSULTING' },
  { id: 'sustainability', name: 'SUSTAINABILITY' },
  { id: 'management', name: 'MANAGEMENT' }
];

// Helper functions
export const getServicesByCategory = (category) => {
  if (category === 'all') return SERVICES_DATA;
  return SERVICES_DATA.filter(service => service.category === category);
};

export const getServiceBySlug = (slug) => {
  return SERVICES_DATA.find(service => service.slug === slug);
};

export const getFeaturedServices = () => {
  return SERVICES_DATA.filter(service => service.featured);
};

export const getAllServiceCategories = () => {
  const categories = [...new Set(SERVICES_DATA.map(service => service.category))];
  return categories;
};