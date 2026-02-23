import React from 'react';

export enum ProjectCategory {
  EXHIBITION = 'Exhibition',
  EVENT = 'Corporate Event',
  INSTALLATION = 'Permanent Installation'
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  year: number;
  month: number; // 1-12
  location: string;
  description: string;
  category: ProjectCategory;
  tags: string[]; // e.g., "CES", "LED", "Booth Design"
  mainImageUrl: string;
  galleryImages: string[]; // Array of 6 URLs for the pulldown
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  details: string;
  features: string[];
}