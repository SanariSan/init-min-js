/// <reference types="node" />
import { SocksProxy } from 'socks';
import { Agent, ClientRequest, RequestOptions } from 'agent-base';
import CacheableLookup from 'cacheable-lookup';
import { AgentOptions } from 'agent-base';
import { Url } from 'url';
import net from 'net';
import tls from 'tls';
interface BaseSocksProxyAgentOptions {
  host?: string | null;
  port?: string | number | null;
  username?: string | null;
  tls?: tls.ConnectionOptions | null;
}
interface SocksProxyAgentOptionsExtra {
  dnsCache?: CacheableLookup;
  timeout?: number;
}
export interface SocksProxyAgentOptions
  extends AgentOptions,
    BaseSocksProxyAgentOptions,
    Partial<Omit<Url & SocksProxy, keyof BaseSocksProxyAgentOptions>> {}
export declare class SocksProxyAgent extends Agent {
  private readonly lookup;
  private readonly proxy;
  private readonly tlsConnectionOptions;
  private readonly dnsCache;
  timeout: number | null;
  constructor(input: string | SocksProxyAgentOptions, options?: SocksProxyAgentOptionsExtra);
  /**
   * Initiates a SOCKS connection to the specified SOCKS proxy server,
   * which in turn connects to the specified remote host and port.
   *
   * @api protected
   */
  callback(req: ClientRequest, opts: RequestOptions): Promise<net.Socket>;
}
export {};
