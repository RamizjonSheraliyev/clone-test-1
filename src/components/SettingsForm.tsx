'use client';
import {updateProfile} from "@/actions";
import {Profile} from "@prisma/client";
import {Button, Switch, TextArea, TextField} from "@radix-ui/themes";
import {CloudUploadIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

export default function SettingsForm({
  profile,
}:{
  profile:Profile|null;
}) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File|null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(response => {
        response.json().then(url => {
          setAvatarUrl(url);
        });
      });
    }
  }, [file]);
  return (
    <form action={async (data: FormData) => {
      await updateProfile(data);
      router.push('/profile');
      router.refresh();
    }}>
      <input type="hidden" name="avatar" value={avatarUrl || ''}/>
      <div className="flex gap-4 items-center">
        <div>
          <div className="bg-gray-400 size-24 rounded-full overflow-hidden aspect-square shadow-md shadow-gray-400">
            <img className="" src={avatarUrl || ''} alt=""/>
          </div>
        </div>
        <div>
          <input type="file"
                 ref={fileInRef}
                 className="hidden"
                 onChange={ev => setFile(ev.target.files?.[0] || null)}
          />
          <Button
            type="button"
            variant="surface"
            onClick={() => fileInRef.current?.click()}
          >
            <CloudUploadIcon/>
            Change avatar
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">username</p>
      <TextField.Root
        name="username"
        defaultValue={profile?.username || ''}
        placeholder="your_username"/>
      <p className="mt-2 font-bold">name</p>
      <TextField.Root
        name="name"
        defaultValue={profile?.name || ''}
        placeholder="John Doe"/>
      <p className="mt-2 font-bold">subtitle</p>
      <TextField.Root
        name="subtitle"
        defaultValue={profile?.subtitle || ''}
        placeholder="Graphic designer"/>
      <p className="mt-2 font-bold">bio</p>
      <TextArea name="bio" defaultValue={profile?.bio || ''} />
      <label className="flex gap-2 items-center mt-2">
        <span>Dark mode </span>
        <Switch
          defaultChecked={localStorage.getItem('theme') == 'dark'}
          onCheckedChange={(isDark) => {
            const html = document.querySelector('html');
            const theme = isDark ? 'dark' : 'light';
            if (html) {
              html.dataset.theme = theme;
            }
            localStorage.setItem('theme', theme);
            window.location.reload();
        }} />
      </label>
      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  );
}