import sortOptions from '../data/sortOptions.json'

const SortSelect = ({ sort, setSort }) => {
    return (
        <select
            className='sort-select'
            value={sort}
            onChange={(e) => setSort(e.target.value)}>

            {sortOptions.map((option) =>
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                
                </option>
            )}


        </select>
    )
}

export default SortSelect
