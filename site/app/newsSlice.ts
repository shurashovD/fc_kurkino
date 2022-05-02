import { PayloadAction } from '@reduxjs/toolkit';
import { INewsInitialState } from './../../shared/index.d';
import { createSlice } from '@reduxjs/toolkit';

const initialState: INewsInitialState = {
    date: undefined,
    link: undefined,
    title: undefined
}

const newsSlice = createSlice({
    initialState,
    name: 'newsSlice',
    reducers: {
        setNew: (state, { payload }: PayloadAction<INewsInitialState>) => {
            state = payload
        }
    }
})

export const { setNew } = newsSlice.actions

export default newsSlice