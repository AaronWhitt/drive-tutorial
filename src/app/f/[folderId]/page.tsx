import { db } from "~/server/db";
import { z } from "zod";
import {
  files as fileSchema,
  folders as folderSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: number }>;
}) {
  const params = await props.params;
  const safeParams = z.coerce.number();
  const parsedFolderId = safeParams.safeParse(params.folderId);
  if (parsedFolderId.error) {
    return <div>Invalid FolderId</div>;
  }
  const files = await db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, parsedFolderId.data));
  const folders = await db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId.data));

  return <DriveContents files={files} folders={folders} />;
}
