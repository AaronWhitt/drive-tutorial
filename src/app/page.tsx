import { db } from "~/server/db";
import {
  files as fileSchema,
  folders as folderSchema,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";
export default function HomePage() {
  return <div>{"Home Page"}</div>;
}
