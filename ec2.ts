import { Instance } from "@cdktf/provider-aws/lib/instance";
import { Construct } from "constructs";

export class EC2 extends Construct {
  public readonly publicIp: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const instance = new Instance(this, "compute", {
      ami: "ami-0599b6e53ca798bb2",
      instanceType: "t2.micro",
    });

    this.publicIp = instance.publicIp;
  }
}
