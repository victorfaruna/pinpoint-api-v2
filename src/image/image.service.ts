import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as process from 'process';

@Injectable()
export class ImageService {
  private supabase: ReturnType<typeof createClient>;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!, // Use service role for private bucket uploads
    );
  }
  async getImage(path: string) {
    try {
    } catch (error) {}
  }

  async uploadImage(path: string) {}
}
