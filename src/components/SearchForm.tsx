'use client';
import {TextField} from "@radix-ui/themes";
import {SearchIcon} from "lucide-react";
import {useRouter} from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  return (
    <form action={async data => {
      router.push('/search?query=' + data.get('query'));
      router.refresh();
    }}>
      <TextField.Root
        name="query"
        placeholder="Search for posts or users...">
        <TextField.Slot>
          <SearchIcon/>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}