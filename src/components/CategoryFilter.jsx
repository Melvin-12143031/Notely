import categories from '../data/categories.json'

const ALL_CATEGORIES = 'All'

const CategoryFilter = ({ category, setCategory }) => {

    return (
        <select
            className="category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>

            <option value={ALL_CATEGORIES}>
                All Categories
            </option>

            {categories.map((item) => (
                <option key={item} value={item}>
                    {item === 'All' ? 'All Categories' : item}
                </option>
            ))}
            
        </select>
    )
}

export default CategoryFilter
