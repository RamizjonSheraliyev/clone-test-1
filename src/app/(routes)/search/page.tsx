import Preloader from "@/components/Preloader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import {Suspense} from "react";

export default async function SearchPage({
  searchParams: {query},
}:{
  searchParams: {query:string},
}) {
  return (
    <div className="w-full">
      <div className="max-w-md mx-auto">
        <SearchForm />
        {typeof query !== 'undefined' && (
          <Suspense fallback={<Preloader />}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
}