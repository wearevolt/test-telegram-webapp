import { FC, useState } from "react";
import { Button, Form, Input, Typography } from "antd";
// import { useParams } from "react-router";
// import { useLocation } from "react-router-dom";
// import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";
import { TelegramWebApps } from "telegram-webapps-types-new";
import {
  useGetTgChatWithPermissionError,
  useGetTgMessage,
  useGetTokenQuery,
} from "../queryes";
import { TgInitData } from "../types";
import { getDeviceId } from "../utils";
// testserver.com

const AddCompany: FC = () => {
  const initData = Telegram.WebApp.initData;
  const initDataUnsafe = Telegram.WebApp.initDataUnsafe as TgInitData;
  console.log("======initData=========");
  console.log(initData);
  console.log("=======initDataUnsafe========");
  console.log(initData);

  const authResult = useGetTokenQuery(initData, initDataUnsafe, getDeviceId());
  console.log("===========result=============");
  console.log(authResult);
  console.log("------------aaa------------------");
  const messageResult = useGetTgChatWithPermissionError(
    authResult.data?.getToken?.jwtToken,
    {
      available_status: "permission_error",
    }
  );
  console.log(messageResult.data?.getTgChats.edges);
  // if (authResult.loading) {
  //   return null;
  // }
  // if (authResult.error) {
  //   return (<p>Error</p>)
  // }

  const [chatData, setChatData] = useState<{
    titles: string[];
  }>({
    titles: [],
  });

  const chats = (messageResult.data?.getTgChats.edges as any[] | undefined)
  ?.map(item => item.title);
  const chatDataList = chats?.map((title) => <li>{title}</li>);

  // setChatData({
  //   titles: (messageResult.data?.getTgChats.edges as any[]).map(
  //     (item) => item.title
  //   ),
  // });

  const [submitButtonState, setSubmitButtonState] = useState<{
    text: string;
    disabled: boolean;
  }>({
    text: "Create",
    disabled: false,
  });

  const [resetButtonState] = useState<{
    text: string;
    disabled: boolean;
  }>({
    text: "Reset",
    disabled: false,
  });

  const [formState, setFormState] = useState<{
    name: string;
    domain: string;
  }>({
    name: "Example company name",
    domain: "domain.com",
  });

  const onSubmitClick = () => {
    console.log(formState);
    localStorage.setItem("name", formState.name);

    setSubmitButtonState({ text: "Success", disabled: true });
  };
  const onResetClick = () => {
    setFormState({
      name: "",
      domain: "",
    });
    setSubmitButtonState({ text: "Create", disabled: false });
  };
  if (authResult.loading) {
    return null;
  }
  if (authResult.error) {
    return (<p>Error</p>)
  }
  return (
    <>
      <Typography.Title level={3}>Add company</Typography.Title>
      {/* <p>Name persist: {localStorage.getItem("name")}</p> */}
      {/* <p>Init: {initData}</p> */}
      {/* <p>InitUnsafe: {JSON.stringify(initDataUnsafe)}</p> */}
      <ul>{chatDataList}</ul>
      {/* <p>${JSON.stringify(result)}</p> */}
      <Form
        labelCol={{ span: 6 }}
        name="basic"
        layout="horizontal"
        initialValues={formState}
        autoComplete="off"
      >
        <Form.Item label="Name" name="name">
          <Input
            value={formState.name}
            onChange={(value) =>
              setFormState({ ...formState, name: value.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Domain" name="domain">
          <Input
            value={formState.domain}
            onChange={(value) =>
              setFormState({ ...formState, domain: value.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            disabled={submitButtonState.disabled}
            onClick={onSubmitClick}
          >
            {submitButtonState.text}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="dashed"
            htmlType="button"
            disabled={resetButtonState.disabled}
            onClick={onResetClick}
          >
            {resetButtonState.text}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddCompany;
