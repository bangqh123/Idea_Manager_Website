export const blogReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'BLOGS_LOAD_SUCCESS':
            return {
                ...state,
                blogs: payload,
            }
        case 'BLOGS_LOAD_FAIL':
            return {
                ...state,
                blogs: [],
            }
        default:
            return state
    }
}