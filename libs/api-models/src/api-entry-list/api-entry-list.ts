export type ApiListMeta = {
  total: number;
  limit: number;
  offset: number;
};

export type ApiEntryList<Entry> = {
  metadata: ApiListMeta;
  entries: Entry[];
};
