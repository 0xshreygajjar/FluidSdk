/**
 * Core interfaces for Agent0 SDK
 */

import type { AgentId, Address, URI, Timestamp } from "./common.js";
import type { EndpointType, TrustModel } from './enum.js';

/**
 * Represents an agent endpoint
 */
export interface Endpoint {
  type: EndpointType;
  value: string; // endpoint value (URL, name, DID, ENS)
  meta?: Record<string, any> | undefined; // optional metadata
}

/**
 * Agent registration file structure
 */
export interface RegistrationFile {
  agentId?: AgentId | undefined; // None until minted
  agentURI?: URI | undefined; // where this file is (or will be) published
  name: string;
  description: string;
  image?: URI | undefined;
  walletAddress?: Address | undefined;
  walletChainId?: number | undefined; // Chain ID for the wallet address
  endpoints: Endpoint[];
  trustModels: (TrustModel | string)[];
  owners: Address[]; // from chain (read-only, hydrated)
  operators: Address[]; // from chain (read-only, hydrated)
  active: boolean; // SDK extension flag
  x402support: boolean; // Binary flag for x402 payment support
  metadata: Record<string, any>; // arbitrary, SDK-managed
  updatedAt: Timestamp;
}

/**
 * Summary information for agent discovery and search
 */
export interface AgentSummary {
  chainId: number; // ChainId
  agentId: AgentId;
  name: string;
  image?: URI | undefined;
  description: string;
  owners: Address[];
  operators: Address[];
  mcp: boolean;
  a2a: boolean;
  ens?: string | undefined;
  did?: string | undefined;
  walletAddress?: Address | undefined;
  supportedTrusts: string[]; // normalized string keys
  a2aSkills: string[];
  mcpTools: string[];
  mcpPrompts: string[];
  mcpResources: string[];
  active: boolean;
  x402support: boolean;
  extras: Record<string, any>;
}

/**
 * Feedback data structure
 */
export interface Feedback {
  id: FeedbackIdTuple; // (agentId, clientAddress, feedbackIndex)
  agentId: AgentId;
  reviewer: Address;
  score?: number | undefined; // 0-100
  tags: string[];
  text?: string | undefined;
  context?: Record<string, any> | undefined;
  proofOfPayment?: Record<string, any> | undefined;
  fileURI?: URI | undefined;
  createdAt: Timestamp;
  answers: Array<Record<string, any>>;
  isRevoked: boolean;

  // Off-chain only fields (not stored on blockchain)
  capability?: string | undefined; // MCP capability: "prompts", "resources", "tools", "completions"
  name?: string | undefined; // MCP tool/resource name
  skill?: string | undefined; // A2A skill
  task?: string | undefined; // A2A task
}

/**
 * Feedback ID tuple: [agentId, clientAddress, feedbackIndex]
 */
export type FeedbackIdTuple = [AgentId, Address, number];

/**
 * Feedback ID string format: "agentId:clientAddress:feedbackIndex"
 */
export type FeedbackId = string;

/**
 * Parameters for agent search
 */
export interface SearchParams {
  chains?: number[] | 'all' | undefined; // ChainId[] or 'all' to search all configured chains
  name?: string | undefined; // case-insensitive substring
  description?: string | undefined; // semantic; vector distance < threshold
  owners?: Address[] | undefined;
  operators?: Address[] | undefined;
  mcp?: boolean | undefined;
  a2a?: boolean | undefined;
  ens?: string | undefined; // exact, case-insensitive
  did?: string | undefined; // exact
  walletAddress?: Address | undefined;
  supportedTrust?: string[] | undefined;
  a2aSkills?: string[] | undefined;
  mcpTools?: string[] | undefined;
  mcpPrompts?: string[] | undefined;
  mcpResources?: string[] | undefined;
  active?: boolean | undefined;
  x402support?: boolean | undefined;
}

/**
 * Parameters for feedback search
 */
export interface SearchFeedbackParams {
  agents?: AgentId[] | undefined;
  tags?: string[] | undefined;
  reviewers?: Address[] | undefined;
  capabilities?: string[] | undefined;
  skills?: string[] | undefined;
  tasks?: string[] | undefined;
  names?: string[] | undefined; // MCP tool/resource/prompt names
  minScore?: number | undefined; // 0-100
  maxScore?: number | undefined; // 0-100
  includeRevoked?: boolean | undefined;
}

/**
 * Metadata for multi-chain search results
 */
export interface SearchResultMeta {
  chains: number[]; // ChainId[]
  successfulChains: number[]; // ChainId[]
  failedChains: number[]; // ChainId[]
  totalResults: number;
  timing: {
    totalMs: number;
    averagePerChainMs?: number | undefined;
  };
}

/**
 * Paginated search result with items and cursor
 */
export interface SearchResult<T> {
  items: T[];
  nextCursor?: string | undefined;
  meta?: SearchResultMeta | undefined;
}

/**
 * Agent search result type with required meta
 */
export interface AgentSearchResultWithMeta {
  items: AgentSummary[];
  nextCursor?: string | undefined;
  meta: SearchResultMeta;
}

/**
 * Agent search result type
 */
export type AgentSearchResult = SearchResult<AgentSummary>;

/**
 * Chain query result for multi-chain searches
 */
export interface ChainQueryResult {
  chainId: number;
  status: 'success' | 'error' | 'timeout' | 'unavailable';
  agents: AgentSummary[];
  error?: string | undefined;
}

/**
 * Raw agent with average score (from reputation search)
 */
export interface AgentWithScore {
  id: string;
  chainId: bigint | number | string;
  agentId: bigint | number | string;
  owner: string;
  operators: string[];
  agentURI?: string | undefined;
  registrationFile?: {
    name?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    mcpEndpoint?: string | undefined;
    a2aEndpoint?: string | undefined;
    ens?: string | undefined;
    did?: string | undefined;
    agentWallet?: string | undefined;
    supportedTrusts?: string[] | undefined;
    a2aSkills?: string[] | undefined;
    mcpTools?: string[] | undefined;
    mcpPrompts?: string[] | undefined;
    mcpResources?: string[] | undefined;
    active?: boolean | undefined;
    x402support?: boolean | undefined;
  } | null | undefined;
  averageScore?: number | null | undefined;
}




