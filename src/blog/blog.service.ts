import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blog-post.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogPost.name) private blogPostModel: Model<BlogPostDocument>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<BlogPostDocument> {
    const newBlogPost = new this.blogPostModel(createBlogDto);
    return newBlogPost.save();
  }

  async findAll(): Promise<BlogPostDocument[]> {
    return this.blogPostModel.find().exec();
  }

  async findOne(id: string): Promise<BlogPostDocument> {
    return this.blogPostModel.findById(id);
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise<BlogPostDocument> {
    return this.blogPostModel.findByIdAndUpdate(id, updateBlogDto);
  }

  async remove(id: string): Promise<BlogPostDocument> {
    return this.blogPostModel.findByIdAndRemove(id);
  }
}
