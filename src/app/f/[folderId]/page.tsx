import { db } from "~/server/db";
import { z } from "zod";
import {
  files as fileSchema,
  folders as folderSchema,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .select()
      .from(folderSchema)
      .where(eq(folderSchema.id, currentId));
    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }
    parents.unshift(folder[0]);
    currentId = folder[0]?.parent;
  }
  return parents;
}
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: number }>;
}) {
  const params = await props.params;
  const safeParams = z.coerce.number();
  const parsedFolderId = safeParams.safeParse(params.folderId);
  if (parsedFolderId.error) {
    return <div>Invalid FolderId</div>;
  }
  const filesPromise = db
    .select()
    .from(fileSchema)
    .where(eq(fileSchema.parent, parsedFolderId.data));
  const foldersPromise = db
    .select()
    .from(folderSchema)
    .where(eq(folderSchema.parent, parsedFolderId.data));

  const parentsPromise = getAllParents(parsedFolderId.data);

  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
