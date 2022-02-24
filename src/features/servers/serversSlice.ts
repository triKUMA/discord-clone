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
      newServer.channels = [
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "clips-and-highlights", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lobby", feed: [] },
            { type: "voice", name: "Gaming", feed: [] },
          ],
        },
      ];
      break;
    case "school":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [] },
            { type: "text", name: "announcements", feed: [] },
            { type: "text", name: "resources", feed: [] },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "meeting-plans", feed: [] },
            { type: "text", name: "off-topic", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [] },
            { type: "voice", name: "Meeting Room 1", feed: [] },
            { type: "voice", name: "Meeting Room 2", feed: [] },
          ],
        },
      ];
      break;
    case "study":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [] },
            { type: "text", name: "notes-resources", feed: [] },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "homework-help", feed: [] },
            { type: "text", name: "session-planning", feed: [] },
            { type: "text", name: "off-topic", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [] },
            { type: "voice", name: "Study Room 1", feed: [] },
            { type: "voice", name: "Study Room 2", feed: [] },
          ],
        },
      ];
      break;
    case "friends":
      newServer.channels = [
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "games", feed: [] },
            { type: "text", name: "music", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [] },
            { type: "voice", name: "Stream Room", feed: [] },
          ],
        },
      ];
      break;
    case "creators":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [] },
            { type: "text", name: "announcements", feed: [] },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "events", feed: [] },
            { type: "text", name: "ideas-and-feedback", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [] },
            { type: "voice", name: "Community Hangout", feed: [] },
            { type: "voice", name: "Stream Room", feed: [] },
          ],
        },
      ];
      break;
    case "local community":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [] },
            { type: "text", name: "announcements", feed: [] },
            { type: "text", name: "resources", feed: [] },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [] },
            { type: "text", name: "meeting-plans", feed: [] },
            { type: "text", name: "off-topic", feed: [] },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [] },
            { type: "voice", name: "Meeting Room", feed: [] },
          ],
        },
      ];
      break;
    default:
      newServer.channels = [
        {
          name: "text channels",
          channels: [{ type: "text", name: "general", feed: [] }],
        },
        {
          name: "voice channels",
          channels: [{ type: "voice", name: "General", feed: [] }],
        },
      ];
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