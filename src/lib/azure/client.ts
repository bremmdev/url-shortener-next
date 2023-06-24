import {
  TableClient,
  AzureNamedKeyCredential,
} from "@azure/data-tables";

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY || "";
const tableName = "urls";

const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

export default client;