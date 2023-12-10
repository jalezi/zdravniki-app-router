import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useIsSidebarStore = create<SidebarState>(set => ({
  isOpen: false,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) =>
    set(() => {
      return { isOpen };
    }),
}));
