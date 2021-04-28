import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { getModelToken } from '@nestjs/mongoose';
import { BlogPost } from './schemas/blog-post.schema';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        BlogService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('method should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should return new post', () => {
      const expected = {
        title: 'NPM. How it works?',
        content: 'Lorem text',
      };
      expect(
        service.create({
          title: 'NPM. How it works?',
          content: 'Lorem text',
        }),
      ).resolves.toEqual(expected);
    });
  });
});
