export class A {
  constructor(public domNode: Node) {
    console.log('A');
  }
}

export class B extends A {
  constructor(domNode: Node) {
    super(domNode);
    console.log('B');
  }
}

export class C extends B {
  declare domNode: HTMLElement

  log() {
    console.log('C', this.domNode)
  }
}
