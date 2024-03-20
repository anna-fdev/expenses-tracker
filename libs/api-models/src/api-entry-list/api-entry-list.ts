export type ApiListMeta = {
  total: number;
  limit: number;
  offset: number;
};

export type ApiEntryList<Entry> = {
  metadata: ApiListMeta;
  entries: Entry[];
};

export type ApiExpensesListParams = {
  offset?: number;
  limit?: number;
  start_date?: string;
  end_date?: string;
};
