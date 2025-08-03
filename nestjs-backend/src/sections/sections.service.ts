import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenerateSectionsResponse, WebsiteSection } from './interfaces/generate-sections.interface';
import { Section, SectionDocument } from './schemas/section.schema';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  async generateSections(prompt: string): Promise<GenerateSectionsResponse> {
    console.log('Processing prompt:', prompt);
    
    try {
      // Extract business type from prompt for more dynamic content
      const businessType = this.extractBusinessType(prompt);
      
      const sections = [
        {
          title: 'Hero',
          content: `Welcome to our ${businessType}!`,
        },
        {
          title: 'About',
          content: `We provide the best ${businessType} services in the area.`,
        },
        {
          title: 'Contact',
          content: `Find us in Cairo or contact us for more information.`,
        },
      ];
      
      console.log('Generated sections:', sections);
      
      // Store the generated sections in MongoDB
      const savedSection = await this.storeSections(prompt, sections);
      console.log('✅ Successfully saved to MongoDB with ID:', (savedSection as SectionDocument)._id);
      
      return { sections };
    } catch (error) {
      console.error('❌ Processing failed:', error);
      throw new Error(`Processing failed: ${error.message}`);
    }
  }

  private extractBusinessType(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('bakery') || lowerPrompt.includes('bread') || lowerPrompt.includes('cake')) {
      return 'bakery';
    }
    if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food') || lowerPrompt.includes('dining')) {
      return 'restaurant';
    }
    if (lowerPrompt.includes('tech') || lowerPrompt.includes('software') || lowerPrompt.includes('app')) {
      return 'tech company';
    }
    if (lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('retail')) {
      return 'shop';
    }
    if (lowerPrompt.includes('agency') || lowerPrompt.includes('marketing') || lowerPrompt.includes('design')) {
      return 'agency';
    }
    
    // Default to a generic business type
    return 'business';
  }

  async storeSections(prompt: string, sections: any[]): Promise<Section> {
    try {
      console.log('🔄 Attempting to save sections to MongoDB...');
      console.log('Prompt:', prompt);
      console.log('Sections count:', sections.length);
      
      const sectionData = new this.sectionModel({
        prompt,
        sections,
        metadata: {
          source: 'NestJS Service',
          timestamp: new Date().toISOString(),
          promptProcessed: prompt,
          sectionsGenerated: sections.length,
        }
      });

      console.log('📝 Section data prepared:', JSON.stringify(sectionData, null, 2));

      const savedSection = await sectionData.save();
      console.log('✅ Sections stored in MongoDB:', savedSection._id);
      return savedSection;
    } catch (error) {
      console.error('❌ Failed to store sections in MongoDB:', error);
      throw new Error(`Failed to store sections: ${error.message}`);
    }
  }

  async getAllSections(): Promise<Section[]> {
    try {
      const sections = await this.sectionModel
        .find()
        .sort({ createdAt: -1 })
        .limit(50)
        .exec();
      
      console.log(`Retrieved ${sections.length} sections from MongoDB`);
      return sections;
    } catch (error) {
      console.error('Failed to retrieve sections from MongoDB:', error);
      throw new Error(`Failed to retrieve sections: ${error.message}`);
    }
  }

  async getSectionById(id: string): Promise<Section> {
    try {
      const section = await this.sectionModel.findById(id).exec();
      if (!section) {
        throw new Error('Section not found');
      }
      return section;
    } catch (error) {
      console.error('Failed to retrieve section by ID:', error);
      throw new Error(`Failed to retrieve section: ${error.message}`);
    }
  }

  async deleteSection(id: string): Promise<void> {
    try {
      const result = await this.sectionModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error('Section not found');
      }
      console.log('Section deleted from MongoDB:', id);
    } catch (error) {
      console.error('Failed to delete section:', error);
      throw new Error(`Failed to delete section: ${error.message}`);
    }
  }
} 