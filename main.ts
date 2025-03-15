import { Instance } from "@cdktf/provider-aws/lib/instance";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { App, S3Backend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "ap-northeast-1",
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-0599b6e53ca798bb2",
      instanceType: "t2.micro",
    });

    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
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
