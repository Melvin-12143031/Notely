import SearchBar from "./SearchBar"
import CategoryFilter from "./CategoryFilter"
import SortSelect from "./SortSelect"

const NotesToolbar = ({
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort }) => {

    return (
        <>
            <div className="notes-toolbar">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />

                <CategoryFilter
                    category={category}
                    setCategory={setCategory}
                />

                <SortSelect
                    sort={sort}
                    setSort={setSort}
                />

                <p className="keyboard-hints">
                    Shortcuts: <kbd>Ctrl</kbd> + <kbd>K</kbd> Search ·
                    <kbd>Alt</kbd> + <kbd>N</kbd> New Note
                </p>

            </div>



        </>
    )
}

export default NotesToolbar
