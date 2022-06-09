import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IArtist } from "../../components/Comparison";
import { RootState } from "../store";
export interface UserState {
  user1Token: string;
  user2Token: string;
  user1: { name?: string; topMusic?: IArtist[] };
  user2: { name?: string; topMusic?: IArtist[] };
}

const initialState: UserState = {
  user1Token: "",
  user2Token: "",
  user1: {},
  user2: {},
};

export const setUser1Username = createAsyncThunk(
  "users/setUser1Username",
  async (token: string, thunk) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response);
      //   console.log(thunk.getState());
      return response.data.display_name;
    } catch (error) {
      console.log(error);
      return thunk.rejectWithValue("an error occured");
    }
  }
);
export const setUser1TopMusic = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/setUser1TopMusic", async (a: string, thunk) => {
  try {
    const token = thunk.getState().user.user1Token;
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=30",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    console.log(response);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return thunk.rejectWithValue("an error occured");
  }
});
export const setUser2Username = createAsyncThunk(
  "users/setUser2Username",
  async (token: string, thunk) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(response);
      return response.data.display_name;
    } catch (error) {
      console.log(error);
      return thunk.rejectWithValue("an error occured");
    }
  }
);
export const setUser2TopMusic = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("users/setUser2TopMusic", async (a: string, thunk) => {
  try {
    const token = thunk.getState().user.user2Token;
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=30",
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    console.log(response);
    return response.data.items;
  } catch (error) {
    console.log(error);
    return thunk.rejectWithValue("an error occured");
  }
});
export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser1Token: (state, action: PayloadAction<string>) => {
      state.user1Token = action.payload;
    },
    setUser2Token: (state, action: PayloadAction<string>) => {
      state.user2Token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser1Username.fulfilled, (state, { payload }) => {
      state.user1 = { ...state.user1, name: payload };
    });
    builder.addCase(setUser2Username.fulfilled, (state, { payload }) => {
      state.user2 = { ...state.user1, name: payload };
    });
    builder.addCase(setUser1TopMusic.fulfilled, (state, { payload }) => {
      state.user1 = { ...state.user1, topMusic: payload };
    });
    builder.addCase(setUser2TopMusic.fulfilled, (state, { payload }) => {
      state.user2 = { ...state.user1, topMusic: payload };
    });
    //remove token if setusername failed
    builder.addCase(setUser1Username.rejected, (state, { payload }) => {
      state.user1Token = "";
      window.localStorage.removeItem("user1");
    });
    builder.addCase(setUser2Username.rejected, (state, { payload }) => {
      state.user2Token = "";
      window.localStorage.removeItem("user2");
    });
    builder.addCase(setUser1TopMusic.rejected, (state, { payload }) => {
      state.user1Token = "";
      window.localStorage.removeItem("user1");
      window.location.reload();
    });
    builder.addCase(setUser2TopMusic.rejected, (state, { payload }) => {
      state.user2Token = "";
      window.localStorage.removeItem("user2");
      window.location.reload();
    });
  },
});

export const { setUser1Token, setUser2Token } = userSlice.actions;

export default userSlice.reducer;
