import supabase from "./supabase";

// Search list all files in a bucket
export const searchFile = async () => {
  const { data } = await supabase.storage.from("files").list("document", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  return data ? data.map((item) => item.name) : ["No Results"];
};

// Generate download link of the file
export const getDownloadLink = async (fileName: string) => {
  const { data } = supabase.storage
    .from("files")
    .getPublicUrl(`document/${fileName}`, {
      download: true,
    });
  return data ? data.publicUrl : "http://localhost:5173/not-found";
};
