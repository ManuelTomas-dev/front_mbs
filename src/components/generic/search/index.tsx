import { Search as SearchComp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchProps {
  searchBarPlaceholder: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function Search({
  searchBarPlaceholder,
  searchTerm,
  setSearchTerm,
}: SearchProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <SearchComp className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchBarPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-75"
        />
      </div>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </Button>
    </div>
  );
}

export default Search;
