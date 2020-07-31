export const reducer = (state, action) => [...state, ...action.payload.data];
