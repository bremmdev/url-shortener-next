export type EntityResp = {
  "odata.metadata": string;
  etag: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
  url: string | null;
  short_url: string | null
};