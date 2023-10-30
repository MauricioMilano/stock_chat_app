export const isAuthenticated = (state) => !!state.token
export const getRole = (state) => state.payload.role
