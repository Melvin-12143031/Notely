import Button from './Button'

const EmptyState = ({
    search,
    category,
    onCreateNote,
    onClearFilters,
}) => {
    let title = 'No Notes'
    let message = 'Create your first note to get started.'

    if (search) {
        title = 'No Results'
        message = `No notes found for "${search}".`
    } else if (category !== 'All') {
        title = 'No Notes Here'
        message = `No notes found in ${category}.`
    }

    return (
        <div className="empty-state">
            <h2>{title}</h2>

            <p>{message}</p>

            {!search && category === 'All' ? (
                <Button
                    variant="primary"
                    onClick={onCreateNote}
                >
                    Create Note
                </Button>
            ) : (
                <Button
                    variant="secondary"
                    onClick={onClearFilters}
                >
                    Clear Filters
                </Button>
            )}
        </div>
    )
}

export default EmptyState