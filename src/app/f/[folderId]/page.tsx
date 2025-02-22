import { z } from "zod";
import { QUERIES } from "~/server/db/queries";
import DriveContents from "../../drive-contents";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: number }>;
}) {
  const params = await props.params;
  const parsedFolderId = z.coerce.number().safeParse(params.folderId);
  if (parsedFolderId.error) {
    return <div>Invalid FolderId</div>;
  }

  const [folders, files, parents] = await Promise.all([
    QUERIES.getFolders(parsedFolderId.data),
    QUERIES.getFiles(parsedFolderId.data),
    QUERIES.getAllParentsForFolder(parsedFolderId.data),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
