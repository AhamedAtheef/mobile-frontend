import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const url: string = "https://dunpqwhwpfitozxdjbss.supabase.co";
const key: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bnBxd2h3cGZpdG96eGRqYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzk4OTAsImV4cCI6MjA2NzIxNTg5MH0.3PKmpSZirDbYiW_mlUa1jFEV0Nb_eAymp1JBbqUvZqs";

export const supabase = createClient(url, key);

export async function deleteImages(imageUrls: string[]): Promise<void> {
  if (!imageUrls || imageUrls.length === 0) return;

  const filePaths = imageUrls.map((url) => {
    // Example public URL:
    // https://<project>.supabase.co/storage/v1/object/public/images/folder/file.png
    const parts = url.split("/storage/v1/object/public/images/");
    if (parts.length > 1) {
      return decodeURIComponent(parts[1]); // returns "folder/file.png"
    }
    return "";
  }).filter(Boolean);

  if (filePaths.length === 0) return;

  const { error } = await supabase.storage.from("images").remove(filePaths);

  if (error) {
    console.error("Supabase delete error:", error.message);
    toast.error("Failed to delete images from storage");
  } else {
    toast.success("Images deleted from storage");
  }
}
