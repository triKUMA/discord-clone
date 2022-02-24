import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerPrototypeType, ServerType } from "../../types/ServerType";

interface ServersSliceType {
  servers: ServerType[];
  activeServer: number;
}

const serversSliceInitState: ServersSliceType = {
  servers: [],
  activeServer: 0,
};

function createServerFromPrototype(prototype: ServerPrototypeType): ServerType {
  let newServer: ServerType = {
    id: 1,
    name: prototype.name,
    iconSrc: prototype.iconSrc,
    channels: [],
    members: [prototype.creator],
  };

  switch (prototype.template) {
    case "gaming":
      newServer.channels = [];
      break;
    case "school":
      newServer.channels = [];
      break;
    case "study":
      newServer.channels = [];
      break;
    case "friends":
      newServer.channels = [];
      break;
    case "creators":
      newServer.channels = [];
      break;
    case "local community":
      newServer.channels = [];
      break;
    default:
      newServer.channels = [];
      break;
  }

  console.log(newServer);

  return newServer;
}

const serversSlice = createSlice({
  name: "servers",
  initialState: serversSliceInitState,
  reducers: {
    addServer: (state: ServersSliceType, action: PayloadAction<ServerType>) => {
      state.servers = state.servers.concat(action.payload);
    },
    addServerFromPrototype: (
      state: ServersSliceType,
      action: PayloadAction<ServerPrototypeType>
    ) => {
      state.servers = state.servers.concat(
        createServerFromPrototype(action.payload)
      );
    },
  },
});

export const { addServer, addServerFromPrototype } = serversSlice.actions;

export const serversReducer = serversSlice.reducer;
