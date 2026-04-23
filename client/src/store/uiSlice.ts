import { createSlice } from '@reduxjs/toolkit'

interface UiState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
}

const initialState: UiState = {
  theme: 'dark',
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { toggleTheme, toggleSidebar } = uiSlice.actions
export default uiSlice.reducer
