import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { getModelToken } from "@nestjs/mongoose";
import { BlogPost } from "./schemas/blog-post.schema";

describe('BlogController', () => {
  let controller: BlogController;

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

    controller = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
