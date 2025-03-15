import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { App, S3Backend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { EC2 } from "./ec2";

class MyStack extends TerraformStack {
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
const stack = new MyStack(app, "cdk_for_tf_playground");

new S3Backend(stack, {
  region: "ap-northeast-1",
  bucket: "yamoyamoto-cdktf-playground",
  key: "cdktf.tfstate",
});

app.synth();
