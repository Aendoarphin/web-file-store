import supabase from "./supabase";

// Search files in a bucket
export const searchFile = async() => {
	const { data } = await supabase.storage.from("files").list("document", {
		limit: 100,
		offset: 0,
		sortBy: { column: "name", order: "asc" },
	});

  return data ? data.map(item => item.name): ["No Results"];
};
