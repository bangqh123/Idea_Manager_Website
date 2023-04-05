export const departmentReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'DEPARTMENT_LOAD_SUCCESS':
            return {
                ...state,
                departments: payload,
                departmentsLoading: false
            }
        case 'DEPARTMENT_LOAD_FAIL':
            return {
                ...state,
                departments: [],
                departmentsLoading: false
            }
        case 'ADD_NEW_DEPARTMENT':
            return {
                ...state,
                departments: [...state.departments, payload],
                departmentsLoading: false
            }
        case 'GET_AN_DEPARTMENT':
            return {
                ...state,
                one_department: payload,
                departmentsLoading: false
            }
        case 'GET_DEPARTMENT_FAIL':
            return {
                ...state,
                one_department: null,
                departmentsLoading: false
            }
        default:
            return state
    }
}