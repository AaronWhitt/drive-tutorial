import { db } from "~/server/db";
import {
  files_table as fileSchema,
  folders_table as folderSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";
export default function HomePage() {
  return <div>{"Home Page"}</div>;
}
