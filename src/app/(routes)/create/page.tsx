'use client';
import {postEntry} from "@/actions";
import {Button, TextArea} from "@radix-ui/themes";
import {CloudUploadIcon, SendIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

export default function CreatePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File|null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response => {
        response.json().then(url => {
          setImageUrl(url);
          setIsUploading(false);
        });
      });
    }
  }, [file]);
  return (
    <form
      className="max-w-md mx-auto"
      action={async data => {
        const id = await postEntry(data);
        router.push(`/posts/${id}`);
        router.refresh();
      }}
    >
      <input type="hidden" name="image" value={imageUrl}/>
      <div className="flex flex-col gap-4">
        <div>
          <div className="min-h-64 p-2 bg-gray-400 rounded-md relative">
            {imageUrl && (
              <img src={imageUrl} className="rounded-md" alt=""/>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                onChange={ev => setFile(ev.target.files?.[0] || null)}
                className="hidden"
                type="file"
                ref={fileInRef}/>
              <Button
                disabled={isUploading}
                onClick={() => fileInRef?.current?.click()}
                type="button" variant="surface">
                {!isUploading && (
                  <CloudUploadIcon size={16}/>
                )}
                {isUploading ? 'Uploading...' : 'Choose image'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextArea name="description" className="h-16" placeholder="Add photo description..."/>
        </div>
      </div>
      <div className="flex mt-4 justify-center">
        <Button>
          <SendIcon size={16}/>
          Publish
        </Button>
      </div>
    </form>
  );
}