import React from "react";
import Form from "next/form";
import SearchReset from "@/app/components/SearchReset";

export const Search = () => {
  let query = "test";

  return (
    <Form action="/" className="search-form">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search..."
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <SearchReset />}
        <button type="submit" className="search-btn text-white">
          S
        </button>
      </div>
    </Form>
  );
};
