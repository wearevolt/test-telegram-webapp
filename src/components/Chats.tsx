import { FC } from "react";
import { Typography, List } from "antd";
import { TelegramWebApps } from "telegram-webapps-types-new";
import {
  useGetTgChatWithPermissionError,
  useGetTokenQuery,
} from "../queryes";
import { TgInitData } from "../types";
import { getDeviceId } from "../utils";
// testserver.com

const Chats: FC = () => {
  const initData = Telegram.WebApp.initData;
  const initDataUnsafe = Telegram.WebApp.initDataUnsafe as TgInitData;

  const authResult = useGetTokenQuery(initData, initDataUnsafe, getDeviceId());
  const messageResult = useGetTgChatWithPermissionError(
    authResult.data?.getToken?.jwtToken,
    {
      available_status: "permission_error",
    }
  );

  const chatsTitles = (messageResult.data?.getTgChats.edges as any[] | undefined)
  ?.map(item => item.title);

  if (authResult.loading) {
    return null;
  }
  if (authResult.error) {
    return (<p>Error</p>)
  }
  return (
    <>
      <Typography.Title level={3}>Chats with permission error</Typography.Title>
      <List
        header={<div>Chat titles</div>}
        footer={<div>End</div>}
        bordered
        dataSource={chatsTitles}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
    </>
  );
};
export default Chats;
