import { create } from "zustand";

export const useUpgradeHistoryOtherActs = create((set) => ({
    item: {},

    setItem: (updateItem) => set({ item: updateItem }),

    updateDataItem: (key, value) =>
        set((state) => ({
            item: {
                ...state.item,
                [key]: value
            }
        })),

    handleChangeItem: ({ target }) => 
        set((state) => ({
            item: {
                ...state.item,
                [target.name]: target.value
            }
        })),
}));
