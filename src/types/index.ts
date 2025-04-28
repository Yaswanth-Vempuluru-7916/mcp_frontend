export interface TransactionResponse {
  result: {
    database: {
      create_id?: string;
      source_chain?: string;
      destination_chain?: string;
      created_at?: string;
      secret_hash?: string;
      [key: string]: any;
    };
    matched_orders: {
      ids?: {
        source_swap_id?: string;
        destination_swap_id?: string;
        error?: string;
      };
      api_response: {
        status?: string;
        result?: any;
        error?: string;
      };
    };
    logs: {
      [container: string]: {
        raw_logs: string[];
        filtered_logs?: string[];
        analysis?: string;
        create_order_success?: boolean;
        start_time?: number;
        end_time?: number;
        error?: string;
      };
    };
    status: {
      source_chain?: string;
      destination_chain?: string;
      source_swap_id?: string;
      destination_swap_id?: string;
      secret_hash?: string;
      is_matched: boolean;
      user_initiated: boolean;
      cobi_initiated: boolean;
      user_redeemed: boolean;
      cobi_redeemed: boolean;
      user_refunded: boolean;
      cobi_refunded: boolean;
    };
    errors: string[];
  };
}
