import { Controller, Post, Body, Get, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { GenerateSectionsDto } from './dto/generate-sections.dto';
import { GenerateSectionsResponse } from './interfaces/generate-sections.interface';

@Controller('generate-sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async generateSections(@Body() dto: GenerateSectionsDto): Promise<GenerateSectionsResponse> {
    try {
      console.log('📥 Received POST request with prompt:', dto.prompt);
      const result = await this.sectionsService.generateSections(dto.prompt);
      console.log('✅ Successfully generated sections');
      return result;
    } catch (error) {
      console.error('❌ Error in generateSections controller:', error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message || 'Internal server error',
          error: error.stack,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('test-db')
  async testDatabase() {
    try {
      console.log('🧪 Testing database connection...');
      const sections = await this.sectionsService.getAllSections();
      console.log('✅ Database test successful, found sections:', sections.length);
      return {
        status: 'success',
        message: 'Database connection working',
        sectionsCount: sections.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Database test failed:', error);
      return {
        status: 'error',
        message: error.message,
        error: error.stack,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Get()
  async getAllSections() {
    return this.sectionsService.getAllSections();
  }

  @Get(':id')
  async getSectionById(@Param('id') id: string) {
    return this.sectionsService.getSectionById(id);
  }

  @Delete(':id')
  async deleteSection(@Param('id') id: string) {
    await this.sectionsService.deleteSection(id);
    return { message: 'Section deleted successfully' };
  }
} 