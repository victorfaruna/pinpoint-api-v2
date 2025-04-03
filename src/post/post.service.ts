import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import db from 'src/database';
import { postsTable } from 'src/database/schema';

@Injectable()
export class PostService {
  async getAllPost() {
    try {
      const posts = await db
        .select()
        .from(postsTable)
        .limit(20)
        .orderBy(desc(postsTable.id));
      if (posts.length === 0) {
        return {
          message: 'No posts found',
          posts: [],
        };
      }
      return {
        message: 'Fetched all posts',
        posts,
      };
    } catch (error) {
      throw new InternalServerErrorException('A error occured');
    }
  }
}
