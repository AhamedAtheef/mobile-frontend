import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";


const url: string = "https://dunpqwhwpfitozxdjbss.supabase.co";
const key: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bnBxd2h3cGZpdG96eGRqYnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2Mzk4OTAsImV4cCI6MjA2NzIxNTg5MH0.3PKmpSZirDbYiW_mlUa1jFEV0Nb_eAymp1JBbqUvZqs";


const supabase = createClient(url, key);

// Upload a single file and return its public URL
export function uploadFile(file: File | null): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("Please select a file to upload");
      toast.error("Please select a file to upload");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    supabase.storage
      .from("images") // 👈 your bucket name
      .upload(fileName, file, { cacheControl: "3600", upsert: false })
      .then((response) => {
        if (response.error) {
          reject("Failed to upload file");
          toast.error("Failed to upload file");
        } else {
          const publicUrl =
            supabase.storage.from("images").getPublicUrl(fileName).data
              .publicUrl;
          resolve(publicUrl);
          console.log(publicUrl);
        }
      })
      .catch(() => {
        reject("Failed to upload file");
        toast.error("Failed to upload file");
      });
  });
}

// Upload multiple files and return an array of public URLs
export async function uploadFiles(files: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    try {
      const url = await uploadFile(file);
      urls.push(url);
    } catch (err) {
      console.error("Upload failed for file:", file.name, err);
    }
  }

  return urls;
}

