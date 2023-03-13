import { Button, Form, Input, Typography } from "antd";
import { FC, useState } from "react";

const AddCompany: FC = () => {
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
    setSubmitButtonState({ text: "Success", disabled: true });
  };
  const onResetClick = () => {
    setFormState({
      name: "",
      domain: "",
    });
    setSubmitButtonState({ text: "Create", disabled: false });
  };

  return (
    <>
      <Typography.Title level={3}>Add company</Typography.Title>
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
