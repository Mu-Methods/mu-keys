// TODO: make a identifier for seed
export interface ID {
  curve: string;
  public: string;
  private: string;
  id: string;
  index?: number;
}

export interface KeyApi {
  box: (content: object | string | boolean | number, recipients: ReadonlyArray<string>) => string;
  unbox: (boxed: string, keys: ID) => object | string | boolean | number | undefined;
  sign: (keys: ID, hmac_key: Buffer, str: string) => string;
  verify: (keys: ID, sig: string, hmac_key: Buffer, str: string) => 0 | -1;
  loadKeys: (feedIds: ID[]) => ID[];
  useMnemonic: (mnemonic: string) => Promise<void>;
  createMnemonic: () => Promise<string>;
  createNewKeys: (index?: number, mnemonic?: string) => ID;
  getKeys: () => ID[]
}