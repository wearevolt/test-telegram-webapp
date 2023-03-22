import { FC, useState } from "react";
import { Typography, List } from "antd";
import { TelegramWebApps } from "telegram-webapps-types-new";
import {
  useGetTgChatWithPermissionError,
  useGetTokenQuery,
} from "../queryes";
import { TgInitData } from "../types";
import { getDeviceId } from "../utils";
// testserver.com

const AddCompany: FC = () => {
  const initData = Telegram.WebApp.initData;
  const initDataUnsafe = Telegram.WebApp.initDataUnsafe as TgInitData;

  const authResult = useGetTokenQuery(initData, initDataUnsafe, getDeviceId());
  const messageResult = useGetTgChatWithPermissionError(
    authResult.data?.getToken?.jwtToken,
    {
      available_status: "permission_error",
    }
  );

  const chats = (messageResult.data?.getTgChats.edges as any[] | undefined)
  ?.map(item => item.title);
  const chatDataList = chats?.map((title) => <li>{title}</li>);

  if (authResult.loading) {
    return null;
  }
  if (authResult.error) {
    return (<p>Error</p>)
  }
  return (
    <>
      <Typography.Title level={3}>Chats with permission error</Typography.Title>
      <ul>{chatDataList}</ul>
      <List
        header={<div>Sample HEADER</div>}
        footer={<div>Sample FOOTER</div>}
        bordered
        dataSource={chats}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </>
  );
};
export default AddCompany;
