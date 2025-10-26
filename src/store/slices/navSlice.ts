// store/navSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NavLink {
  name: string;
  href: string;
}

interface NavState {
  navLinks: NavLink[];
}

const initialState: NavState = {
  navLinks: [
    { name: 'Products', href: '/products' },
    { name: 'Promotions', href: '/promotions' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'About ECP', href: '/about-ecp' },
    { name: 'Contact US', href: '/contact-us' },
  ],
};

const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavLinks: (state, action: PayloadAction<NavLink[]>) => {
      state.navLinks = action.payload;
    },
    addNavLink: (state, action: PayloadAction<NavLink>) => {
      state.navLinks.push(action.payload);
    },
    removeNavLink: (state, action: PayloadAction<string>) => {
      state.navLinks = state.navLinks.filter(
        (link) => link.name !== action.payload,
      );
    },
  },
});

export const { setNavLinks, addNavLink, removeNavLink } = navSlice.actions;
export default navSlice.reducer;
