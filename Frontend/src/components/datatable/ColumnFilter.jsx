
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const ColumnFilter = ({ columnFilters, setColumnFilters }) => {
	const [searchText, setSearchText] = useState('');

    const Search = (id, value) => {
		console.log(id, value);
		
		setSearchText((prev) =>  value)
		setColumnFilters([{
			id: "username",
			value
		}])
	}
    return (
        <div className="relative w-[300px]">
                        <Input
                            className="indent-10 text-md"
                            placeholder="Search Employees"
                            value={searchText}
                            onChange={(e) => Search("name", e.target.value)}
                        ></Input>
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                            <SearchIcon className="h-4 w-4 text-gray-400 peer-hover:text-white md:h-6 md:w-6"></SearchIcon>
                        </div>
                    </div>
    )
}

export default ColumnFilter