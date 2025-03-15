import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { App, S3Backend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { EC2 } from "./ec2";

class MyStack1 extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const ec2 = new EC2(this, "ec2");

    new TerraformOutput(this, "public_ip", {
      value: ec2.publicIp,
    });
  }
}

class MyStack2 extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const ec2 = new EC2(this, "ec2");

    new TerraformOutput(this, "public_ip", {
      value: ec2.publicIp,
    });
  }
}

const app = new App();
const stack1 = new MyStack1(app, "cdk_for_tf_playground_1");
const stack2 = new MyStack2(app, "cdk_for_tf_playground_2");

new S3Backend(stack1, {
  region: "ap-northeast-1",
  bucket: "yamoyamoto-cdktf-playground",
  key: "cdktf.tfstate/stack1",
});

new S3Backend(stack2, {
  region: "ap-northeast-1",
  bucket: "yamoyamoto-cdktf-playground",
  key: "cdktf.tfstate/stack2",
});

app.synth();
