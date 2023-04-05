export const categoryReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CATEGORIES_LOAD_SUCCESS':
            return {
                ...state,
                categories: payload,
                categoriesLoading: false
            }
        case 'CATEGORIES_LOAD_FAIL':
            return {
                ...state,
                categories: [],
                categoriesLoading: false
            }
        case 'ADD_NEW_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, payload],
                categoriesLoading: false
            }
        default:
            return state
    }
}