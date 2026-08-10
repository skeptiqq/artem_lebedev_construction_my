/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: "comfort" | "premium";
  cover: string;
  images: string[];
  description: string;
  area?: string;
  duration?: string;
  price?: string;
  shortFeature?: string;
  highlight?: string;
  artemComment?: string;
}

export interface ReviewImage {
  id: number;
  image: string;
  alt: string;
  extraImages?: string[];
  optionalUrl?: string;
  // Card content
  name: string;
  date: string;
  badge: "stars" | "excellent";
  category: string;
  text: string;
  cost?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  detail?: string;
}

export interface WorkStage {
  number: string;
  title: string;
  description: string;
  result: string;
}

export interface DesignProjectConfig {
  exampleUrl: string;
  showExampleButton: boolean;
}

/** @deprecated – kept for Responsibilities.tsx; remove when that component is updated */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
}
