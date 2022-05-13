import { PayloadAction } from '@reduxjs/toolkit';
import { IPageInitialState } from '../../shared';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IPageInitialState = {
    date: undefined,
    link: undefined,
    pageTitle: 'ФК Куркино',
    title: undefined
}

const pageSlice = createSlice({
    initialState,
    name: 'pageSlice',
    reducers: {
        setNew: (state, { payload }: PayloadAction<{ date?: string, link?: string, title?: string }>) => {
            state = { ...state, ...payload }
        },
        setPageTitle: (state, { payload }: PayloadAction<string>) => {
            state.pageTitle = payload
        }
    }
})

export const { setNew, setPageTitle } = pageSlice.actions

export default pageSlice