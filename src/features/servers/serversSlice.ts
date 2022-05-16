import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerPrototypeType, ServerType } from "../../types/ServerType";
import { v4 as uuidv4 } from "uuid";
import { ChannelCategoryType, ChannelType } from "../../types/ChannelType";
import { PostType } from "../../types/PostType";

interface ServersSliceType {
  servers: ServerType[];
  activeServer: string | null;
}

const serversSliceInitState: ServersSliceType = {
  servers: [],
  activeServer: "home",
};

function createServerFromPrototype(prototype: ServerPrototypeType): ServerType {
  let newServer: ServerType = {
    id: uuidv4(),
    name: prototype.name,
    iconSrc: prototype.iconSrc,
    channels: [],
    members: [prototype.creator],
    activeChannel: "",
  };

  switch (prototype.template) {
    case "gaming":
      newServer.channels = [
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "0" },
            { type: "text", name: "clips-and-highlights", feed: [], id: "1" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lobby", feed: [], id: "2" },
            { type: "voice", name: "Gaming", feed: [], id: "3" },
          ],
        },
      ];
      break;
    case "school":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [], id: "0" },
            { type: "text", name: "announcements", feed: [], id: "1" },
            { type: "text", name: "resources", feed: [], id: "2" },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "3" },
            { type: "text", name: "meeting-plans", feed: [], id: "4" },
            { type: "text", name: "off-topic", feed: [], id: "5" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [], id: "6" },
            { type: "voice", name: "Meeting Room 1", feed: [], id: "7" },
            { type: "voice", name: "Meeting Room 2", feed: [], id: "8" },
          ],
        },
      ];
      break;
    case "study":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [], id: "0" },
            { type: "text", name: "notes-resources", feed: [], id: "1" },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "2" },
            { type: "text", name: "homework-help", feed: [], id: "3" },
            { type: "text", name: "session-planning", feed: [], id: "4" },
            { type: "text", name: "off-topic", feed: [], id: "5" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [], id: "6" },
            { type: "voice", name: "Study Room 1", feed: [], id: "7" },
            { type: "voice", name: "Study Room 2", feed: [], id: "8" },
          ],
        },
      ];
      break;
    case "friends":
      newServer.channels = [
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "0" },
            { type: "text", name: "games", feed: [], id: "1" },
            { type: "text", name: "music", feed: [], id: "2" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [], id: "3" },
            { type: "voice", name: "Stream Room", feed: [], id: "4" },
          ],
        },
      ];
      break;
    case "creators":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [], id: "0" },
            { type: "text", name: "announcements", feed: [], id: "1" },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "2" },
            { type: "text", name: "events", feed: [], id: "3" },
            { type: "text", name: "ideas-and-feedback", feed: [], id: "4" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [], id: "5" },
            { type: "voice", name: "Community Hangout", feed: [], id: "6" },
            { type: "voice", name: "Stream Room", feed: [], id: "7" },
          ],
        },
      ];
      break;
    case "local community":
      newServer.channels = [
        {
          name: "information",
          channels: [
            { type: "text", name: "welcome-and-rules", feed: [], id: "0" },
            { type: "text", name: "announcements", feed: [], id: "1" },
            { type: "text", name: "resources", feed: [], id: "2" },
          ],
        },
        {
          name: "text channels",
          channels: [
            { type: "text", name: "general", feed: [], id: "3" },
            { type: "text", name: "meeting-plans", feed: [], id: "4" },
            { type: "text", name: "off-topic", feed: [], id: "5" },
          ],
        },
        {
          name: "voice channels",
          channels: [
            { type: "voice", name: "Lounge", feed: [], id: "6" },
            { type: "voice", name: "Meeting Room", feed: [], id: "7" },
          ],
        },
      ];
      break;
    default:
      newServer.channels = [
        {
          name: "text channels",
          channels: [{ type: "text", name: "general", feed: [], id: "0" }],
        },
        {
          name: "voice channels",
          channels: [{ type: "voice", name: "General", feed: [], id: "1" }],
        },
      ];
      break;
  }

  return newServer;
}

function isChannel(
  item: ChannelType | ChannelCategoryType
): item is ChannelType {
  return typeof (item as ChannelType).type !== "undefined";
}

const serversSlice = createSlice({
  name: "servers",
  initialState: serversSliceInitState,
  reducers: {
    addServer: (state: ServersSliceType, action: PayloadAction<ServerType>) => {
      if (
        typeof (action.payload.channels[0] as ChannelType).type !== "undefined"
      ) {
        action.payload.activeChannel = (
          action.payload.channels[0] as ChannelType
        ).id;
      } else {
        action.payload.activeChannel = (
          action.payload.channels[0] as ChannelCategoryType
        ).channels[0].id;
      }
      state.servers = state.servers.concat(action.payload);
      state.activeServer = action.payload.id;
    },
    addServerFromPrototype: (
      state: ServersSliceType,
      action: PayloadAction<ServerPrototypeType>
    ) => {
      const newServer = createServerFromPrototype(action.payload);
      if (typeof (newServer.channels[0] as ChannelType).type !== "undefined") {
        newServer.activeChannel = (newServer.channels[0] as ChannelType).id;
      } else {
        newServer.activeChannel = (
          newServer.channels[0] as ChannelCategoryType
        ).channels[0].id;
      }
      state.servers = state.servers.concat(newServer);
      state.activeServer = newServer.id;
    },
    setActiveServer: (
      state: ServersSliceType,
      action: PayloadAction<string>
    ) => {
      state.activeServer = action.payload;
    },
    removeServer: (state: ServersSliceType, action: PayloadAction<string>) => {
      if (state.activeServer === action.payload) {
        state.activeServer = null;
      }

      state.servers.splice(
        state.servers.findIndex((server) => {
          return server.id === action.payload;
        }),
        1
      );
    },
    setActiveChannel: (
      state: ServersSliceType,
      action: PayloadAction<string>
    ) => {
      // state.activeChannel = action.payload;
      state.servers.forEach((server) => {
        if (server.id === state.activeServer) {
          server.activeChannel = action.payload;
        }
      });
    },
    addPostToActiveChannel: (
      state: ServersSliceType,
      action: PayloadAction<{ post: PostType; userID: string }>
    ) => {
      state.servers.forEach((server) => {
        if (server.id === state.activeServer) {
          server.channels.forEach((channel) => {
            if (isChannel(channel)) {
              if (channel.id === server.activeChannel) {
                if (
                  channel.feed.length > 0 &&
                  channel.feed[0].userID === action.payload.userID
                ) {
                  channel.feed[0].posts.push(action.payload.post);
                } else {
                  channel.feed.splice(0, 0, {
                    userID: action.payload.userID,
                    posts: [action.payload.post],
                  });
                }
              }
            } else {
              channel.channels.forEach((c) => {
                if (c.id === server.activeChannel) {
                  if (
                    c.feed.length > 0 &&
                    c.feed[0].userID === action.payload.userID
                  ) {
                    c.feed[0].posts.push(action.payload.post);
                  } else {
                    c.feed.splice(0, 0, {
                      userID: action.payload.userID,
                      posts: [action.payload.post],
                    });
                  }
                }
              });
            }
          });
        }
      });
    },
  },
});

export const {
  addServer,
  addServerFromPrototype,
  setActiveServer,
  removeServer,
  setActiveChannel,
  addPostToActiveChannel,
} = serversSlice.actions;

export const serversReducer = serversSlice.reducer;
