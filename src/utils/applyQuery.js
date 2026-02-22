// applyQuery.js

function applyQuery(list, query) {
      let items = list;

    const { name, limit, offset, sort, order } = query;

    // Filter name
    if (name) {
        const search = name.toLowerCase();
        items = items.filter(item => item.name.toLowerCase().includes(search));
    };

    // Dynamic Sorting
    if (sort) {
        const dir = order === "desc" ? -1 : 1;

        items = items.slice().sort((a, b) => {
            const aValue = a[sort];
            const bValue = b[sort];

            if (typeof aValue === "string") return dir * String(aValue).localeCompare(String(bValue));
            else if (typeof aValue === "number") return dir * (aValue - bValue);
            else return 0;
        });
    };

    // Paginate
    const start = Number(offset) || 0;
    const end = limit ? start + Number(limit) : undefined;
    items = items.slice(start, end);

    return items;
};

module.exports = applyQuery;