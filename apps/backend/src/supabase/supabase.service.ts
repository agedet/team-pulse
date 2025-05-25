import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    
    this.client = createClient(
      this.config.get<string>("NEXT_PUBLIC_SUPABASE_URL")!,
      this.config.get<string>("NEXT_PUBLIC_SUPABASE_ANON_KEY")!,
    );
  }
}