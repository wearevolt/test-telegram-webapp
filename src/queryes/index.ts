import { useQuery, gql } from "@apollo/client";
import { TgInitData, TgMessageFilter } from "../types";

const getTokenQuery = gql`
  query GetToken($initStr: String!, $deviceId: String!, $initData: TgInitData) {
    getToken(init_str: $initStr, device_id: $deviceId, init_data: $initData) {
      jwtToken
    }
  }
`;

const getTgMessagesQuery = gql`
  query GetTgMessages {
    getTgMessages {
      cursor
    }
  }
`;

const initStrTemp = "initstr";
const initDataTemp = {
  id: "sdkfjdskf",
  auth_date: 234234,
  hash: "c2ce64324422fd76771316b12160d5ddfb10868686b21d54e07c1accc6974672",
  user: {
    id: 967229387,
  },
};

const useGetTokenQuery = (
  initStr: string,
  initData: TgInitData,
  deviceId: string
) => 
  useQuery(getTokenQuery, {
    variables: {
      initStr: initStrTemp,
      deviceId,
      initData: initDataTemp,
    },
  });

const getContext = (token: string) => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const useGetTgMessage = (token: string) =>
  useQuery(getTgMessagesQuery, {
    skip: !token,
    context: getContext(token),
  });
  // useQuery(getTgMessagesQuery);

export { useGetTokenQuery, useGetTgMessage };
