import { useQuery, gql, useMutation } from "@apollo/client";
import { TgInitData, TgMessageFilter } from "../types";

const getTokenQuery = gql`
  mutation AuthWebapp($initStr: String!, $deviceId: String!, $initData: TgInitData) {
    authWebapp(init_str: $initStr, device_id: $deviceId, init_data: $initData) {
      jwtToken
    }
  }
`;

const getTgMessagesQuery = gql`
  query GetTgMessages(
    $filter: TgMessageFilter
    $after: String
    $before: String
    $pageSize: Int
  ) {
    getTgMessages(
      filter: $filter
      after: $after
      before: $before
      pageSize: $pageSize
    ) {
      cursor
      lastPage
      edges {
        id
        text
      }
    }
  }
`;

const getTgChatWithPermissionError = gql`
  query GetTgChats(
    $filter: TgChatFilter
    $after: String
    $before: String
    $pageSize: Int
  ) {
    getTgChats(
      filter: $filter
      after: $after
      before: $before
      pageSize: $pageSize
    ) {
      cursor
      lastPage
      edges {
        title
      }
    }
  }
`;

// test data
// const initStrTemp = "initstr";
// const initDataTemp = {
//   query_id: "sdkfjdskf",
//   auth_date: '832784973294',
//   hash: "c2ce64324422fd76771316b12160d5ddfb10868686b21d54e07c1accc6974672",
//   user: {
//     id: 967229387,
//     language_code: "us",
//     username: "djdhf",
//     first_name: "khdskfjhk",
//     last_name: "kdsfjkldj",
//   },
// };

const useGetTokenQuery = (
  initStr: string,
  initData: TgInitData,
  deviceId: string
) =>
  useMutation(getTokenQuery, {
    variables: {
      initStr: initStr,
      deviceId,
      initData: initData,
    },
  });

const getContext = (token: string) => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const useGetTgMessage = (
  token: string,
  filter?: TgMessageFilter,
  after?: string,
  before?: string,
  pageSize?: number
) =>
  useQuery(getTgMessagesQuery, {
    skip: !token,
    context: getContext(token),
  });

const useGetTgChatWithPermissionError = (
  token: string,
  filter?: any,
  after?: string,
  before?: string,
  pageSize?: number
) =>
  useQuery(getTgChatWithPermissionError, {
    skip: !token,
    // context: getContext(token),
    variables: {
      filter,
      after,
      before,
      pageSize,
    },
  });

export { useGetTokenQuery, useGetTgMessage, useGetTgChatWithPermissionError };
